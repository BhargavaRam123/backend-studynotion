import { Subsection } from "../models/subsection.model.js";
import { Section } from "../models/section.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
async function createsubsection() {
    try {
        const { sectionId, title, timeDuration, description } = req.body
        const video = req.files.videoFile
        if (!sectionId || !title || !timeDuration || !description || !video)
            res.status(400).json({
                message: "all fields are required",
            })

        const vidurl = await uploadOnCloudinary(video, process.env.FOLDER_NAME)

        const subsection = await Subsection.create({
            title, timeDuration, description, videoUrl: vidurl
        }, { new: true })

        const section = await Section.findByIdAndUpdate({ _id: sectionId }, {
            $push: {
                subSection: subsection._id
            }
        }, { new: true }).populate("subSection")

        res.status(200).json({
            message: "new subsectin added",
            section: section
        })

    } catch (error) {
        res.status(400).json({
            message: "something went wrong in createsubsection function",
        })
        console.log("something went wrong in createsubsection function:", error.message)
    }
}
async function updatesubsection() {
    try {
        const { subsectionId, title, timeDuration, description } = req.body
        const video = req.files.videoFile
        if (!subsectionId || !title || !timeDuration || !description || !video)
            res.status(400).json({
                message: "all fields are required",
            })

        const vidurl = await uploadOnCloudinary(video, process.env.FOLDER_NAME)

        const updatesubsection = await Subsection.findByIdAndUpdate({ _id: subsectionId }, {
            title, timeDuration, description, videoUrl: vidurl
        }, { new: true })

        res.status(200).json({
            message: "subsection updated",
            subsection: updatesubsection
        })

    } catch (error) {
        res.status(400).json({
            message: "something went wrong in updatesubsection function",
        })
        console.log("something went wrong in updatesubsection function:", error.message)
    }
}
async function deletesubsection() {
    try {
        const { subsectionId, sectionId } = req.body
        if (!sectionId || !subsectionId)
            res.status(400).json({
                message: "all fields are required",
            })
        const deletesubsection = await Subsection.findByIdAndDelete({ _id: subsectionId }, { new: true })

        const deletesection = await Section.findByIdAndUpdate({
            _id: sectionId
        }, {
            $pull: {
                subSection: subsectionId
            }
        }).populate("subSection")
        res.status(200).json({
            message: "subsection deleted",
            section: deletesection
        })

    } catch (error) {
        res.status(400).json({
            message: "something went wrong in deletesubsection function",
        })
        console.log("something went wrong in deletesubsection function:", error.message)
    }
}

export {
    createsubsection,
    updatesubsection,
    deletesubsection
}