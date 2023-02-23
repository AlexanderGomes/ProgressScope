const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    intro: {
      type: String,
      required: [true, "Please add your intro"],
    },
    text: {
      type: String,
      required: [true, "Please add your report"],
    },
    likes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
