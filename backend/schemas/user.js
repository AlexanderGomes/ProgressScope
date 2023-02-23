const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    role: {
      type: String,
      enum: ["employee", "manager", "HR", "owner"],
      default: "employee",
    },
    likes: [
      {
        type: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", employeeSchema);
