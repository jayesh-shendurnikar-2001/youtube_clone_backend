import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";


export const registerUser = async (req , res) => {
    try {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
          return res.status(400).json({ message: "Please fill in all fields" });
        }
    
        if (username.length < 3) {
          return res
            .status(400)
            .json({ message: "Username must be at least 3 characters" });
        }
    
        if (password.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
        }
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({
            message: "User already exists",
          });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
    
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          channels: user.channels,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}