import mongoose from "mongoose";

// db connection function
async function connectDb(){

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb is connected")
    } catch (error) {
        console.error(`MongoDb connection error ${error}`)
    }
}

export default connectDb