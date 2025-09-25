import * as express from "express";
import { protect } from "../middleware/protect";
import { addToCart, clearCart, createCart, getMyCart, removeFromCart } from "../controllers/cart";
const router = express.Router();
router.post("/create", protect, createCart);
router.post("/add", protect, addToCart);
router.delete("/remove/:productId/:cartId", protect, removeFromCart);
router.get("/me", protect, getMyCart);
router.delete("/remove-all/:cartId", protect, clearCart);
export default router;
//# sourceMappingURL=cart.js.map