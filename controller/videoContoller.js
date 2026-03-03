// controllers/videoController.js – Video CRUD, search, filter, like/dislike
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import Comment from "../models/Comments.js";

// @route   GET /api/videos?search=&category=
// @access  Public
export const getVideos = async (req, res) => {
    try {
        const { search, category } = req.query;
        let filter = {};

        // Search by title (case-insensitive partial match)
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        // Filter by category
        if (category && category !== "All") {
            filter.category = category;
        }

        const videos = await Video.find(filter)
            .populate("channel", "channelName")
            .populate("uploader", "username")
            .sort({ createdAt: -1 });

            res.json({
                total: videos.length,
                videos
            });
    } catch (error) {
        console.error("Get videos error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


