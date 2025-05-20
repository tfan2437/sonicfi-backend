import mongoose from "mongoose";
import { Track } from "../models/track.model.js";
import { config } from "dotenv";
import { TRACKS } from "../constants/track-constant.js";

config();

const seedTracks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing songs
    await Track.deleteMany({});

    // Insert new songs
    await Track.insertMany(TRACKS);

    console.log("Tracks seeded successfully!");
  } catch (error) {
    console.error("Error seeding tracks:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTracks();
