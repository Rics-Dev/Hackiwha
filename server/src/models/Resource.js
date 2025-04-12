const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
      maxLength: 200,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileType: {
      type: String,
      enum: ["pdf", "image", "video", "other"],
      default: "other",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploader is required"],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);