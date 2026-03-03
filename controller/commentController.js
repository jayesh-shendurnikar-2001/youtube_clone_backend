// controllers/commentController.js – Comment CRUD
import Comment from "../models/Comments"


// @route   GET /api/comments/:videoId
// @access  Public
export const getCommentsByVideo = async (req, res) => {
    try {
        const comments = await Comment.find({ video: req.params.videoId })
            .populate("user", "username avatar")
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        console.error("Get comments error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// @route   POST /api/comments/:videoId
// @access  Private

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const comment = await Comment.create({
            video: req.params.videoId,
            user: req.user._id,
            text: text.trim(),
        });

        // Populate user info and return
        const populatedComment = await Comment.findById(comment._id).populate(
            "user",
            "username avatar"
        );

        res.status(201).json(populatedComment);
    } catch (error) {
        console.error("Add comment error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// @route   PUT /api/comments/:id
// @access  Private (owner only)

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check ownership
        if (comment.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to edit this comment" });
        }

        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        comment.text = text.trim();
        await comment.save();

        const populatedComment = await Comment.findById(comment._id).populate(
            "user",
            "username avatar"
        );

        res.json(populatedComment);
    } catch (error) {
        console.error("Update comment error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// @route   DELETE /api/comments/:id
// @access  Private (owner only)

 export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check ownership
        if (comment.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Delete comment error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

