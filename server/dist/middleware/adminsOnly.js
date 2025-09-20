import { checkUser } from "../utils/checkUser";
export const adminsOnly = (user) => {
    checkUser(user);
    if (user.role !== "SUPER_ADMIN") {
        throw new Error("admins only");
    }
};
export const vendorsOnly = (user) => {
    checkUser(user);
    if (user.role !== "VENDOR") {
        throw new Error("Vendors ONLY");
    }
};
//# sourceMappingURL=adminsOnly.js.map