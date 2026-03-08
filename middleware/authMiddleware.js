// middleware/authMiddleware.js – JWT verification middleware

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
// It verifies the JWT token sent in the Authorization header
export const protect = async (req, res, next) => {

    // Variable to store token
    let token;

    // Check if Authorization header exists
    // Format expected: Authorization: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token using secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user using decoded ID from token
            // Exclude password field for security
            req.user = await User.findById(decoded._id).select("-password");

            // Move to next middleware / controller
            next();

        } catch (error) {

            // If token verification fails
            console.error("Token verification failed:", error.message);

            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // If no token is provided in header
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};