import * as express from "express";
import type { CartItem, User } from "../generated/prisma/index";
import prisma from "../utils/prisma";
import { checkUser } from "../utils/checkUser";



export const createCart: express.RequestHandler = async (req, res) => {
    try {
        const user = req.user as User;

        const cartExist = await prisma.cart.findUnique({
            where:{
                userId: user.id
            }
        })

        if(cartExist) return res.status(400).json({
            error: "cart already exist"
        })

        const newCart = await prisma.cart.create({
            data:{
                userId: user.id
            }
        });

        return res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const addToCart: express.RequestHandler =  async (req, res) =>{
    const {
        cartId,
        productId,
        quantity
    } = req.body;
    try {
        if(!cartId || !productId || !quantity){
            return res.status(400).json({
                error: 'bad request'
            })
        }
        const cartExist = await prisma.cart.findUnique({
            where: {
                id: cartId
            }
        })
        const productExist = await prisma.product.findUnique({
            where:{
                id: productId
            }
        })

        if(!cartExist){
            return res.status(404).json({
                error: "cart does not exist"
            })
        }
        if(!productExist){
            return res.status(404).json({
                error: "product does not exist"
            })
        }
        
        if(quantity <= 0) return res.status(400).json({
            error: "quantity cannot be less than zero"
        })

        const cartItem = await prisma.cartItem.findUnique({
            where:{
                productId_cartId:{
                    cartId,
                    productId
                }
            }
        })

        
        if(cartItem){
            const updatedCartItem = await prisma.cartItem.update({
                where:{
                    productId_cartId:{
                        cartId,
                        productId
                    }
                },
                data:{
                    quantity: parseInt(quantity)
                }
            });

            return res.status(200).json(updatedCartItem);
        }

        const newCartItem = await prisma.cartItem.create({
            data:{
                cartId,
                productId,
                quantity: parseInt(quantity)
            }
        });

        return res.status(200).json(newCartItem)
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const removeFromCart: express.RequestHandler = async (req, res) => {
    
    const {productId, cartId} = req.params;
    try {
        if(!cartId || !productId) return res.status(400).json({
            error: "bad request"
        })

        const existingCartItem = await prisma.cartItem.findUnique({
            where:{
                productId_cartId:{
                    productId,
                    cartId
                }
            }
        })

        if(!existingCartItem) return res.status(404).json({
            error: "the item does not exist in the Cart"
        })

        const deletedItem = await prisma.cartItem.delete({
            where:{
                productId_cartId:{
                    cartId,
                    productId
                }
            }
        }) 

        return res.status(200).json(deletedItem)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const getMyCart: express.RequestHandler = async (req, res) => {
    
    try {
        
        const user = req.user as User
        await checkUser(user);
        const cart = await prisma.cart.findUnique({
            where:{
                userId: user.id
            },
            include: {
                items: true
            }
        })

        return res.status(200).json(cart)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const clearCart: express.RequestHandler = async (req, res) => {
    const {cartId} = req.params;
    try{
        
        const user = req.user as User;
        await checkUser(user);
        if(!cartId) return res.status(400).json({
            error: "bad request"
        })

        const cart = await prisma.cart.findUnique({
            where:{
                id: cartId
            }
        }) 
        
        if(!cart) return res.status(404).json({
            error: "cart does not exist"
        })

        const removedCart = await prisma.cartItem.deleteMany({
            where:{
                cartId: cartId
            },
        })

        return res.status(200).json(removedCart)
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}