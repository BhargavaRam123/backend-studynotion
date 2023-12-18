import { User } from "../models/user.model.js"
import { Tag } from "../models/Tags.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Course } from "../models/course.model.js"
async function createcourse(req, res) {
    try {
        let {
            courseName, courseDescription, whatYouWillLearn, price, tag
        } = req.body

        const thumbnail = req.files.thumbnailImage

        if (!courseDescription || !courseName || !whatYouWillLearn || !price || !tag || !thumbnail) {
            res.status(400).json({
                message: "please send all the required fields"

            })
        }

        const userid = req.user.id

        const instructordetails = await User.find({ _id: userid })
        console.log("instructordetails:", instructordetails)

        if (!instructordetails)
            res.status(400).json({
                message: "instructordetails not found"
            })

        const tagdetails = await Tag.findById(tag)

        if (!tagdetails)
            res.status(400).json({
                message: "no such tag found"
            })

        const thumbnailImage = await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME)


        const newcourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructordetails._id,
            whatYouWillLearn,
            price,
            tag: tagdetails._id,
            thumbnail: thumbnailImage
        })

        // add the new course to the user schema of instructor

        await User.findByIdAndUpdate({ _id: instructordetails._id }, {
            $push: {
                courses: newcourse._id
            }
        }, { new: true })

        await Tag.findByIdAndUpdate({ _id: tag }, {
            $push: {
                course: newcourse._id
            }
        }, { new: true })
        res.status(400).json({
            message: "course created successfully"

        })

    } catch (error) {
        res.status(400).json({
            message: "someting went wrong in createcourse"

        })
        console.log("something went wrong in createcourse():", error.message)
    }
}


// get all courses

async function getallcourses(req, res) {
    try {
        const courses = await Course.find({}).populate("instructor")
        res.status(200).json({
            message: "all the courses are collected",
            course: courses

        })
    } catch (error) {
        res.status(400).json({
            message: "someting went wrong in getallcourses"

        })
        console.log("something went wrong in getallcourses():", error.message)
    }
}