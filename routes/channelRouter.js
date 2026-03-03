// routes/channelRoutes.js

import express from "express";
import {
  createChannel,
  getChannelById,
  getChannelsByUser,
} from "../controller/channelController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/user/:userId", getChannelsByUser);
router.get("/:id", getChannelById);

export default router;