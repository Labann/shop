import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
dotenv.config();
app.use("/auth", authRoutes);
const port = process.env.PORT;
app.listen(port, () => console.log(`app running in port: ${port}`));
//# sourceMappingURL=index.js.map