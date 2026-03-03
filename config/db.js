import mongoose from "mongoose";


async function connectDb(){

    try {
        await mongoose.connect("mongodb+srv://jayesh:jayesh@cluster0.oo1gdox.mongodb.net/youtube")
        console.log("MongoDb is connected")
    } catch (error) {
        console.error(`MongoDb connection error ${error}`)
    }

}

export default connectDb