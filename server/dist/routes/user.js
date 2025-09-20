import * as express from "express";
import { deleteAccount, getProfile, login, logout, signup, updateProfile } from "../controllers/user";
import { protect } from "../middleware/protect";
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.patch("/profile/update", protect, updateProfile);
router.delete("/delete/account", protect, deleteAccount);
export default router;
//# sourceMappingURL=user.js.map