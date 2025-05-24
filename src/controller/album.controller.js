import { Album } from "../models/album.model.js";
import { Track } from "../models/track.model.js";

export const getAlbumById = async (req, res) => {
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

    const tracks = await Track.find({ _id: { $in: album.track_ids } }).sort({
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
        error: "Artist ID is required",
      });
    }

    const albums = await Album.find({
      artists: { $elemMatch: { _id: id } },
    }).sort({
      release_date: -1,
    });

    if (albums.length === 0) {
      return res
        .status(404)
        .json({ message: "Failed to fetch albums", error: "Albums not found" });
    }

    res.status(200).json({
      message: "Artist albums fetched successfully",
      albums,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch albums", error: error.message });
  }
};
