import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";

import userRoute from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb max file size
    },
  })
);
app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// port running
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
  connectDB();
});
