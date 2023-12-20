// Import the required modules
import express from "express"
const router = express.Router()

// Import the Controllers

// Course Controllers Import
import { createcourse, getallcourses, getcoursedetails } from "../controllers/Course"


// Categories Controllers Import
import { createcategory, getallcategories, categorypagedetails } from "../controllers/Category"

// Sections Controllers Import
import { createsection, updatesection, deletesection } from "../controllers/Section"

// Sub-Sections Controllers Import
import {
    createsubsection,
    updatesubsection,
    deletesubsection
} from "../controllers/Subsection"

// Rating Controllers Import
import { createrating, getaveragerating, getallrating } from "../controllers/RatingAndReview"

// import {
//     updateCourseProgress
// } from "../controllers/courseprogress.js";

// Importing Middlewares
import {
    isstudent, isadmin, isinstructor, auth
} from "../middleware/auth"

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isinstructor, createcourse)
//Add a Section to a Course
router.post("/addSection", auth, isinstructor, createsection)
// Update a Section
router.post("/updateSection", auth, isinstructor, updatesection)
// Delete a Section
router.post("/deleteSection", auth, isinstructor, deletesection)
// Edit Sub Section
router.post("/updateSubSection", auth, isinstructor, updatesubsection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isinstructor, deletesubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isinstructor, createsubsection)
// Get all Registered Courses
router.get("/getAllCourses", getallcourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getcoursedetails)
// Get Details for a Specific Courses
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
// router.post("/editCourse", auth, isinstructor, editCourse)
// Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
// TODO:create a deletecourse funciton
router.delete("/deleteCourse", deleteCourse)

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isadmin, createcategory)
router.get("/showAllCategories", getallcategories)
router.post("/getCategoryPageDetails", getallcategories)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isstudent, createrating)
router.get("/getAverageRating", getaveragerating)
router.get("/getReviews", getallrating)

module.exports = router