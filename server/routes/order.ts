import * as express from "express"
import { protect } from "../middleware/protect";
import { cancelOrder, createOrder, getMyOrders, getSingleOrder, updateOrderStatus } from "../controllers/order";
import { vendorsOnly } from "../middleware/adminsOnly";


const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/single-order/:orderId", protect, getSingleOrder)
router.put("/update-status/:orderId", protect, vendorsOnly, updateOrderStatus)

router.delete("/cancel/:orderId", protect, cancelOrder)

export default router;