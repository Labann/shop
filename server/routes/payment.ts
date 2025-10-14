import * as express from "express"
import {getMyPayment, makePayment, mpesaCallback} from "../controllers/payment.js"
import {protect} from "../middleware/protect.js"

const router = express.Router()


router.post("/mpesa/stkPush", protect, makePayment);
router.post("/mpesa/callback", mpesaCallback);
router.get("/all", protect, getMyPayment)
export default router;