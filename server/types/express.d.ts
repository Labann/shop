import * as express from "express";
import type { User } from "../generated/prisma/index.js";



declare global {
    namespace Express{
        interface Request{
            user?: User
            file? : Express.Multer.File;
            files? : Express.Multer.File[] | {[fieldname: string]: Express.Multer.File[]}
        }
    }
}