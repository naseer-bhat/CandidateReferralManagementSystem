import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },

  phone: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian phone number",
    ],
  },

  jobTitle: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Hired"],
    default: "Pending",
  },
  resume: { type: String },
  referredBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("User", UserSchema);
