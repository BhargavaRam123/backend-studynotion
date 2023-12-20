import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

async function updateprofile(req, res) {
    try {
        const { dateofBirth = "", contactNumber = "", about = "", gender = "" } = req.body
        const userid = req.user.id

        const user = await User.findById({ _id: userid })

        const updatedprofile = await Profile.findByIdAndUpdate({ _id: user.additionalDetails }, {
            dateofBirth, contactNumber, about, gender
        }, { new: true }).populate("additionalDetails")

        res.status(200).json({
            message: "profile updated successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in updateprofile function",
        })
        console.log("something went wrong in updateprofile function:", error.message)
    }
}



async function deleteaccount(req, res) {
    try {
        const id = req.user.id
        const userDetails = await User.findById({ _id: id })
        if (!userDetails)
            res.status(400).json({
                message: "user doesnt exists how can you delete",
            })
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails }, { new: true })

        await User.findByIdAndDelete({ _id: id }, { new: true })
        //TODO: unenroll user from all enrolled courses

        res.status(200).json({
            message: "account deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in deleteaccount function",
        })
        console.log("something went wrong in deleteaccount function:", error.message)
    }
}

export { updateprofile, deleteaccount }
