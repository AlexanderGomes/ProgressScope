const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    desc: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
