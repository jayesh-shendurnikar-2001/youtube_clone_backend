import express from "express"
import connectDb from "./config/db.js"

const app = express()

app.use(express.json())

connectDb()

app.listen(3000 , () => {
    console.log("app is running on port 3000")
})