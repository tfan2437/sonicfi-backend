import { Artist } from "../models/artist.model.js";

export const getAllArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find();

    res.status(200).json(artists);
  } catch (error) {
    console.log("Error in getAllArtists", error);
    next(error);
  }
};
