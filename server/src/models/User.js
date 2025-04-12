const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    role: {
      type: String,
      enum: ["student", "mentor"],
      default: "student",
      required: true,
    },
    location: {
      type: String,
      maxLength: 100,
    },
    preferredLanguage: {
      type: String,
      enum: ["ar", "fr", "tzm"], // Arabic, French, Tamazight
      default: "fr",
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    knowledgePoints: {
      type: Number,
      default: 0,
    },
    studyLevel: {
      type: String,
      enum: ["primary", "middle", "secondary", "university", ""],
      default: "",
    },
    credentials: {
      type: String,
      maxLength: 200,
    },
    avatar: {
      type: String,
      maxLength: 200,
    },
  },
  {
    timestamps: true, 
  }
);

// Indexes
userSchema.index({ skills: 1, location: 1 });

module.exports = mongoose.model("User", userSchema);