import type { User } from "../generated/prisma/index.js"
import { checkUser } from "../utils/checkUser.js"
import {type NextFunction} from "express"
import * as express from "express"
export const adminsOnly: express.RequestHandler  = async (req, res, next) => {
    try {
        const user = req.user as User
        await checkUser(user)
        if(user.role !== "SUPER_ADMIN"){
            throw new Error("admins only")
        }   
        next(); 
    } catch (error) {
        return res.status(500).json({
            error: (error as Error).message || "User validation failed",
        })
    }
    
}

export const vendorsOnly: express.RequestHandler = async (req, res, next) => {
    try {
        const user = req.user as User
        await checkUser(user)
        
        if(user.role !== "VENDOR"){
            return res.status(401).json({
                error: "Unauthorized -- vendors only"
            })
        }
        
        next()    
    } catch (error) {
        return res.status(500).json({
            error: (error as Error).message
        })
        
    }
}