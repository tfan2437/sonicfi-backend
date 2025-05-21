import { Album } from "../models/album.model.js";
import { Artist } from "../models/artist.model.js";
import { Track } from "../models/track.model.js";

export const getNewReleases = async (req, res) => {
  try {
    const responseAlbums = await Album.find()
      .sort({ release_date: -1 })
      .limit(36)
      .lean(); // Convert to plain JS objects for better performance

    const newReleaseAlbums = [...responseAlbums]
      .sort(() => Math.random() - 0.5)
      .slice(0, 24);

    const latestTrackIds = newReleaseAlbums.map((album) => {
      return album.track_ids[
        Math.floor(Math.random() * album.track_ids.length)
      ];
    });

    const responseTracks = await Track.find({ _id: { $in: latestTrackIds } });
    const newReleaseTracks = [...responseTracks].sort(
      () => Math.random() - 0.5
    );

    res.status(200).json({
      message: "New releases fetched",
      newReleaseAlbums: newReleaseAlbums,
      newReleaseTracks: newReleaseTracks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get new releases albums",
      error: error.message,
    });
  }
};

export const getTopAndMoreLikeArtists = async (req, res) => {
  try {
    const topArtists = await Artist.find().sort({ world_rank: 1 }).limit(18);

    const moreLikeArtist =
      topArtists[Math.floor(Math.random() * topArtists.length)];

    res.status(200).json({
      message: "Top artists fetched",
      topArtists: topArtists,
      moreLikeArtist: moreLikeArtist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get top artists",
      error: error.message,
    });
  }
};

export const getDiscoverAndPopularAlbums = async (req, res) => {
  try {
    const responseAlbums = await Album.find()
      .sort({ popularity: -1 })
      .limit(48)
      .lean(); // Convert to plain JS objects for better performance

    const randomAlbums = [...responseAlbums].sort(() => Math.random() - 0.5);

    const popularAlbums = randomAlbums.slice(0, 12);
    const discoverAlbums = randomAlbums.slice(12, 24);

    res.status(200).json({
      message: "Albums fetched successfully",
      popularAlbums: popularAlbums,
      discoverAlbums: discoverAlbums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get discover and popular albums",
      error: error.message,
    });
  }
};

export const getDiscoverAndPopularTraks = async (req, res) => {
  try {
    const responseTracks = await Track.find()
      .sort({ playcount: -1 })
      .limit(48)
      .lean();

    const popularTracks = responseTracks.slice(0, 12);
    const discoverTracks = responseTracks.slice(12, 24);

    res.status(200).json({
      message: "Tracks fetched successfully",
      popularTracks: popularTracks,
      discoverTracks: discoverTracks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get discover and popular tracks",
      error: error.message,
    });
  }
};
