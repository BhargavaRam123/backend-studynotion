import { User } from "../models/user.model.js"
import { sendmail } from "../utils/mailsender.utils.js"
import bcrypt from "bcrypt"
// reset password token
async function resetpasswordtoken(req, res) {
    try {
        const email = req.body.email
        const user = await User.find({ email })
        if (!user) {
            res.status(400).json({
                message: "first create an account without out that you cannot change the password"
            })
        }
        // using crypto module to generate a random token
        const token = crypto.randomUUID()
        const updateduser = await User.findOneAndUpdate({ email }, {
            token,
            resetpasswordexpires: Date.now() + 5 * 60 * 1000
        }, { new: true })

        // create url adjust the port according to the front end port 

        const url = `http://localhost:3000/update-password/${token}`
        await sendmail(email, "Password Reset Link",
            `Password Reset Link:${url}`)
        res.status(200).json({
            message: "email sent successfully to reset password"
        })
    } catch (error) {
        console.log("error in resetpassword function:", error.message)
        res.status(400).json({
            message: error.message
        })
    }

}

// reset password

async function resetpassword(req, res) {
    try {
        let { token, password, confirmpassword } = req.body

        if (password !== confirmpassword)
            res.status(400).json({
                message: "password and confirmpassword are not matching"
            })

        const userDetails = await User.find({ token })

        if (!userDetails)
            res.status(400).json({
                message: "invalid token"
            })
        if (userDetails.resetpasswordexpires < Date.now()) {
            res.status(400).json({
                message: "token expired please regenerate the token"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        await User.findOneAndUpdate({ token },
            {
                password: hashedpassword
            }, { new: true })
        res.status(200).json({
            message: "password successfully reseted"
        })
    } catch (error) {
        console.log("error in reset password function:", error.message)
        res.status(400).json({
            message: error.message
        })
    }
}