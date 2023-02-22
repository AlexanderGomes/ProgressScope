const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", employeeSchema);
