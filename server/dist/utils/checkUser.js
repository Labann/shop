import prisma from "./prisma";
import * as express from "express";
export const checkUser = async (user) => {
    try {
        const validUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });
        if (!validUser) {
            console.log("the error is in check user");
            throw Error("user not found");
        }
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
//# sourceMappingURL=checkUser.js.map