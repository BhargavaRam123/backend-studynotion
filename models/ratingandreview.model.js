import mongoose from "mongoose";

let ratingandreviewschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true
    }
})

export const RatingAndReview = mongoose.model("RatingAndReview", ratingandreviewschema)