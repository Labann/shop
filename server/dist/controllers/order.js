import * as express from "express";
import prisma from "../utils/prisma.js";
import { checkUser } from "../utils/checkUser.js";
export const createOrder = async (req, res) => {
    const { items } = req.body;
    try {
        const user = req.user;
        await checkUser(user);
        if (!items || items.length === 0) {
            return res.status(400).json({
                error: "items must be at least one"
            });
        }
        const productIds = items.map(item => item.productId);
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        });
        if (products.length !== items.length) {
            return res.status(404).json({
                error: "one or more product not found"
            });
        }
        //checking quantity with stock
        for (const item of items) {
            const product = products.find(p => p.id === item.productId);
            if (product && item.quantity === 0) {
                return res.status(400).json({
                    error: "quantity cannot be zero"
                });
            }
            if (product && item.quantity > product.stock) {
                return res.status(400).json({
                    error: `not enough stock for product: ${product.name}`
                });
            }
        }
        //for atomicity when one operation fails everything fails
        const fullOrder = await prisma.$transaction(async (tx) => {
            //CREATE ORDER
            const newOrder = await tx.order.create({
                data: {
                    userId: user.id,
                    status: "PENDING"
                },
            });
            //create all order-items
            await tx.orderItem.createMany({
                data: items.map(item => ({
                    cartItemId: item.id,
                    orderId: newOrder.id,
                    quantity: item.quantity,
                    productId: item.productId
                }))
            });
            //Deduct stock for each product
            for (const item of items) {
                const updated = await tx.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: {
                            gte: item.quantity
                        }
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
                if (updated.count === 0) {
                    throw new Error(`Not enough stock for product Id: ${item.productId}`);
                }
            }
            //create a pending payment record
            await tx.payment.create({
                data: {
                    orderId: newOrder.id,
                    userId: user.id,
                    method: "MPESA",
                    status: "PENDING"
                }
            });
            const fullOrder = await tx.order.findUnique({
                where: { id: newOrder.id },
                include: {
                    items: {
                        include: {
                            product: true,
                            cartItem: true
                        },
                    },
                    payment: true,
                },
            });
            return fullOrder;
        });
        return res.status(201).json({ fullOrder, message: "order created successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getMyOrders = async (req, res) => {
    try {
        const user = req.user;
        await checkUser(user);
        const order = await prisma.order.findMany({
            where: {
                userId: user.id
            },
            include: {
                items: {
                    include: {
                        cartItem: true,
                        product: true
                    }
                },
                payment: true,
            }
        });
        if (!order || order.length === 0)
            return res.status(404).json({
                error: "no order found"
            });
        return res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getSingleOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        if (!orderId)
            return res.status(400).json({
                error: "bad request, order id is required"
            });
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: {
                    include: {
                        product: true,
                        cartItem: true
                    }
                }
            }
        });
        if (!order)
            return res.status(404).json({
                error: "order not found"
            });
        return res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getOrdersInMyShop = async (req, res) => {
    const { shopId } = req.params;
    try {
        if (!shopId)
            return res.status(400).json({
                error: "bad request"
            });
        const user = req.user;
        const orders = await prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            shopId: shopId
                        }
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true,
                    },
                },
                payment: true,
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                cartItems: true
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc", // Most recent orders first
            },
        });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    try {
        if (!status || !orderId)
            return res.status(400).json({
                error: "bad request"
            });
        const allowedStatus = ["PAID", "SHIPPED", "DELIVERED"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                error: "bad request, incorrect status input"
            });
        }
        const orderExist = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });
        if (!orderExist) {
            return res.status(404).json({
                error: "order does not exist"
            });
        }
        const updated = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: status
            },
            include: {
                payment: true,
                items: {
                    include: {
                        product: true,
                        cartItem: true
                    }
                }
            }
        });
        return res.status(200).json({
            updated,
            message: `${status} successfully`
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const user = req.user;
        await checkUser(user);
        if (!orderId)
            return res.status(400).json({
                error: "bad request, orderId is required"
            });
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });
        if (!order)
            return res.status(404).json({
                error: "order not found"
            });
        const orderCancelled = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: "CANCELLED"
            }
        });
        return res.status(200).json({
            orderCancelled,
            message: "order cancelled"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=order.js.map