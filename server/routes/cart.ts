import * as  express from "express";
import { protect } from "../middleware/protect";
import { addToCart, clearCart, getMyCart, removeFromCart } from "../controllers/cart";


const router = express.Router();

router.post("/add", protect, addToCart)
router.delete("/remove/item/:productId", protect, removeFromCart);
router.get("/me/:cartId", protect, getMyCart);
router.delete("/remove/all", protect, clearCart)

export default router;