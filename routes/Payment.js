// Import the required modules
import express from "express"
const router = express.Router()

import { capturePayment, verifysignature } from "../controllers/Payment.js"
import {
    isstudent, isadmin, isinstructor, auth
} from "../middleware/auth.js"
router.post("/capturePayment", auth, isstudent, capturePayment)
router.post("/verifyPayment", auth, isstudent, verifysignature)
// router.post("/sendPaymentSuccessEmail", auth, isstudent, sendPaymentSuccessEmail);

module.exports = router