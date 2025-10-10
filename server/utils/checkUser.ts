import type { User } from "../generated/prisma/index.js"
import prisma from "./prisma.js"
import * as express from "express"

export const checkUser = async (user: User) => {
    try {
        const validUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })
        if(!validUser) {
            console.log("the error is in check user")
            throw Error("user not found")
        }
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}

