import mongoose from "mongoose";

let subsectionschema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    }
})

export const Subsection = mongoose.model("Subsection", subsectionschema)