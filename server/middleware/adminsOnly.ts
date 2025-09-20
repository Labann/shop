import type { User } from "../generated/prisma/index"
import { checkUser } from "../utils/checkUser"


export const adminsOnly = (user: User) => {
    checkUser(user)
    if(user.role !== "SUPER_ADMIN"){
        throw new Error("admins only")
    }
}

export const vendorsOnly = (user: User) => {
    checkUser(user);
    if(user.role !== "VENDOR"){
        throw new Error("Vendors ONLY")
    }
}