const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true
    },

    gender: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    height: Number,
    weight: Number,
    shoulderWidth: Number,
    waistSize: Number,
    legLength: Number,

    clothes: [
      {
        category: String,
        name: String,
        imageUrl: String
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("User", userSchema);