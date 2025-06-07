import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    track_ids: {
      type: [String],
      ref: "Track",
      default: [],
      optional: true,
    },
  },
  { timestamps: true, versionKey: false }
);

playlistSchema.index({ uid: 1 });

export const Playlist = mongoose.model("Playlist", playlistSchema);
