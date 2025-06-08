import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
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
    followers: {
      type: Number,
      required: true,
      min: 0,
    },
    monthly_listeners: {
      type: Number,
      required: true,
      min: 0,
    },
    world_rank: {
      type: Number,
      required: true,
      min: 1,
    },
    genres: {
      type: [String],
      default: [],
      required: true,
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
    header_image: {
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
    color: {
      type: String,
      required: true,
    },
    gallery: {
      type: [
        {
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
      ],
      required: true,
    },
    albums: {
      type: [String],
      default: [],
      ref: "Album",
      required: true,
    },
    top_tracks: {
      type: [String],
      default: [],
      ref: "Track",
      required: true,
    },
    external_links: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
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
        },
      ],
      required: true,
    },
    biography: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// ===== Indexing Strategy =====
// 1. Primary index for ranking queries
// - Used in getTopArtistsAndMoreBy() for finding top artists
// - Supports queries like: Artist.find().sort({ world_rank: 1 })
artistSchema.index({ world_rank: 1 });

// 2. Index for follower-based queries
// - Used for sorting artists by popularity/following
// - Supports queries like: Artist.find().sort({ followers: -1 })
artistSchema.index({ followers: -1 });

// 3. Index for monthly listener queries
// - Used for finding trending artists
// - Supports queries like: Artist.find().sort({ monthly_listeners: -1 })
artistSchema.index({ monthly_listeners: -1 });

// 4. Compound index for genre-based queries with popularity
// - Optimizes finding popular artists within specific genres
// - Supports queries like: Artist.find({ genres: genre }).sort({ monthly_listeners: -1 })
artistSchema.index({ genres: 1, monthly_listeners: -1 });

// 5. Text index for search functionality
// - Enables full-text search across artist names and biography
// - Supports queries like: Artist.find({ $text: { $search: "search term" } })
artistSchema.index({ name: "text", biography: "text" });

// Note: We removed the following indexes as they're not actively used in queries:
// - albums: 1 (references are queried from Album model instead)
// - top_tracks: 1 (references are queried from Track model instead)
// - name: 1 (covered by text index for searches and not used for sorting)

export const Artist = mongoose.model("Artist", artistSchema);
