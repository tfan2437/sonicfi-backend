import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";

import userRoute from "./routes/user.route.js";

import authRoutes from "./routes/auth.route.js";
import albumRoutes from "./routes/album.route.js";

import trackRoutes from "./routes/track.route.js";
import artistRoutes from "./routes/artist.route.js";
import suggestionRoutes from "./routes/suggestion.route.js";
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

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
// refactor
app.use("/api/tracks", trackRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/album", albumRoutes);
// refactor
app.use("/api/suggestion", suggestionRoutes);

app.get("/", (req, res) => {
  res.send("Sonicfi API");
});

// error handler
app.use(
  (
    err,
    req,
    res,
    // eslint-disable-next-line no-unused-vars
    next
  ) => {
    res.status(500).json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
  }
);

// port running
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
  connectDB();
});
