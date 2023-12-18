import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});

const uploadOnCloudinary = async (localFilePath, folder, height, quality) => {
    try {
        const options = { folder }
        if (height)
            options.height = height
        if (quality)
            options.quality = quality
        options.resource_type = "auto"

        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, options)
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);

        fs.unlinkSync(localFilePath)
        return response.url;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary }