import mongoose from "mongoose";
import { Artist } from "../models/artist.model.js";
import { config } from "dotenv";
import { artistsData } from "../constants/artists-data.js";

config();

const seedArtists = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Insert new songs
    await Artist.insertMany(artistsData);

    console.log("Artists seeded successfully!");
  } catch (error) {
    console.error("Error seeding artists:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedArtists();
