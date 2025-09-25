import * as express from "express";
import multer, {} from "multer";
import {} from "express";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); //accept the file
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage, fileFilter });
export default upload;
//# sourceMappingURL=upload.js.map