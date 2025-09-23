import * as express from "express"
import type { OrderItem, Payment, Product, User } from "../generated/prisma/index";
import prisma from "../utils/prisma";
import { checkUser } from "../utils/checkUser";


export const createOrder: express.RequestHandler = async (req, res) => {
    const {
        items
    }: {
        items: OrderItem[]
    } = req.body
    try {
        const user = req.user as User;
        checkUser(user);
        
        if(!items || items.length === 0){
            return res.status(400).json({
                error: "items must be at least one"
            })
        }


        const productIds = items.map(item => item.productId);
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        if(products.length !== items.length){
            return res.status(404).json({
                error: "one or more product not found"
            })
        }

        //checking quantity with stock
        for(const item of items){
            const product = products.find(p => p.id === item.productId);
            if(product){
                if(item.quantity > product.stock){
                    return res.status(400).json({
                        error: `not enough stock for product: ${product.name}`
                    })
                }
            }
        }

        //for atomicity when one operation fails everything fails
        const fullOrder = await prisma.$transaction(async tx => {
            //CREATE ORDER
            const newOrder =  await tx.order.create({
                data: {
                    userId: user.id,
                    status: "PENDING"
                },
                include: {
                items: {
                    include:{
                        product: true
                    }
                },
                    payment: true
                }
            })

            //create all order-items
            await tx.orderItem.createMany({
                data: items.map(item => ({
                    orderId: newOrder.id,
                    quantity: item.quantity,
                    productId: item.productId
                }))
            })

            //Deduct stock for each product
            for(const item of items){
                await tx.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                })
            }

            //create a pending payment record

            await tx.payment.create({
                data:{
                    orderId: newOrder.id,
                    method: "MPESA",
                    status: "PENDING"
                }
            })


            return newOrder;
        })

          
        return res.status(201).json({fullOrder, message: "order created successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}
export const getMyOrders: express.RequestHandler = async (req, res) => {
    const {orderId} = req.params;
    try {
        if(!orderId) return res.status(400).json({
            error: "bad request order is required"
        })

        const user = req.user as User
        checkUser(user);
        const order = await prisma.order.findMany({
            where: {
                userId: user.id
            }
        });

        if(!order || order.length === 0) return res.status(404).json({
            error: "no order found"
        })

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const getSingleOrder: express.RequestHandler = async (req, res) => {
    const {orderId} = req.params
    try {
        if(!orderId) return res.status(400).json({
            error: "bad request, order id is required"
        })

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });

        if(!order) return res.status(404).json({
            error: "order not found"
        })

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const updateOrderStatus: express.RequestHandler = async (req, res) => {
    const {status} = req.body;
    const {orderId} = req.params;
    try {
        if(!status || !orderId) return res.status(400).json({
            error: "bad request"
        })

        const allowedStatus = ["PAID", "SHIPPED", "DELIVERED"]

        if(!allowedStatus.includes(status)){
             return res.status(400).json({
                error: "bad request, incorrect status input"
             })
        }

         const updated = await prisma.order.update({
                where: {
                    id: orderId
                },
                data:{
                    status: status
                }
            })

        return res.status(200).json({
                updated,
                message: `${status} successfully`
        })
           
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const cancelOrder: express.RequestHandler = async (req, res) => {
    const {orderId} = req.params;
    try {
        const user = req.user as User;
        checkUser(user);
        
        if(!orderId) return res.status(400).json({
            error:"bad request, orderId is required"
        })

        const order = await prisma.order.findUnique({
            where:{
                id: orderId
            }
        })

        if(!order) return res.status(404).json({
            error: "order not found"
        })

        const orderCancelled = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: "CANCELLED"
            }
        })

        return res.status(200).json({
            orderCancelled,
            message: "order cancelled"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

