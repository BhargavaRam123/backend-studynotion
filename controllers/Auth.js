import { User } from "../models/user.model.js"
import { Otp } from "../models/otp.model.js"
import { Profile } from "../models/profile.model.js"
import bcrypt from "bcrypt"
import otpgenerator from "otp-generator"
import jwt from "jsonwebtoken"
// send otp to the mail
async function sendotp(req, res) {
    try {
        let { email } = req.body

        //check if user already signed up

        let isuserpresent = await User.find({ email })

        // error throw karo if user already exists
        if (isuserpresent) {
            res.status(401).json({
                message: "user already exists no need to signup"
            })
        }

        // generate a otp and make sure it is unique (of size 6 below)

        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        const result = await Otp.find({ otp })

        while (result) {
            let otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            const result = await Otp.find({ otp })
        }

        // store the otp in database to check it when user enters

        // if the otp is not send then resend it

        const otpi = await Otp.create({
            email, otp
        })

        console.log(otpi)

        res.status(200).json({
            success: true,
            "message": "otp successfully sent to mail",
            otp: otpi
        })
    } catch (error) {
        console.log("error occured in sendotp function:", error.message)
        res.status(500).json({
            success: false,
            "message": "error occured"
        })
    }


}


async function signup(req, res) {
    // sign up user

    // get the required fields using req

    // validate 2 passwords are matching or not

    // check user exists or not

    // validate the otp ,check the most recent otp

    // hash the password

    // create user field and update

    // after
    try {

        let { firstName, lastName, email, password, confirmpassword, accountType, contactNumber, otp } = req.body

        if (!firstName || !lastName || !email || !password || !confirmpassword || !otp) {
            res.status(403).json({
                "message": "fill all the required fields"
            })
        }

        if (password !== confirmpassword)
            res.status(401).json({
                "message": "password and confirm password are not same"
            })

        let userexists = await User.find({
            email
        })

        if (userexists) {
            res.status(400).json({
                "message": "user already exists"
            })
        }

        const recentotp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1)//-1 represents descending order and limit represents the size of the array is limited to 1
        console.log(recentotp)

        if (recentotp.length == 0) {
            res.status(400).json({
                "message": "otp not found in the database"
            })
        }
        else if (otp !== recentotp) {
            res.status(400).json({
                "message": "invalid otp entered"
            })
        }

        let hashedpassword = await bcrypt.hash(password, 10)


        const profileDetails = await Profile.create({
            gender: null,
            dateofBirth: null,
            about: null,
            contactNumber: null
        })

        let user = await User.create({
            firstName, lastName, email, contactNumber, password: hashedpassword, accountType, additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` //try this out
        })

        return res.status(200).json({
            "user": user
        })

    } catch (error) {
        console.log("error in signup():", error.message)
        return res.status(500).json({
            "message": "user registration failed please try again"
        })
    }

}

// log in user
async function login(req, res) {
    try {
        let { email, password } = req.body

        // validation of data

        if (!email || !password)
            res.status(400).json({
                message: "both email and password are required for login"
            })

        let isuserexists = await User.find({ email })

        if (!isuserexists) {
            res.status(400).json({
                message: "you didnt created your account first signup!"
            })
        }

        // password matching

        let res = bcrypt.compare(password, isuserexists.password)

        //create jwt token
        if (res) {
            const token = jwt.sign({
                email: isuserexists.email,
                id: isuserexists._id,
                accountType: isuserexists.accountType
            }, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })
            isuserexists.token = token;
            isuserexists.password = undefined
            res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }).status(200).json({
                message: "token success fully added into the cookies"
            })
        }
        else {
            res.status(400).json({
                "message": "please check you entered password"
            })
        }

    } catch (error) {
        console.log("error in login function:", erro.message)
        res.status(400).json({
            "message": "something went wrong in login function"
        })
    }
}


// change password
async function changepassword(req, res) {

}

export { sendotp, signup, changepassword }
