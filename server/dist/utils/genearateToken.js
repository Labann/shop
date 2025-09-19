import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (user) => {
    if (!user)
        throw new Error("user not found");
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15d" });
    return token;
};
//# sourceMappingURL=genearateToken.js.map