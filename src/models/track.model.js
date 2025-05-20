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
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    album_id: {
      type: String,
      required: true,
      ref: "Album",
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

// Index for common queries
trackSchema.index({ album_id: 1 });
trackSchema.index({ "artists.id": 1 });
trackSchema.index({ playcount: -1 });

export const Track = mongoose.model("Track", trackSchema);
