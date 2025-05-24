import { Album } from "../models/album.model.js";
import { Artist } from "../models/artist.model.js";
import { Track } from "../models/track.model.js";

export const getNewReleases = async (req, res) => {
  try {
    const newReleaseAlbums = await Album.find({})
      .sort({ release_date: -1 })
      .limit(24)
      .lean();

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const newReleaseTracks = await Track.find({
      release_date: { $gte: oneYearAgo.toISOString().split("T")[0] },
    })
      .sort({ playcount: -1 })
      .limit(24)
      .lean();

    res.status(200).json({
      message: "New releases fetched successfully",
      newReleaseAlbums,
      newReleaseTracks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching new releases",
      error: error.message,
    });
  }
};

export const getTopArtistsAndMoreBy = async (req, res) => {
  try {
    const topArtists = await Artist.find({})
      .sort({ world_rank: 1 })
      .limit(18)
      .lean();

    const moreByArtist =
      topArtists[Math.floor(Math.random() * topArtists.length)];

    const moreByArtistAlbums = await Album.find({
      artists: { $elemMatch: { _id: moreByArtist._id } },
    })
      .sort({ release_date: -1 })
      .lean();

    res.status(200).json({
      message: "Top artists fetched successfully",
      topArtists,
      moreByArtist,
      moreByArtistAlbums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching top artists",
      error: error.message,
    });
  }
};

export const getDiscoverAndPopular = async (req, res) => {
  try {
    const [popularTracks, discoverTracks, popularAlbums, discoverAlbums] =
      await Promise.all([
        Track.find({}).sort({ playcount: -1 }).limit(12).lean(),
        Track.aggregate([{ $sample: { size: 12 } }]),

        Album.find({}).sort({ popularity: -1 }).limit(12).lean(),
        Album.aggregate([{ $sample: { size: 12 } }]),
      ]);

    res.status(200).json({
      message: "Data fetched successfully",
      popularTracks,
      discoverTracks,
      popularAlbums,
      discoverAlbums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get discover and popular data",
      error: error.message,
    });
  }
};
