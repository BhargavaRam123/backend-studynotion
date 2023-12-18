import mongoose from "mongoose";

let courseProgressschema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedVideos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsection"
    },
})

export const CourseProgress = mongoose.model("CourseProgress", courseProgressschema)