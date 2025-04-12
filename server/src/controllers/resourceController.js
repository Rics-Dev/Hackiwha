const Resource = require("../models/Resource");

// Upload a resource
exports.uploadResource = async (req, res) => {
  try {
    const { title, fileUrl, fileType, courseIds } = req.body;

    if (!title || !fileUrl) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Title and file URL are required" },
      });
    }

    const resource = await Resource.create({
      title,
      fileUrl,
      fileType: fileType || "other",
      uploadedBy: req.user.id,
      courses: courseIds || [],
    });

    res.status(201).json({
      success: true,
      data: { resource },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};

// Get all resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("uploadedBy", "name email").populate("courses", "title");
    res.json({
      success: true,
      data: { resources },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};