import { Category } from "../models/Category.model.js";

async function createcategory(req, res) {

    try {
        const { name, description } = req.body

        if (!name || !description)
            res.status(400).json({
                message: "Enter both name and description"
            })

        const category = await Category.create({
            name,
            description
        }, { new: true })

        res.status(200).json({
            message: "Category successfully created"
        })
    } catch (error) {

        res.status(400).json({
            message: "something went wrong in the createcategory function"
        })
    }
}

async function getallcategories(req, res) {
    try {
        const allcategories = await Category.find()
        res.status(200).json({
            message: "all categories are successfully retrieved",
            category: allcategories
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in the getall Categoryfunction"
        })
    }
}

async function categorypagedetails(req, res) {
    try {
        const { categoryid } = req.body

        const selectedcategory = await Category.findById({ _id: categoryid }).populate("courses").exec()

        if (!selectedcategory)
            res.status(400).json({
                message: "invalid course id"
            })

        // get courses for different categories

        const differentcategories = await Category.findById({ _id: { $ne: categoryid } }).populate("courses").exec()

        //TODO: get top selling courses
        res.status(200).json({
            message: "courses based on tags are retrieved successfully"

        })

    } catch (error) {
        res.status(400).json({
            message: "something went wrong in categorypagedetails funtion"
        })
    }

}

// TODO: ALSO IMPLEMENT CONTACT US SECTION

export { createcategory, getallcategories, categorypagedetails }