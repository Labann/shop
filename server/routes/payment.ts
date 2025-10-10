import * as express from "express"
import {makePayment, mpesaCallback} from "../controllers/payment"
import {protect} from "../middleware/protect"

const router = express.Router()


router.post("/api/mpesa/stkPush", protect, makePayment);
router.post("/api/mpesa/callback", protect, mpesaCallback);

export default router;