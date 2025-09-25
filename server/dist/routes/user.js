import * as express from "express";
import { deleteAccount, getAllUser, getProfile, login, logout, signup, updateProfile } from "../controllers/user";
import { protect } from "../middleware/protect";
import { adminsOnly } from "../middleware/adminsOnly";
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.patch("/profile/update", protect, updateProfile);
router.delete("/delete/account", protect, deleteAccount);
router.get("/", protect, adminsOnly, getAllUser);
export default router;
//# sourceMappingURL=user.js.map