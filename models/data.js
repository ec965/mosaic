const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const pixelSchema = new Schema(
  {
    r: {
      type: Number,
      min: 0,
      max: 255,
    },
    g: {
      type: Number,
      min: 0,
      max: 255,
    },
    b: {
      type: Number,
      min: 0,
      max: 255,
    },
  },
  { _id: false }
);

const dataSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    project: {
      pixelMap: [[pixelSchema]],
      borderRadius: {
        type: Number,
        default: 25,
        min: 0,
        max: 50,
      },
      grid: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: "#fff",
      },
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
