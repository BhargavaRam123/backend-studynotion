import { instance } from "../utils/payment.js"
import { Course } from "../models/course.model.js"
import { User } from "../models/user.model.js"
import { sendmail } from "../utils/mailsender.utils.js"
import mongoose from "mongoose"
async function capturePayment(req, res) {
    try {
        /* get courseid and
        validation
        valid courseid
        valid coursedetails
        user already pay for the same course
        order create
        return response
        */
        const { course_id } = req.body
        const userid = req.user.id
        if (!course_id) {
            res.status(400).json({
                message: "please provide the course_id"
            })
        }
        const iscourseexists = await Course.find({ _id: course_id })
        if (!iscourseexists)
            res.status(400).json({
                message: "course you are trying to purchase not exists"
            })

        //convert the string to object id
        const ouserid = mongoose.Types.ObjectId(userid)

        if (iscourseexists.studentsEnrolled.includes(ouserid)) {
            res.status(200).json({
                message: "course already purchased"
            })
        }

        const amount = iscourseexists.price
        const currency = "INR"
        const options = {
            amount: amount * 100,
            currency,
            recipt: Math.random(Date.now()).toString(), //find the meaning about this line
            notes: {
                courseId: course_id,
                userid,
            }
        }
        // initiating the payment using razorpay
        try {
            const paymentresponse = await instance.orders.create(options)
            console.log(paymentresponse)
            res.status(400).json({
                message: "razorpay payment completed",
                coursename: iscourseexists.courseName,
                orderid: paymentresponse.id,
                amount: paymentresponse.amount,
            })
        } catch (error) {
            res.status(400).json({
                message: "razorpay payment failed",
                error: error.message
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "something went wrong in capturepayment function"
        })
        console.log("something went wrong in capturepayment function", error.message)
    }

}
