import mongoose from "mongoose";

let tagschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

export const Tag = mongoose.model("Tag", tagschema)