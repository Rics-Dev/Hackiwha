const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
      maxLength: 200,
    },
    fileData: {
      type: Buffer, 
      required: [true, "File data is required"],
    },
    fileType: {
      type: String,
      enum: ["pdf", "image", "video", "other"],
      default: "other",
    },
    fileSize: {
      type: Number,
    },
    originalFileName: {
      type: String,
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