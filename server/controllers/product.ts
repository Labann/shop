import * as express from "express";
import type { Product } from "../generated/prisma/index.js";
import prisma from "../utils/prisma.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const addProduct: express.RequestHandler = async (req, res) => {
    const {
        name,
        description,
        category,
        stock, 
        price
     } = req.body;

    const files = req.files as Express.Multer.File[]

    const {shopId} = req.params;
    if(!shopId) return res.status(400).json({
        error: "shop id is required"
    })
    try {
        if(!name || !description 
            || !price || !category || !stock 
            || files.length === 0){
            return res.status(400).json({
                error: "bad request"
            })
        }

        const images = await Promise.all(
            files.map(file => uploadToCloudinary(file?.buffer, {folder: "products_img"}))
        )
        const imagesUrl = images.map(img => img.secure_url);
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                images: imagesUrl,
                stock: parseInt(stock),
                shopId,
            }, 
            
        })

        res.status(201).json(newProduct)
    } catch (error) {
        
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const updateProduct: express.RequestHandler = async (req, res) => {
    const data = req.body
    const {productId} = req.params;
    try {

        const files = req.files as Express.Multer.File[];

        if(!productId) return res.status(400).json({
            error: "bad request"
        })

        const productExist = await prisma.product.findUnique({
            where:{
                id: productId
            }
        })

        if(!productExist) return res.status(404).json({
            error: "product does not exist in database"
        })

        if(!data || data.length === 0){
            return res.status(400).json({
                error: "at least on detail is required"
            })
        }

        if(files && files.length !== 0) {
            const images = await Promise.all(
                files.map(img => uploadToCloudinary(img.buffer, {folder: "products_folder"}))
            )
            const imageUrls = images.map(img => img.secure_url);
            
            data.images = imageUrls

        }

        if(data.price || data.stock){
            data.price = parseInt(data.price)
            data.stock = parseInt(data.stock)
        }
        
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data,
            include:{
                shop: true
            }
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

        const productExist = await prisma.product.findUnique({
            where: {
                id:  productId
            }
        })

        if(!productExist){
            
            return res.status(404).json({
                
                error: "product does not exist in the database"
            })
        }

        const deletedProduct = await prisma.product.delete({
            where:{
                id: productId
            }
        })

        return res.status(200).json({deletedProduct, message: "deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const getAllProducts:  express.RequestHandler = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                shop: true
            }
        });
        if(products.length === 0){
            
            return res.status(404).json({
                error: "no products found"
            })
        }
        const shuffledProducts = shuffleArray(products);
        return res.status(200).json(shuffledProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}
export const getProductByShop: express.RequestHandler = async (req, res) => {
    const {shopId} = req.params;
    console.log("reached")
    try {
        if(!shopId) return res.status(400).json({
            error: "bad request"
        })

        const shopExist = await prisma.shop.findUnique({
            where:{
                id: shopId
            }
        })

        if(!shopExist) return res.status(404).json({
            error: "shop does not exist in database"
        })
        
        const products = await prisma.product.findMany({
            where: {
                shopId: shopId
            },
            include: {
                shop: true
            }
        })

        if(products.length === 0) {
            console.error("Error in no product found")
            return res.status(404).json({
            error: "no product found"
        })}

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
            },
            include: {
                shop: true
            }
        })

        if(!product) {
            
            return res.status(404).json({
            error: "product not found"
        })}

        

        return res.status(200).json(product)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const toggleIsFeatured: express.RequestHandler = async (req, res) => {
    const {productId} = req.params;
    try {
        if(!productId){
            return res.status(400).json({
                error: "bad request, product id is required"
            })
        }
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if(!product){
            return res.status(404).json({
                error: "product not found"
            })
        }

        if(product.isFeatured){
            const updatedProduct = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    isFeatured: false
                }
            })

            return res.status(200).json({
                message: "remove from featured",
                updatedProduct
            })
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                isFeatured: true
            }
        })

        return res.status(200).json({
            message: "added to featured",
            updatedProduct
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const getProductByCategory: express.RequestHandler = async (req, res) => {
    const {category} = req.params;
    try {
        if(!category){
            return res.status(400).json({
                error: 'bad request'
            })
        }

        const shops = await prisma.shop.findMany({
            where: {
                category: category
            },
            include: {
                products: true
            }
        });

        const products = shops.map(shop => shop.products);

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

export const searchProducts: express.RequestHandler = async (req, res) => {
    const {search} = req.params
    try {
        if (!search || typeof search !== "string") {
            return res.status(400).json({ error: "Search search is required" });
        }

        // Search products by name, description, or category
        const products = await prisma.product.findMany({
                where: {
                    OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { category: { contains: search, mode: "insensitive" } },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}

