
import User from "../models/User.js";
import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
    try {
      const { channelName, description, channelBanner } = req.body;
  
      if (!channelName) {
        return res.status(400).json({ message: "Channel name is required" });
      }
  
      // Check if channel name already exists
      const existing = await Channel.findOne({ channelName });
      if (existing) {
        return res.status(400).json({ message: "Channel name already taken" });
      }
  
      if (!req.user.channels.length >= 1) {
        const channel = await Channel.create({
          channelName,
          owner: req.user._id,
          description: description || "",
          channelBanner: channelBanner || "",
        });
  
        await User.findByIdAndUpdate(req.user._id, {
          $push: { channels: channel._id },
        });
    
        res.status(201).json(channel);
      }
  
      res.status(500).json({ message: `Only one channel are allowed per user ${req.user._id}` })
      
    } catch (error) {
      console.error("Create channel error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

 export const getChannelById = async (req, res) => {
    try {
      const channel = await Channel.findById(req.params.id)
        .populate("owner", "username avatar")
        .populate({
          path: "videos",
          populate: { path: "channel", select: "channelName" },
        });
  
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
  
      res.json(channel);
    } catch (error) {
      console.error("Get channel error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
 export const getChannelsByUser = async (req, res) => {
    try {
      const channels = await Channel.find({ owner: req.params.userId });
      res.json(channels);
    } catch (error) {
      console.error("Get user channels error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };