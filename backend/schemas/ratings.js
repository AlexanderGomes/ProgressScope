const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: Number,
    desc: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ratings", ratingsSchema);
