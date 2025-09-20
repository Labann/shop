import * as express from "express";
import { Prisma, type User } from "../generated/prisma/index";
import bcrypt from "bcrypt"
import prisma from "../utils/prisma";
import { generateToken } from "../utils/genearateToken";
import { checkUser } from "../utils/checkUser";


export const login: express.RequestHandler = async (req, res) =>{
    const {
        email,
        password
    }: User = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                error: "bad request"
            })
        }        

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user) return res.status(404).json({
            error: "user not found"
        })

        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({
                error: "incorrect password"
            })
        }

        const {password: _, ...safeUser} = user;
        
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000 
        })

        return res.status(200).json(safeUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const signup: express.RequestHandler = async (req, res) => {
    const {
        fullname,
        email,
        password,
        username,
    }: User = req.body;
    try {
        if(!fullname || !email || !password || !username){
            return res.status(400).json({
                error: "bad request"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(user){
            return res.status(401).json({
                error: "user already exist"
            })
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                fullname,
                password,
                email
            }
        })

        const {password: _, ...safeUser} = req.body;

        return res.status(201).json(safeUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const logout: express.RequestHandler = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 0
        })

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const getProfile: express.RequestHandler = async (req, res) =>{
    try {
        const {username} = req.body;
        if(!username){
            return res.status(400).json({
                error: "bad request"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(!user){
            return res.status(404).json({
                error: "user not found"
            })
        }

        const {password, ...saferUser} = user;

        return res.status(200).json(saferUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const updateProfile: express.RequestHandler = async (req, res) =>{
    try {
        const data = req.body;
        

        const user = req.user as User

        checkUser(user);

        if(!Object.keys(data).length){
            return res.status(400).json({
                error: "no data provided"
            })
        }

        const updateUser = await prisma.user.update({
            where:{
                id: user.id        
            },
            data
        });

        const {password, ...safeUser} = updateUser;

        return res.status(200).json(safeUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}


export const deleteAccount: express.RequestHandler = async (req, res) => {
    try {
        const user = req.user as User;
        
        checkUser(user);

        const deleted = await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        return res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}
//getProfile 
//update profile
//delete account