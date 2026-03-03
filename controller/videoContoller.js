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


// @route   GET /api/videos/:id
// @access  Public
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        )
            .populate("channel", "channelName subscribers")
            .populate("uploader", "username avatar");

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.json(video);
    } catch (error) {
        console.error("Get video error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// @route   POST /api/videos
// @access  Private

export const createVideo = async (req, res) => {
    try {
        const { title, description, videoUrl, thumbnailUrl, category } = req.body;

        const channel = await Channel.findOne({ owner: req.user._id });

        if (!channel) {
            return res.status(404).json({ message: "User has no channel" });
        }

        const video = await Video.create({
            title,
            description: description || "",
            videoUrl,
            thumbnailUrl,
            category,
            channel: channel._id,
            uploader: req.user._id,
        });

        await Channel.findByIdAndUpdate(channel._id, {
            $push: { videos: video._id }
        });

        res.status(201).json(video);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// @route   PUT /api/videos/:id
// @access  Private (owner only)

export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check ownership
        if (video.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to edit this video" });
        }

        const { title, description, videoUrl, thumbnailUrl, category } = req.body;

        video.title = title || video.title;
        video.description = description !== undefined ? description : video.description;
        video.videoUrl = videoUrl || video.videoUrl;
        video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
        video.category = category || video.category;

        const updatedVideo = await video.save();
        const populatedVideo = await Video.findById(updatedVideo._id)
            .populate("channel", "channelName")
            .populate("uploader", "username");

        res.json(populatedVideo);
    } catch (error) {
        console.error("Update video error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// @route   DELETE /api/videos/:id
// @access  Private (owner only)

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check ownership
        if (video.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this video" });
        }

        // Remove video from channel's videos array
        await Channel.findByIdAndUpdate(video.channel, {
            $pull: { videos: video._id },
        });

        // Delete all comments associated with this video
        await Comment.deleteMany({ video: video._id });

        // Delete the video
        await Video.findByIdAndDelete(req.params.id);

        res.json({ message: "Video deleted successfully" });
    } catch (error) {
        console.error("Delete video error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// @route   PUT /api/videos/:id/like
// @access  Private

export const toggleLike = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const userId = req.user._id.toString();

        // Remove from dislikes if present
        video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);

        // Toggle like
        const likeIndex = video.likes.findIndex((id) => id.toString() === userId);
        if (likeIndex === -1) {
            video.likes.push(req.user._id);
        } else {
            video.likes.splice(likeIndex, 1);
        }

        await video.save();
        res.json({ likes: video.likes.length, dislikes: video.dislikes.length, likes_list: video.likes, dislikes_list: video.dislikes });
    } catch (error) {
        console.error("Toggle like error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// @route   PUT /api/videos/:id/dislike
// @access  Private

export const toggleDislike = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const userId = req.user._id.toString();

        // Remove from likes if present
        video.likes = video.likes.filter((id) => id.toString() !== userId);

        // Toggle dislike
        const dislikeIndex = video.dislikes.findIndex(
            (id) => id.toString() === userId
        );
        if (dislikeIndex === -1) {
            video.dislikes.push(req.user._id);
        } else {
            video.dislikes.splice(dislikeIndex, 1);
        }

        await video.save();
        res.json({ likes: video.likes.length, dislikes: video.dislikes.length, likes_list: video.likes, dislikes_list: video.dislikes });
    } catch (error) {
        console.error("Toggle dislike error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

