import * as express from "express"
import multer,  {  type FileFilterCallback } from "multer";
import {type  Request}  from "express";

const storage = multer.memoryStorage();

const fileFilter  = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) =>{
    if(file.mimetype.startsWith("image/")){
        cb(null, true) //accept the file
    } else {
        cb(null, false)
    }
}

const upload = multer({storage, fileFilter});

export default upload;
