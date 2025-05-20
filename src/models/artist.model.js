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

// Index for common queries
artistSchema.index({ name: 1 });
artistSchema.index({ world_rank: 1 });
artistSchema.index({ genres: 1 });
artistSchema.index({ followers: -1 });
artistSchema.index({ monthly_listeners: -1 });

export const Artist = mongoose.model("Artist", artistSchema);
