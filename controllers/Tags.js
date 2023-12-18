import { Tag } from "../models/Tags.model.js";

async function createTag(req, res) {

    try {
        const { name, description } = req.body

        if (!name || !description)
            res.status(400).json({
                message: "Enter both name and description"
            })

        const tag = await Tag.create({
            name,
            description
        }, { new: true })

        res.status(200).json({
            message: "Tag successfully created"
        })
    } catch (error) {

        res.status(400).json({
            message: "something went wrong in the createtag function"
        })
    }
}

async function getalltags(req, res) {
    try {
        const alltags = await Tag.find()
        res.status(200).json({
            message: "all tags are successfully retrieved",
            tag: alltags
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong in the getalltags function"
        })
    }
}
