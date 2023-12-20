import express from "express"
import {
    sendotp, signup, changepassword, login
} from "../controllers/Auth.js"
import {
    resetpasswordtoken, resetpassword
} from "../controllers/ResetPassword.js"

import { auth } from "../middleware/auth.js"
const router = express.Router()

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changepassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetpasswordtoken)

// Route for resetting user's password after verification
router.post("/reset-password", resetpassword)

// Export the router for use in the main application
export { router }