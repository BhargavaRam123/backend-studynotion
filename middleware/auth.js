import jwt from "jsonwebtoken"
import express from "express"

//auth
async function auth(req, res, next) {
    try {
        let token = req.cookies.token

        if (!token) {
            res.status(400).json({
                message: "no token found in the cookies"
            })
        }

        // verify the token with the token secret

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        } catch (error) {
            console.log("error occured while verifying the token in the middleware")
            res.status(400).json({
                message: "token is not valid"
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            message: "error occured in the auth function in the middle ware"
        }
        )
        console.log("error occured in the auth function in the middle ware:", error.message)
    }
}

// isstudent
async function isstudent(req, res, next) {
    try {
        const token = req.cookies.token
        if (req.user.accountType !== "Student") {
            res.status(400).json({
                message: "this is protected route for students"
            })
        }
    } catch (error) {
        console.log("error occured in isstudent middleware:", error.message)
        res.status(400).json({
            message: error.message
        })
    }

}
// isadmin

async function isadmin(req, res, next) {
    try {
        const token = req.cookies.token
        if (req.user.accountType !== "Admin") {
            res.status(400).json({
                message: "this is protected route for admin"
            })
        }
    } catch (error) {
        console.log("error occured in isadmin middleware:", error.message)
        res.status(400).json({
            message: error.message
        })
    }

}


//isinstructor
async function isinstructor(req, res, next) {
    try {
        const token = req.cookies.token
        if (req.user.accountType !== "Instructor") {
            res.status(400).json({
                message: "this is protected route for instructors"
            })
        }
    } catch (error) {
        console.log("error occured in isinstructor middleware:", error.message)
        res.status(400).json({
            message: error.message
        })
    }

}

export {
    isstudent, isadmin, isinstructor, auth
}