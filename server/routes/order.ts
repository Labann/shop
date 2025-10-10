import * as express from "express"
import { protect } from "../middleware/protect.js";
import { cancelOrder, createOrder, getMyOrders, getSingleOrder, updateOrderStatus } from "../controllers/order.js";
import { vendorsOnly } from "../middleware/adminsOnly.js";


const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/single-order/:orderId", protect, getSingleOrder)
router.put("/update-status/:orderId", protect, vendorsOnly, updateOrderStatus)

router.delete("/cancel/:orderId", protect, cancelOrder)

export default router;