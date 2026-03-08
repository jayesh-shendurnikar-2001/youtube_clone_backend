import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// register user 
export const registerUser = async (req , res) => {
    try {
        const { username, email, password , avatar } = req.body;
    
        // if username , email and password is not fill
        if (!username || !email || !password) {
          return res.status(400).json({ message: "Please fill in all fields" });
        }
    
        // check length of name greater than 3
        if (username.length < 3) {
          return res
            .status(400)
            .json({ message: "Username must be at least 3 characters" });
        }
    
        // password length is greater than 6
        if (password.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
        }
    
        // find existing user
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({
            message: "User already exists",
          });
        }
    
        // bcryprt password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // create user
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          avatar,
        });
    
        // send back response
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


// login user
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide email and password" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // compare stored password with user enter password
      const isMatch = await bcrypt.compare(password, user.password);
  
      // if not match
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // jwt token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.status(200).json({
        message: "Login successful",
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar:user.avatar,
        channels: user.channels,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// get user data
  export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.password = undefined; // remove password
  
      res.json(user);
    }  catch (error) {
      console.error("getMe error:", error.message); 
      res.status(500).json({ message: error.message }); 
    }
  };