const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new Schema(
  {
    username: String,
    text: String,
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

commentSchema.pre("save", function (next) {
  var comment = this;
  comment.updated = Date.now();
  next();
});

const pixelSchema = new Schema(
  {
    r: Number,
    g: Number,
    b: Number,
  },
  { _id: false }
);

const dataSchema = new Schema(
  {
    username: { type: String, require: true },
    title: { type: String },
    project: {
      pixelMap: [[pixelSchema]],
      borderRadius: { type: Number, default: 25 },
      grid: { type: Boolean, default: false },
      backgroundColor: { type: String, default: "#fff" },
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
