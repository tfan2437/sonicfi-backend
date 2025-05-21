import { Album } from "../models/album.model.js";
import { Artist } from "../models/artist.model.js";
export const getNewReleasesAlbums = async (req, res) => {
  try {
    const responseAlbums = await Album.find()
      .sort({ release_date: -1 })
      .limit(36)
      .lean(); // Convert to plain JS objects for better performance

    const latestAlbums = [...responseAlbums]
      .sort(() => Math.random() - 0.5)
      .slice(0, 24);

    res.status(200).json({
      message: "New releases fetched",
      albums: latestAlbums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get new releases albums",
      error: error.message,
    });
  }
};

export const getPopularAlbums = async (req, res) => {
  try {
    const responseAlbums = await Album.find()
      .sort({ popularity: -1 })
      .limit(36)
      .lean(); // Convert to plain JS objects for better performance

    const popularAlbums = [...responseAlbums]
      .sort(() => Math.random() - 0.5)
      .slice(0, 24);

    res.status(200).json({
      message: "Popular albums fetched",
      albums: popularAlbums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get popular albums",
      error: error.message,
    });
  }
};

export const getTopArtists = async (req, res) => {
  try {
    const topArtists = await Artist.find().sort({ world_rank: 1 }).limit(18);

    res.status(200).json({
      message: "Top artists fetched",
      artists: topArtists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in get top artists",
      error: error.message,
    });
  }
};

// export const getMoreLike = async (req, res) => {
//   try {
//     const topArtists = await Artist.find().sort({ world_rank: 1 }).limit(10);

//     const moreLikeArtist =
//       topArtists[Math.floor(Math.random() * topArtists.length)];

//     const moreLikeAlbums = await Album.find({
//       artists: { $in: [moreLikeArtist._id] },
//     }).limit(10);

//     res.status(200).json({
//       message: "Top artists fetched",
//       artists: topArtists,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error in get top artists",
//       error: error.message,
//     });
//   }
// };
