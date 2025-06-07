import mongoose from "mongoose";
import { Track } from "../models/track.model.js";
import { config } from "dotenv";
import { tracksData } from "../constants/tracks-data.js";

config();

const validateTracks = (tracks) => {
  const validTracks = [];
  const invalidTracks = [];

  tracks.forEach((track) => {
    if (!track.preview_url) {
      invalidTracks.push({
        id: track._id,
        name: track.name,
        reason: "Missing preview_url",
      });
    } else {
      validTracks.push(track);
    }
  });

  return { validTracks, invalidTracks };
};

const seedTracks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Validate tracks before seeding
    const { validTracks, invalidTracks } = validateTracks(tracksData);

    // Log tracks with missing preview_urls
    if (invalidTracks.length > 0) {
      console.log("\nTracks with missing preview_url:");
      invalidTracks.forEach((track) => {
        console.log(`- ID: ${track.id}, Name: ${track.name}`);
      });
      console.log(
        `\nTotal tracks with missing preview_url: ${invalidTracks.length}`
      );
    }

    // Only seed valid tracks
    if (validTracks.length > 0) {
      await Track.insertMany(validTracks);
      console.log(`\nSuccessfully seeded ${validTracks.length} tracks!`);
    } else {
      console.log("\nNo valid tracks to seed.");
    }
  } catch (error) {
    console.error("Error seeding tracks:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTracks();
