import mongoose from "mongoose";
import { Track } from "../models/track.model.js";
import { config } from "dotenv";
import { tracksData } from "../constants/tracks-data.js";

config();

const seedTracks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Insert new songs
    await Track.insertMany(tracksData);

    console.log("Tracks seeded successfully!");
  } catch (error) {
    console.error("Error seeding tracks:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTracks();
