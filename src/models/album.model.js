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
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
            trim: true,
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
    track_ids: {
      type: [String],
      default: [],
      required: true,
    },
    total_tracks: {
      type: Number,
      required: true,
      min: 1,
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

// Index for common queries
albumSchema.index({ "artists.id": 1 });
albumSchema.index({ popularity: -1 });
albumSchema.index({ release_date: -1 });

export const Album = mongoose.model("Album", albumSchema);
