import * as express from "express";
import { protect } from "../middleware/protect";
import { applyForShop, approveShop, closeShop, getAllShops, getMyShop, getMyShops, updateShopDetails } from "../controllers/shop";
import { adminsOnly, vendorsOnly } from "../middleware/adminsOnly";
import upload from "../utils/upload";
import { getOrdersInMyShop } from "../controllers/order";
const router = express.Router();
router.post("/apply", protect, upload.single("logo"), applyForShop);
router.put("/approve/:shopId", protect, adminsOnly, approveShop);
router.put("/close/:shopId", protect, closeShop);
router.patch("/update/details/:shopId", protect, upload.single("logo"), updateShopDetails);
router.get("/all", protect, adminsOnly, getAllShops);
router.get("/my-shops", protect, getMyShops);
router.get("/my-shop", protect, getMyShop);
router.get("/my-shop/orders/:shopId", protect, vendorsOnly, getOrdersInMyShop);
export default router;
//# sourceMappingURL=shop.js.map