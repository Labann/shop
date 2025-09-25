import * as express from "express"
import { protect } from "../middleware/protect";
import { addProduct, deleteProduct, getProductByShop, getSingleProduct, updateProduct } from "../controllers/product";
import { vendorsOnly } from "../middleware/adminsOnly";
import upload from "../utils/upload";


const router = express.Router();

router.post("/add/:shopId", protect, vendorsOnly, upload.array("images", 10), addProduct)
router.put("/update/:productId", protect, vendorsOnly, upload.array("images", 10), updateProduct);
router.delete("/delete/:productId", protect, vendorsOnly, deleteProduct);
router.get("/byShop/:shopId", protect, getProductByShop);
router.get("/:productId", protect, getSingleProduct);


export default router;