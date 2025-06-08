import { Album } from "../models/album.model.js";
import { Artist } from "../models/artist.model.js";
import { Track } from "../models/track.model.js";

export const getAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Failed to fetch album",
        error: "Album ID is required",
      });
    }

    const album = await Album.findById(id);
    if (!album) {
      return res
        .status(404)
        .json({ message: "Failed to fetch album", error: "Album not found" });
    }

    const tracks = await Track.find({ _id: { $in: album.tracks } }).sort({
      disc_number: 1,
      track_number: 1,
    });

    res.status(200).json({
      message: "Album fetched successfully",
      album,
      tracks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch album", error: error.message });
  }
};

export const getArtistAlbums = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Failed to fetch albums",
        albums: [],
      });
    }

    const artist = await Artist.findById(id);
    if (!artist) {
      return res
        .status(404)
        .json({ message: "Failed to fetch albums", albums: [] });
    }

    const albums = await Album.find({ _id: { $in: artist.albums } }).sort({
      release_date: -1,
    });

    res.status(200).json({
      message: "Artist albums fetched successfully",
      albums,
    });
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    res.status(500).json({ message: "Failed to fetch albums", albums: [] });
  }
};
