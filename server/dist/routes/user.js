import * as express from "express";
import { deleteAccount, getAllUser, getMe, getProfile, login, logout, redirectToClientHome, signup, updateProfile } from "../controllers/user.js";
import { protect } from "../middleware/protect.js";
import { adminsOnly } from "../middleware/adminsOnly.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
router.post("/login", login);
router.get("/v2/login", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));
router.get("/me", protect, getMe);
router.get("/v2/login/callback", passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: false
}), redirectToClientHome);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.patch("/profile/update", protect, updateProfile);
router.delete("/delete/account", protect, deleteAccount);
router.get("/", protect, adminsOnly, getAllUser);
export default router;
//# sourceMappingURL=user.js.map