import * as express from "express"
import type { Shop, User } from "../generated/prisma/index";
import prisma from "../utils/prisma";
import { checkUser } from "../utils/checkUser";

export const applyForShop: express.RequestHandler = async (req, res) => {
    const {
        name,
        description,
        logo,
        category,
        location,
        
    }: Shop= req.body
    try {
        if(!name && !description && !logo && !category && !location){
            return res.status(400).json({
                error: "bad request"
            })
        }

        const user = req.user as User;
        checkUser(user)
        const newShop = await prisma.shop.create({
            data: {
                name,
                description,
                logo,
                category,
                location,
                userId: user.id
            }
        })

        return res.status(201).json(newShop);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const approveShop: express.RequestHandler = async (req, res) => {
    const {shopId} = req.params;
    try {
        if(!shopId) return res.status(400).json({
            error: "bad request"
        })

        const shop = prisma.shop.findUnique({
            where: {
                id: shopId
            }
        })

        if(!shop) return res.status(404).json({
            error: "shop not found"
        })

        const approveShop = await prisma.shop.update({
            where: {
                id: shopId
            },
            data: {
                status: "OPEN"
            }
        });

        return res.status(200).json(approveShop);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const closeShop: express.RequestHandler = async (req, res) => {
    const {shopId} = req.params;
    try {
        if(!shopId) return res.status(400).json({
            error: "bad request"
        })

        const shop = await prisma.shop.findUnique({
            where: {
                id:  shopId
            }
        });

        if(!shop) return res.status(404).json({
            error: 'shop not found'
        })

        const closedShop = await prisma.shop.update({
            where: {
                id: shopId
            },
            data: {
                status: "CLOSED"
            }
        })

        return res.status(200).json(closedShop)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const updateShopDetails: express.RequestHandler = async (req, res) => {
    const {shopId} = req.params
    const data = req.body;
    try {
        if(!shopId) return res.status(400).json({
            error: "bad request"
        })

        if(!Object.keys(data).length){
            return res.status(400).json({
                error: 'at least on detail is required'
            })
        }

        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        })

        if(!shop) return res.status(404).json({
            error: 'shop not found'
        })

        const updatedShop = await prisma.shop.update({
            where:{
                id: shopId
            },
            data
        })

        return res.status(200).json(updatedShop);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

//GET ALL SHOPS
export const getAllShops: express.RequestHandler = async (req, res) => {
    try {
        const shops = await prisma.shop.findMany({});

        if(!shops) return res.status(404).json({
            error: "no shop found"
        })

        return res.status(200).json(shops);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const getMyShops: express.RequestHandler = async (req, res) => {
    
    try {
        const user = req.user as User
        
        checkUser(user);

        const shops = await prisma.shop.findMany({
            where: {
                userId: user.id
            }
        });

        return res.status(200).json(shops)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const getMyShop: express.RequestHandler = async(req, res) => {
    const {name} = req.body
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                name: name
            }
        });

        if(!shop) return res.status(404).json({
            error: "shop not found"
        })

        return res.status(200).json(shop)
    } catch (error) {
        console.error((error as Error).message)
    }
}

//shop controllers

//apply For Shop
