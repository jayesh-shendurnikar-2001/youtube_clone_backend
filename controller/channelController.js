
import User from "../models/User.js";
import Channel from "../models/Channel.js";

// create channel 
export const createChannel = async (req, res) => {
    try {
      const { channelName, description, channelBanner } = req.body;
  
      // checking channel
      if (!channelName) {
        return res.status(400).json({ message: "Channel name is required" });
      }
  
      // Check if channel name already exists
      const existing = await Channel.findOne({ channelName });
      if (existing) {
        return res.status(400).json({ message: "Channel name already taken" });
      }
  
      // only one channel per user
      if (!req.user.channels.length >= 1) {
        const channel = await Channel.create({
          channelName,
          owner: req.user._id,
          description: description || "",
          channelBanner: channelBanner || "",
        });
  
        // find by id  and update
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

  // gating channel by id
 export const getChannelById = async (req, res) => {
    try {

          // Find channel using ID from request params
      const channel = await Channel.findById(req.params.id)
            // Populate owner details (username and avatar only)
        .populate("owner", "username avatar")
              // Populate videos belonging to this channel
        .populate({
          path: "videos",
          populate: { path: "channel", select: "channelName" },
        });
      // If channel does not exist return 404
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
  
      res.json(channel);
    } catch (error) {
      console.error("Get channel error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Get all channels created by a specific user
 export const getChannelsByUser = async (req, res) => {
    try {
          // Find channels where owner matches userId
      const channels = await Channel.find({ owner: req.params.userId });
      res.json(channels);
    } catch (error) {
      console.error("Get user channels error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Edit / Update channel details

  export const editChannel = async (req, res) => {
    try {
      const { channelName, description, channelBanner } = req.body;
  
      const channel = await Channel.findById(req.params.id);
  
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
  
      // Check if logged-in user owns the channel
      if (channel.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      // check if new channel name already exists
      if (channelName && channelName !== channel.channelName) {
        const existing = await Channel.findOne({ channelName });
        if (existing) {
          return res.status(400).json({ message: "Channel name already taken" });
        }
        channel.channelName = channelName;
      }
  
      if (description !== undefined) {
        channel.description = description;
      }
      // Update channel banner if provided

      if (channelBanner !== undefined) {
        channel.channelBanner = channelBanner;
      }
  
      const updatedChannel = await channel.save();
  
      res.json(updatedChannel);
  
    } catch (error) {
      console.error("Edit channel error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };