import express from "express";

import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";

import userRoute from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats", statRoutes);

// port running
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
  connectDB();
});
