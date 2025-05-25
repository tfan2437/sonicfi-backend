import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    preview_url: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    album: {
      _id: {
        type: String,
        required: true,
        ref: "Album",
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
      release_date: {
        type: String,
        required: true,
      },
    },
    release_date: {
      type: String,
      required: true,
    },
    track_number: {
      type: Number,
      required: true,
      min: 1,
    },
    disc_number: {
      type: Number,
      required: true,
      min: 1,
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
          message: "Track must have at least one artist",
        },
      ],
    },
    playcount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

// ===== Indexing Strategy =====
// 1. Compound index for new releases sorted by popularity
// - Used in getNewReleases() to find recent tracks sorted by playcount
// - Supports queries like: Track.find({ release_date: { $gte: date } }).sort({ playcount: -1 })
trackSchema.index({ release_date: -1, playcount: -1 });

// 2. Index for track ordering within albums
// - Used when fetching album tracks in correct order
// - Supports queries like: Track.find({ _id: { $in: trackIds } }).sort({ track_number: 1 })
trackSchema.index({ _id: 1, track_number: 1 });

// 3. Index for sorting by creation date
// - Used in getAllTracks() for chronological listing
// - Supports queries like: Track.find().sort({ createdAt: -1 })
trackSchema.index({ createdAt: -1 });

// 4. Index for popularity-based queries
// - Used in getDiscoverAndPopular() for finding trending/popular tracks
// - Supports queries like: Track.find().sort({ playcount: -1 })
trackSchema.index({ playcount: -1 });

// 5. Index for artist-based queries
// - Used when finding tracks by artist
// - Supports queries involving artist lookups
trackSchema.index({ "artists._id": 1 });

// 6. Index for album-based queries
// - Used when finding tracks by album ID
// - Supports queries involving album lookups
trackSchema.index({ "album._id": 1 });

// 7. Text index for search functionality
// - Enables full-text search across track and artist names
// - Supports queries like: Track.find({ $text: { $search: "search term" } })
trackSchema.index({ name: "text", "artists.name": "text" });

export const Track = mongoose.model("Track", trackSchema);
