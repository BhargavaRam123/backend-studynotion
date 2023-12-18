import mongoose from "mongoose";

let profileschema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateofBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    }
})

export const Profile = mongoose.model("Profile", profileschema)