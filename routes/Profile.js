import express from "express"
import { auth, isinstructor } from "../middleware/auth"
import { updateprofile, deleteaccount } from "../controllers/Profile"

const router = express.Router()
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteaccount)
router.put("/updateProfile", auth, updateprofile)
// router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

export { router }