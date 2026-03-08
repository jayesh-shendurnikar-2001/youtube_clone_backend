import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRouter.js";
import videoRoutes from "./routes/videoRoutes.js";
import cors from "cors";

const app = express();
// allow cors
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
dotenv.config();
connectDb();


// api start routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
