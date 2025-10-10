import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
import shopRoutes from "./routes/shop.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"
import paymentRoutes from "./routes/payment.js"
import morgan from "morgan";

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "https://shop-rkym2sntt-labanns-projects.vercel.app/"],
    credentials: true
}));
app.use(express.json({limit: "30mb"}))
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cookieParser());
app.use(morgan("dev"))
dotenv.config();

//app.use(errorHandler)
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", paymentRoutes)

const port = process.env.PORT!
app.listen(port, () => console.log(`app running in port: ${port}`));