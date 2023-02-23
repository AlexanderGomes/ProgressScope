const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    usageLimit: {
      type: Number,
      required: true,
      default: 1,
    },
    role: {
      type: String,
      enum: ["employee", "manager", "HR", "owner"],
      default: "employee",
    },
    usedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

// Add a method to check if the code can be used
codeSchema.methods.canBeUsed = function () {
  return this.usedBy.length < this.usageLimit;
};

// Add a method to mark the code as used by a user
codeSchema.methods.markAsUsed = function (userId) {
  if (this.usedBy.indexOf(userId) === -1) {
    this.usedBy.push(userId);
  }
};

module.exports = mongoose.model("Code", codeSchema);
