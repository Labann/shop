import * as express from "express";
import prisma from "../utils/prisma";
import { checkUser } from "../utils/checkUser";
export const createCart = async (req, res) => {
    try {
        const user = req.user;
        checkUser(user);
        const cartExist = await prisma.cart.findUnique({
            where: {
                userId: user.id
            }
        });
        if (cartExist)
            return res.status(400).json({
                error: "cart already exist"
            });
        const newCart = await prisma.cart.create({
            data: {
                userId: user.id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
            }
        });
        return res.status(201).json(newCart);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const updateItemQuantity = async (req, res) => {
    const { quantity } = req.body;
    const { itemId, cartId } = req.params;
    try {
        if (!quantity) {
            return res.status(400).json({
                error: "bad request, quantity is required"
            });
        }
        if (!itemId || !cartId) {
            return res.status(400).json({
                error: "bad request, itemId && cartId is required"
            });
        }
        const user = req.user;
        checkUser(user);
        const itemExist = await prisma.cartItem.findUnique({
            where: {
                id: itemId,
                cartId: cartId
            }
        });
        if (!itemExist) {
            return res.status(404).json({
                error: "item does not exist in cart"
            });
        }
        const updatedItem = await prisma.cartItem.update({
            where: {
                id: itemId
            },
            data: {
                quantity: quantity
            },
            include: {
                product: {
                    include: {
                        shop: true
                    }
                }
            }
        });
        return res.status(200).json(updatedItem);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const addToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    try {
        if (!cartId || !productId || !quantity) {
            return res.status(400).json({
                error: 'bad request'
            });
        }
        const cartExist = await prisma.cart.findUnique({
            where: {
                id: cartId
            }
        });
        const productExist = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        if (!cartExist) {
            return res.status(404).json({
                error: "cart does not exist"
            });
        }
        if (!productExist) {
            return res.status(404).json({
                error: "product does not exist"
            });
        }
        if (quantity <= 0)
            return res.status(400).json({
                error: "quantity cannot be less than zero"
            });
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    cartId,
                    productId
                }
            }
        });
        if (cartItem) {
            const isOrdered = await prisma.orderItem.findUnique({
                where: {
                    cartItemId: cartItem.id
                }
            });
            if (isOrdered) {
                //if is in cartItem and ordered already delete and create a new one
                await prisma.cartItem.update({
                    where: {
                        id: cartItem.id,
                    },
                    data: {
                        cartId: null
                    }
                });
                const newCartItem = await prisma.cartItem.create({
                    data: {
                        cartId,
                        productId,
                        quantity: parseInt(quantity)
                    },
                    include: {
                        product: {
                            include: {
                                shop: true
                            }
                        }
                    }
                });
                return res.status(200).json(newCartItem);
            }
            //if is cartItem and not ordered yet just update quantity
            const updatedCartItem = await prisma.cartItem.update({
                where: {
                    productId_cartId: {
                        cartId,
                        productId
                    }
                },
                include: {
                    product: {
                        include: {
                            shop: true
                        }
                    }
                },
                data: {
                    quantity: parseInt(quantity)
                }
            });
            return res.status(200).json(updatedCartItem);
        }
        const newCartItem = await prisma.cartItem.create({
            data: {
                cartId,
                productId,
                quantity: parseInt(quantity)
            },
            include: {
                product: {
                    include: {
                        shop: true
                    }
                }
            }
        });
        return res.status(200).json(newCartItem);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const removeFromCart = async (req, res) => {
    const { productId, cartId } = req.params;
    try {
        if (!cartId || !productId)
            return res.status(400).json({
                error: "bad request"
            });
        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    productId,
                    cartId
                }
            }
        });
        if (!existingCartItem)
            return res.status(404).json({
                error: "the item does not exist in the Cart"
            });
        const deletedItem = await prisma.cartItem.delete({
            where: {
                productId_cartId: {
                    cartId,
                    productId
                }
            }
        });
        return res.status(200).json(deletedItem);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getMyCart = async (req, res) => {
    try {
        const user = req.user;
        await checkUser(user);
        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                shop: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const clearCart = async (req, res) => {
    const { cartId } = req.params;
    try {
        const user = req.user;
        await checkUser(user);
        if (!cartId)
            return res.status(400).json({
                error: "bad request"
            });
        const cart = await prisma.cart.findUnique({
            where: {
                id: cartId
            }
        });
        if (!cart)
            return res.status(404).json({
                error: "cart does not exist"
            });
        const removedCart = await prisma.cartItem.deleteMany({
            where: {
                cartId: cartId
            },
        });
        return res.status(200).json(removedCart);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=cart.js.map