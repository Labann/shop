import * as express from "express";
import { protect } from "../middleware/protect";
import { applyForShop, approveShop, closeShop, getAllShops, getMyShop, getMyShops, updateShopDetails } from "../controllers/shop";
import { adminsOnly } from "../middleware/adminsOnly";
const router = express.Router();
router.post("/apply", protect, applyForShop);
router.put("/approve/:shopId", protect, adminsOnly, approveShop);
router.put("/close/:shopId", protect, closeShop);
router.patch("/update/details/:shopId", protect, updateShopDetails);
router.get("/all", protect, adminsOnly, getAllShops);
router.get("/my-shops/:shopId", protect, getMyShops);
router.get("/my-shop/:shopId", protect, getMyShop);
export default router;
//# sourceMappingURL=shop.js.map