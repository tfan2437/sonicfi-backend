import mongoose from "mongoose";
import { Artist } from "../models/artist.model.js";
import { config } from "dotenv";
import { ARTISTS } from "../constants/artist-constant.js";

config();

const seedArtists = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing songs
    await Artist.deleteMany({});

    // Insert new songs
    await Artist.insertMany(ARTISTS);

    console.log("Artists seeded successfully!");
  } catch (error) {
    console.error("Error seeding artists:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedArtists();
