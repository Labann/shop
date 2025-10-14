import * as express from "express"
import {makePayment, mpesaCallback} from "../controllers/payment.js"
import {protect} from "../middleware/protect.js"

const router = express.Router()


router.post("/mpesa/stkPush", protect, makePayment);
router.post("/mpesa/callback", protect, mpesaCallback);

export default router;