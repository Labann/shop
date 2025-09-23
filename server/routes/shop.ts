import * as express from "express"
import { protect } from "../middleware/protect";
import { applyForShop, approveShop, closeShop, getAllShops, getMyShop, getMyShops, updateShopDetails } from "../controllers/shop";
import { adminsOnly } from "../middleware/adminsOnly";
import upload from "../utils/upload";


const router = express.Router();

router.post("/apply", protect, upload.single("logo"), applyForShop);
router.put("/approve/:shopId", protect, adminsOnly, approveShop);
router.put("/close/:shopId", protect, closeShop);
router.patch("/update/details/:shopId", protect, upload.single("logo"), updateShopDetails);
router.get("/all", protect,  adminsOnly, getAllShops);
router.get("/my-shops/:shopId", protect, getMyShops);
router.get("/my-shop/:shopId", protect, getMyShop)

export default router;
