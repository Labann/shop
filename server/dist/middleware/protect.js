import jwt, {} from "jsonwebtoken";
import * as express from "express";
import prisma from "../utils/prisma";
export const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        else if (req.cookies?.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({
                error: "unauthorized -- no token"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({
                error: "invalid token"
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        if (!user) {
            console.log(decoded.userId);
            console.log("the error is here");
            return res.status(404).json({
                error: 'user not found'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=protect.js.map