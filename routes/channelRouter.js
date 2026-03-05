// routes/channelRoutes.js

import express from "express";
import {
  createChannel,
  getChannelById,
  getChannelsByUser,
  editChannel,
} from "../controller/channelController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/user/:userId", getChannelsByUser);
router.get("/:id", getChannelById);
router.put("/edit-channel/:id", protect, editChannel);
export default router;