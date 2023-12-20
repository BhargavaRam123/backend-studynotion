import { RatingAndReview } from "../models/ratingandreview.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

// create rating
async function createrating(req, res) {
    try {
        const userid = req.user.id
        const { rating, review, courseid } = req.body

        const coursedetails = await Course.findOne({
            _id: courseid, studentsEnrolled: {
                $elemMatch: { $eq: userid }
            }
        })
        if (!coursedetails) {
            res.status(400).json({
                message: "user doesnt exists"
            })
        }
        const isalreadyrated = await RatingAndReview.find({
            course: courseid,
            user: userid
        })
        if (isalreadyrated)
            res.status(400).json({
                message: "course is already rated by the user"
            })

        const ratingandreview = await RatingAndReview.create({
            user: userid,
            course: courseid, rating, review
        }, { new: true })

        const updatedcourse = await Course.findOneAndUpdate({ _id: courseid }, {
            $push: {
                ratingandreview: ratingandreview._id
            }
        })
        res.status(200).json({
            message: "rating for the course is added",
            rating: ratingandreview
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in create rating function"
        })
        console.log("something went wrong in create rating function", error.message)
    }
}

// avg rating
// mongoose aggregation pipelines
async function getaveragerating(req, res) {
    /*
    get course id
    calculate avg rating
    return rating 
    */
    try {
        const courseid = req.body.courseId;
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseid)
                },
            }, {
                $group: {
                    _id: null,
                    averagerating: {
                        $avg: "$rating"
                    }
                }
            }
        ])
        console.log(result[0])
        if (result.length > 0)
            return res.status(200).json({

                message: "average rating is calculated",
                avgrating: result[0].averagerating
            })
        return res.status(200).json({

            message: "average rating is 0 course is not yet rated",
            avgrating: "0"
        })

    } catch (error) {
        return res.status(400).json({
            message: "something went wrong in getaveragerating function",
        })
        console.log("something went wrong in getaveragerating function", error.message)
    }
}


async function getallrating() {
    try {
        const allratings = await RatingAndReview.find({}).sort({ rating: "desc" }).populate({
            path: "user",
            select: "firstName lastName email image"
        }).populate({
            path: "course",
            select: "courseName"
        }).exec()
        return res.status(400).json({
            message: "all reviews are retrieved",
            rating: allratings
        })

    } catch (error) {
        return res.status(400).json({
            message: "something went wrong in getallrating function",
        })
    }
}
export { createrating, getaveragerating, getallrating }