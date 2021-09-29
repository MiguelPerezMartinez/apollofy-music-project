const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: [true, "Please input an owner"],
    },
    totalPlays: {
      type: Number,
      default: 0,
    },
    totalLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    author: {
      type: String,
      default: "unknown",
    },
    album: {
      type: String,
      default: "unknown",
    },
    title: {
      type: String,
      required: [true, "Please input a title"],
    },
    releaseYear: {
      type: String,
      default: "unknown",
    },
    urlImage: {
      type: String,
      default: "",
    },
    urlTrack: {
      type: String,
      required: [true, "Please input a song URL"],
    },
    genre: {
      type: String,
      default: "unknown",
    },
  },
  {
    timestamps: true,
  },
);

const Tracks = mongoose.model("tracks", TrackSchema);

module.exports = Tracks;
