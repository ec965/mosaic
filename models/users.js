const bcrypt = require("bcrypt");
const saltRounds = require("../config/salt");
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minLength: [6, 'Username must be at least 6 characters.'],
      maxLength: [24, 'Username cannot exceed 24 characters.'],
      validate: [/^[a-zA-Z0-9_]*$/, "Username can only have alphanumeric characters"],
    },
    password: { 
      type: String, 
      required: true, 
      minLength: [6, 'Password must be at least 6 characters.'],
      maxLength: [64, 'Password cannot exceed 64 characters.'],
    },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    cb(err, result);
  });
};

userSchema.pre("save", function (next) {
  var user = this;

  // only hash  password if it's new or been modified
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
