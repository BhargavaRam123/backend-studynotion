import mongoose from "mongoose";
import { sendmail } from "../utils/mailsender.utils.js";

let otpschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60  //(expires in 5min)
    }

})

async function sendverificationemail(email, otp) {
    try {
        const mailresponse = await sendmail(email, "Verification email from StudyNotion", otp)

        console.log("email sent successfully:", mailresponse)
    } catch (error) {
        console.log("error in sendverificationemail():", error.message)
    }
}

otpschema.pre("save", async function (next) {
    await sendverificationemail(this.email, this.otp)
    next()
})

export const Otp = mongoose.model("Otp", otpschema)