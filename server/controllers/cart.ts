import e, * as express from "express";
import type { CartItem } from "../generated/prisma/index";
import prisma from "../utils/prisma";

export const addToCart: express.RequestHandler =  async (req, res) =>{
    const {
        cartId, 
        productId,
        quantity
    }: CartItem = req.body;
    try {
        if(!cartId || !productId || !quantity){
            return res.status(400).json({
                error: 'bad request'
            })
        }

        if(quantity < 0) return res.status(400).json({
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
                    quantity
                }
            });

            return res.status(200).json(updatedCartItem);
        }

        const newCartItem = await prisma.cartItem.create({
            data:{
                cartId,
                productId,
                quantity
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
    const {
        cartId,
    }: CartItem = req.body;
    const {productId} = req.params;
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
    const {cartId} = req.params;
    try {
        if(!cartId) return res.status(400).json({
            error: "bad request, cartId is required"
        })

        const cart = await prisma.cart.findUnique({
            where:{
                id: cartId
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
        if(!cartId) return res.status(400).json({
            error: "bad request, cartId required"
        })

        const cart = await prisma.cart.findUnique({
            where:{
                id:cartId
            }
        }) 
        if(!cart) return res.status(404).json({
            error: "cart does not exist"
        })

        const removedCart = await prisma.cartItem.delete({
            where:{
                id: cartId
            }
        })

        return res.status(200).json(removedCart)
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}