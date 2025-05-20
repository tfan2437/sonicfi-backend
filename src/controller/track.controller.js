import { Track } from "../models/track.model.js";

export const getAllTracks = async (req, res, next) => {
  try {
    // -1: newest to oldest
    const tracks = await Track.find().sort({ createdAt: -1 });

    res.status(200).json(tracks);
  } catch (error) {
    console.log("Error in getAllTracks", error);
    next(error);
  }
};
