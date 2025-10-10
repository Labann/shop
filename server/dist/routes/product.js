import * as express from "express";
import { protect } from "../middleware/protect.js";
import { addProduct, deleteProduct, getAllProducts, getProductByShop, getSingleProduct, toggleIsFeatured, updateProduct } from "../controllers/product.js";
import { adminsOnly, vendorsOnly } from "../middleware/adminsOnly.js";
import upload from "../utils/upload.js";
const router = express.Router();
router.post("/create/:shopId", protect, vendorsOnly, upload.array("images", 10), addProduct);
router.put("/update/:productId", protect, vendorsOnly, upload.array("images", 10), updateProduct);
router.delete("/delete/:productId", protect, vendorsOnly, deleteProduct);
router.put("/toggle_isFeatured/:productId", protect, adminsOnly, toggleIsFeatured);
router.get("/byShop/:shopId", protect, getProductByShop);
router.get("/single/:productId", protect, getSingleProduct);
router.get("/all", getAllProducts);
export default router;
//# sourceMappingURL=product.js.map