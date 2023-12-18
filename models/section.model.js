import mongoose from "mongoose";

let sectionschema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSection: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subsection"
    }],
})

export const Section = mongoose.model("Section", sectionschema)