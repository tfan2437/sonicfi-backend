import mongoose from "mongoose";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";
import { albumsData } from "../constants/albums-data.js";

config();

const seedAlbums = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Insert new songs
    await Album.insertMany(albumsData);

    console.log("Albums seeded successfully!");
  } catch (error) {
    console.error("Error seeding albums:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAlbums();
