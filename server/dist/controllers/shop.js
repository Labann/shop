import * as express from "express";
import prisma from "../utils/prisma.js";
import { checkUser } from "../utils/checkUser.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
export const applyForShop = async (req, res) => {
    const { name, description, category, location, } = req.body;
    const file = req.file;
    if (!file)
        return res.status(400).json({
            error: "bad request logo is a must"
        });
    let logoImg;
    let logoUrl;
    try {
        if (!name || !description || !category || !location || !file) {
            return res.status(400).json({
                error: "bad request"
            });
        }
        const categories = [
            "AIRPODES",
            "CAMERA",
            "EARPHONES",
            "MOBILES",
            "MOUSE",
            "PRINTERS",
            "PROCESSOR",
            "REFRIGERATOR",
            "SPEAKERS",
            "TRIMMERS",
            "TELEVISIONS",
            "WATCHES"
        ];
        if (!categories.includes(category)) {
            return res.status(400).json({
                error: "category not allowed"
            });
        }
        const shopExist = await prisma.shop.findUnique({
            where: {
                name: name
            }
        });
        if (shopExist)
            return res.status(400).json({
                error: "shop already exist"
            });
        const user = req.user;
        await checkUser(user);
        if (user.role === "SUPER_ADMIN") {
            return res.status(401).json({
                error: "unauthorized - super admin cannot apply for shop"
            });
        }
        logoImg = await uploadToCloudinary(file?.buffer, { folder: "logo_upload" });
        logoUrl = logoImg.secure_url;
        const newShop = await prisma.shop.create({
            data: {
                name,
                description,
                logo: logoUrl ? logoUrl : null,
                category,
                location,
                userId: user.id
            }
        });
        return res.status(201).json(newShop);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const approveShop = async (req, res) => {
    const { shopId } = req.params;
    try {
        if (!shopId)
            return res.status(400).json({
                error: "bad request"
            });
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        if (!shop)
            return res.status(404).json({
                error: "shop not found"
            });
        if (shop.status === "OPEN") {
            return res.status(400).json({
                error: "already approved"
            });
        }
        await prisma.user.update({
            where: {
                id: shop.userId
            },
            data: {
                role: "VENDOR"
            }
        });
        const approveShop = await prisma.shop.update({
            where: {
                id: shopId
            },
            include: {
                owner: true
            },
            data: {
                status: "OPEN",
            }
        });
        return res.status(200).json(approveShop);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const closeShop = async (req, res) => {
    const { shopId } = req.params;
    try {
        if (!shopId)
            return res.status(400).json({
                error: "bad request"
            });
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        const user = req.user;
        await checkUser(user);
        if (!shop)
            return res.status(404).json({
                error: 'shop not found'
            });
        if (shop.status === "PENDING") {
            return res.status(400).json({
                error: "shop status is PENDING approval, it's not opened yet!"
            });
        }
        if (user.id !== shop.userId) {
            return res.status(401).json({
                error: "only owners can close shop"
            });
        }
        const closedShop = await prisma.shop.update({
            where: {
                id: shopId
            },
            data: {
                status: "CLOSED"
            }
        });
        return res.status(200).json(closedShop);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const updateShopDetails = async (req, res) => {
    const { shopId } = req.params;
    const data = req.body;
    try {
        if (!shopId)
            return res.status(400).json({
                error: "bad request"
            });
        if (!data || data.length === 0) {
            return res.status(400).json({
                error: 'at least on detail is required'
            });
        }
        if (data.name) {
            const shopExist = await prisma.shop.findUnique({
                where: {
                    name: data.name
                }
            });
            if (shopExist)
                return res.status(400).json({
                    error: "shop already exist"
                });
        }
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        const user = req.user;
        await checkUser(user);
        if (!shop)
            return res.status(404).json({
                error: 'shop not found'
            });
        if (user.id !== shop.userId) {
            return res.status(401).json({
                error: "only owners can close shop"
            });
        }
        if (req.file) {
            const logoImg = await uploadToCloudinary(req.file.buffer, { folder: "logo_folder" });
            const logoUrl = logoImg.secure_url;
            data.logo = logoUrl;
        }
        const updatedShop = await prisma.shop.update({
            where: {
                id: shopId
            },
            data
        });
        return res.status(200).json(updatedShop);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
//GET ALL SHOPS
export const getAllShops = async (req, res) => {
    try {
        const shops = await prisma.shop.findMany({
            include: {
                owner: true
            }
        });
        if (!shops || shops.length === 0)
            return res.status(404).json({
                error: "no shop found"
            });
        return res.status(200).json(shops);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getMyShops = async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId)
            return res.status(400).json({
                error: "bad request"
            });
        const shops = await prisma.shop.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(shops);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getMyShop = async (req, res) => {
    const { name } = req.body;
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                name: name
            }
        });
        if (!shop)
            return res.status(404).json({
                error: "shop not found"
            });
        return res.status(200).json(shop);
    }
    catch (error) {
        console.error(error.message);
    }
};
export const getApplication = async (req, res) => {
    try {
        const applications = await prisma.shop.findMany({
            where: {
                status: "PENDING"
            }
        });
        if (applications.length === 0)
            return res.status(404).json({
                error: "no applications found"
            });
        return res.status(200).json(applications);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
//shop controllers
//apply For Shop
//# sourceMappingURL=shop.js.map