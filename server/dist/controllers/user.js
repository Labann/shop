import * as express from "express";
import {} from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";
import { generateToken } from "../utils/genearateToken.js";
import { checkUser } from "../utils/checkUser.js";
import dotenv from "dotenv";
dotenv.config();
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                error: "bad request"
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(404).json({
                error: "user not found"
            });
        if (!user.password)
            return res.status(401).json({
                error: "user logged in using google, has no password"
            });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: "incorrect password"
            });
        }
        const { password: _, ...safeUser } = user;
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json(safeUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
export const redirectToClientHome = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.send(`<h1>user not found</h1>`).status(404);
        }
        const token = await generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });
        if (!process.env.CLIENT_URL) {
            throw new Error("CLIENT URL absent in .env");
        }
        return res.redirect(process.env.CLIENT_URL);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
    export const getMe = async (req, res) => {
        try {
            const user = req.user;
            return res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const signup = async (req, res) => {
        const { firstName, lastName, email, password, username, } = req.body;
        try {
            if (!firstName || !lastName || !email || !password || !username) {
                return res.status(400).json({
                    error: "bad request"
                });
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (user) {
                return res.status(401).json({
                    error: "user already exist"
                });
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    firstName,
                    lastName,
                    password: passwordHashed,
                    email
                }
            });
            const token = await generateToken(newUser);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                sameSite: "strict",
                maxAge: 15 * 24 * 60 * 60 * 1000
            });
            const { password: _, ...safeUser } = newUser;
            return res.status(201).json(safeUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const logout = async (req, res) => {
        try {
            res.cookie("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 0
            });
            return res.status(200).json({
                message: "logged out successfully"
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const getProfile = async (req, res) => {
        try {
            const { username } = req.body;
            if (!username) {
                return res.status(400).json({
                    error: "bad request"
                });
            }
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            });
            if (!user) {
                return res.status(404).json({
                    error: "user not found"
                });
            }
            const { password, ...saferUser } = user;
            return res.status(200).json(saferUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const updateProfile = async (req, res) => {
        try {
            const data = req.body;
            const user = req.user;
            await checkUser(user);
            if (!Object.keys(data).length) {
                return res.status(400).json({
                    error: "no data provided"
                });
            }
            const updateUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data
            });
            const { password, ...safeUser } = updateUser;
            return res.status(200).json(safeUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const deleteAccount = async (req, res) => {
        const { username } = req.body;
        try {
            const user = req.user;
            if (!username)
                return res.status(400).json({
                    error: "bad request"
                });
            await checkUser(user);
            const deleted = await prisma.user.delete({
                where: {
                    username: username
                }
            });
            return res.status(200).json(deleted);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    export const getAllUser = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            if (!users || users.length === 0)
                return res.status(404).json({
                    error: "users not found"
                });
            return res.status(200).json(users);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    };
    //getProfile 
    //update profile
    //delete account
};
//getProfile 
//update profile
//delete account
//# sourceMappingURL=user.js.map