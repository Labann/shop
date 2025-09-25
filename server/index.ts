import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user"
import productRoutes from "./routes/product"
import shopRoutes from "./routes/shop"
import cartRoutes from "./routes/cart"
import orderRoutes from "./routes/order"
import morgan from "morgan";
import { errorHandler } from "./utils/errorHandler";
const app = express();
app.use(cors());
app.use(express.json({limit: "30mb"}))
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cookieParser());
app.use(morgan("dev"))
dotenv.config();

app.use(errorHandler)
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


const port = process.env.PORT!
app.listen(port, () => console.log(`app running in port: ${port}`));