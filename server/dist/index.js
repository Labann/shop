import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import shopRoutes from "./routes/shop.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import morgan from "morgan";
import prisma from "./utils/prisma.js";
import splitName from "./utils/splitName.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const app = express();
app.use(cors({
    origin: ["https://shop-tau-inky.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true
}));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
dotenv.config();
//app.use(errorHandler)
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/user/v2/login/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        return done(new Error("email not available"));
    }
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    const name = splitName(profile.displayName);
    //sign-up proxy
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: email,
                firstName: name.firstName,
                lastName: name.lastName,
                username: profile.username || profile.displayName
            }
        });
    }
    //login
    done(null, user);
}));
const port = process.env.PORT;
app.listen(port, () => console.log(`app running in port: ${port}`));
//# sourceMappingURL=index.js.map