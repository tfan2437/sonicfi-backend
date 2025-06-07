import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    image_url: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
    provider: {
      type: String,
      enum: ["firebase", "google", "github", "email"],
      default: "firebase",
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model("User", userSchema);
