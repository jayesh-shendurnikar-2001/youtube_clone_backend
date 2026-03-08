import mongoose from "mongoose";


// user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        avatar: {
            type: String,
            default: "",
        },
        channels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Channel",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User
