import { Section } from "../models/section.model.js"
import { Course } from "../models/Course.model.js"


async function createsection(req, res) {
    try {
        const { sectionName, courseid } = req.body

        if (!sectionName || !courseid) {
            res.status(400).json({
                message: "you need to give both sectionname and courseid"
            })
        }

        const section = await Section.create({
            sectionName
        }, { new: true })

        const updatedcourse = await Course.findByIdAndUpdate({ _id: courseid }, {
            $push: {
                courseContent: section._id
            }
        })
        res.status(200).json({
            message: "section successfully created",
            updatedcourse: updatedcourse.populate("Section")
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in createsection function",
        })
        console.log("something went wrong in createsection function:", error.message)
    }
}



async function updatesection(req, res) {
    try {
        let { sectionName, sectionid } = req.body
        if (!sectionName || !sectionid) {
            res.status(400).json({
                message: "please enter both sectionname and sectionid",
            })
        }
        const section = await Section.findByIdAndUpdate({ _id: sectionid }, {
            sectionName,
        }, { new: true })
        res.status(200).json({
            message: "section is updated",
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in updatesection function",
        })
        console.log("something went wrong in updatesection function:", error.message)
    }


}


async function deletesection(req, res) {
    try {
        let { sectionid, courseid } = req.body
        if (!sectionid || !courseid) {
            res.status(400).json({
                message: "please enter sectionid and courseid",
            })
        }
        const section = await Section.findByIdAndDelete({ _id: sectionid }, { new: true })

        const course = await Course.findByIdAndUpdate({ _id: courseid }, {
            $pull: {
                courseContent: sectionid
            }
        }, { new: true })
        res.status(200).json({
            message: "section is deleted",
            course: course
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in deletesection function",
        })
        console.log("something went wrong in deletesection function:", error.message)
    }


}