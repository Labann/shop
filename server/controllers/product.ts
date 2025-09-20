import * as express from "express";
import type { Product } from "../generated/prisma/index";
import prisma from "../utils/prisma";

export const addProduct: express.RequestHandler = async (req, res) => {
    const {
        name,
        description,
        category,
        stock, 
        price
    }: Product = req.body;

    

    const {shopId} = req.params;
    try {
        if(!name || !description 
            || !price || !category || !stock 
            || !shopId){
            return res.status(400).json({
                error: "bad request"
            })
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                stock,
                shopId,
            }
        })

        res.status(201).json(newProduct)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const updateProduct: express.RequestHandler = async (req, res) => {
    const data = req.body
    const {productId} = req.params;
    try {

        if(!productId) return res.status(400).json({
            error: "bad request"
        })

        if(!Object.keys(data).length){
            return res.status(400).json({
                error: "at least on detail is required"
            })
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data
        }) 

        return res.status(200).json(updatedProduct)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const deleteProduct: express.RequestHandler = async (req, res) => {
    const {productId} = req.params;
    try {
        if(!productId) return res.status(400).json({
            error: "bad request"
        })

        const deletedProduct = await prisma.product.delete({
            where:{
                id: productId
            }
        })

        return res.status(200).json(deletedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const getProductByShop: express.RequestHandler = async (req, res) => {
    const {shopId} = req.params;
    try {
        if(!shopId) return res.status(400).json({
            error: "bad request"
        })

        const products = await prisma.product.findMany({
            where: {
                shopId: shopId
            }
        })

        if(products.length === 0) return res.status(404).json({
            error: "no product found"
        })

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const getSingleProduct: express.RequestHandler = async (req, res) => {
    const {productId} = req.params
    try {
        if(!productId) return res.status(400).json({
            error: "bad request"
        })
        
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if(!product) return res.status(404).json({
            error: "product not found"
        })

        return res.status(200).json(product)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}



