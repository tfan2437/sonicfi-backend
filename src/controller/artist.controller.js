import { Artist } from "../models/artist.model.js";
import { Track } from "../models/track.model.js";
import { Album } from "../models/album.model.js";

export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Failed to fetch album",
        error: "Artist ID is required",
      });
    }

    const artist = await Artist.findById(id);
    if (!artist) {
      return res
        .status(404)
        .json({ message: "Failed to fetch artist", error: "Artist not found" });
    }

    const albums = await Album.find({ _id: { $in: artist.albums } }).sort({
      release_date: -1,
    });

    console.log(artist);

    const tracks = await Track.find({ _id: { $in: artist.top_tracks } }).sort({
      playcount: -1,
    });

    res.status(200).json({
      message: "Artist fetched successfully",
      artist,
      albums,
      tracks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch artist", error: error.message });
  }
};
