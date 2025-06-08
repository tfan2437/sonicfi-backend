import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    artists: {
      type: [
        {
          _id: {
            type: String,
            required: true,
            ref: "Artist",
          },
          name: {
            type: String,
            required: true,
            trim: true,
          },
          profile_image: {
            url: {
              type: String,
              required: true,
              validate: {
                validator: function (v) {
                  return /^https?:\/\/.+/i.test(v);
                },
                message: (props) => `${props.value} is not a valid URL!`,
              },
            },
            height: {
              type: Number,
              required: true,
            },
            width: {
              type: Number,
              required: true,
            },
          },
        },
      ],
      required: true,
      validate: [
        {
          validator: function (artists) {
            return artists && artists.length > 0;
          },
          message: "Album must have at least one artist",
        },
      ],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
    },
    color: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    tracks: {
      type: [String],
      default: [],
      ref: "Track",
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
      min: 0,
    },
    label: {
      type: String,
      required: true,
    },
    copyright: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// ===== Indexing Strategy =====
// 1. Compound index for efficiently querying albums by artist and sorting by release date
// - Used in getArtistAlbums() and when fetching artist's albums
// - Supports queries like: Album.find({ "artists._id": artistId }).sort({ release_date: -1 })
albumSchema.index({ "artists._id": 1, release_date: -1 });

// 2. Index for popularity-based queries
// - Used in getDiscoverAndPopular() for finding trending/popular albums
// - Supports queries like: Album.find().sort({ popularity: -1 })
albumSchema.index({ popularity: -1 });

// 3. Index for release date sorting
// - Used in getNewReleases() for finding latest albums
// - Supports queries like: Album.find().sort({ release_date: -1 })
albumSchema.index({ release_date: -1 });

// 4. Text index for search functionality
// - Enables full-text search across album and artist names
// - Supports queries like: Album.find({ $text: { $search: "search term" } })
albumSchema.index({ name: "text", "artists.name": "text" });

export const Album = mongoose.model("Album", albumSchema);
