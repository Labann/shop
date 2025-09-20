import type { User } from "../generated/prisma/index";
export declare const checkUser: (user: User) => {
    id: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: import("../generated/prisma/index").$Enums.ROLE;
    createdAt: Date;
    updatedAt: Date;
};
//# sourceMappingURL=checkUser.d.ts.map