import type { User } from "../generated/prisma/index"

export const checkUser = (user: User) => {
    try {
        if(!user) throw new Error("user not found")
        return user
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}