const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company: {
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
    employees: {
      type: Number,
      required: [true, "Please add approximately how many employees"],
    },
    role: {
      type: String,
      default: "company",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
