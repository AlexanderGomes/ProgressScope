const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    ratingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ratings",
    },
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    desc: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
