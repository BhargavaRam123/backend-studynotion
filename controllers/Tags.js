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
