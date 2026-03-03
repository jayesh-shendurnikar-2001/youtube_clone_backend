import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";

const app = express()

app.use(express.json())
dotenv.config();
connectDb()

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT , () => {
    console.log(`app is running on port ${process.env.PORT}`)
})