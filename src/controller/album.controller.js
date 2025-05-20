import { Album } from "../models/album.model.js";
import { Track } from "../models/track.model.js";

export const getAlbums = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering options
    const filter = {};
    if (req.query.artist) filter.artist = req.query.artist;
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.year) filter.release_year = req.query.year;

    // Sorting options
    const sort = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith("-")
        ? req.query.sort.substring(1)
        : req.query.sort;
      const sortOrder = req.query.sort.startsWith("-") ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort.release_date = -1; // Default: newest first
    }

    // Query with filters, pagination and count
    const [albums, totalCount] = await Promise.all([
      Album.find(filter).sort(sort).skip(skip).limit(limit),
      Album.countDocuments(filter),
    ]);

    // Return with pagination metadata
    res.status(200).json({
      albums,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in getAlbums", error);
    res
      .status(500)
      .json({ message: "Failed to fetch albums", error: error.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        message: "Failed to fetch album",
        error: "Album ID is required",
      });

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
