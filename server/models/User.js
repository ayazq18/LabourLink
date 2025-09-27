const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industryName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"], // only two roles for now
      default: "user",
    },
    address: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      tehsil: { type: String, required: true },
      zip: { type: String, required: true },
    },
    verificationToken: { type: String },
    verificationExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
