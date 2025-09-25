import { checkUser } from "../utils/checkUser";
import {} from "express";
import * as express from "express";
export const adminsOnly = async (req, res, next) => {
    try {
        const user = req.user;
        await checkUser(user);
        if (user.role !== "SUPER_ADMIN") {
            throw new Error("admins only");
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || "User validation failed",
        });
    }
};
export const vendorsOnly = async (req, res, next) => {
    try {
        const user = req.user;
        await checkUser(user);
        if (user.role !== "VENDOR") {
            return res.status(401).json({
                error: "Unauthorized -- vendors only"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=adminsOnly.js.map