// middleware/authMiddleware.js – JWT verification middleware
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes – verify JWT token from Authorization header
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user to request (excluding password)
            req.user = await User.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

