import mongoose from "mongoose";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";
import { ALBUMS } from "../constants/album-constant.js";

config();

const seedAlbums = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing songs
    await Album.deleteMany({});

    // Insert new songs
    await Album.insertMany(ALBUMS);

    console.log("Albums seeded successfully!");
  } catch (error) {
    console.error("Error seeding albums:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAlbums();
