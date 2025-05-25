import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
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
playlistSchema.index({ album_id: 1 });
playlistSchema.index({ "artists._id": 1 });
playlistSchema.index({ release_date: -1 });
playlistSchema.index({ playcount: -1 });
playlistSchema.index({ name: "text", "artists.name": "text" });

export const Playlist = mongoose.model("Playlist", playlistSchema);
