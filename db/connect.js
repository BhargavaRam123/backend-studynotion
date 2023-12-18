import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/
        studynotion`)

        console.log("monogodb connected !!!!!")

    } catch (error) {
        console.log("error in connecting to mongodb:", error.message);
        process.exit(1);
    }
}

export default connectDB