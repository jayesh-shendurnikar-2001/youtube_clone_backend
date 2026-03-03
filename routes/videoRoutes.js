// routes/videoRoutes.js
import express from "express";

import {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    toggleLike,
    toggleDislike,
} from "../controller/videoContoller.js";

import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideoById);
router.post("/", protect, createVideo);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.put("/:id/like", protect, toggleLike);
router.put("/:id/dislike", protect, toggleDislike);

export default router;