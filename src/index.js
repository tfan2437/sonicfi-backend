import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";
import { corsOptions } from "./config/cors.config.js";
// routes
import userRoute from "./routes/user.route.js";
import albumRoutes from "./routes/album.route.js";
import trackRoutes from "./routes/track.route.js";
import artistRoutes from "./routes/artist.route.js";
import suggestionRoutes from "./routes/suggestion.route.js";
import playlistRoutes from "./routes/playlist.route.js";

const app = express();

// Security and middleware setup
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoute);

app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/suggestion", suggestionRoutes);

app.get("/", (req, res) => {
  res.send("Sonicfi API");
});

// Custom error types
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : "Internal server error",
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

// Server startup
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on: http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
