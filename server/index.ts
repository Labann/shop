import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user"
import productRoutes from "./routes/product"
import shopRoutes from "./routes/shop"
const app = express();
app.use(cors());
app.use(express.json({limit: "30mb"}))
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cookieParser());
dotenv.config();

app.use("/user", authRoutes);
app.use("/shop", shopRoutes);
app.use("/product", productRoutes)
const port = process.env.PORT!
app.listen(port, () => console.log(`app running in port: ${port}`));