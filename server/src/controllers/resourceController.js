// resourceController.js
const Resource = require("../models/Resource");
const zlib = require("zlib");
const { promisify } = require("util");
const compress = promisify(zlib.gzip);

// Upload a resource
exports.uploadResource = async (req, res) => {
  try {
    const { title, fileType, courseIds } = req.body;
    const file = req.file; 

    if (!title || !file) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Title and file are required" },
      });
    }

    const compressedData = await compress(file.buffer);

    const resource = await Resource.create({
      title,
      fileType: fileType || "other",
      fileData: compressedData, 
      fileSize: compressedData.length, 
      originalFileName: file.originalname,
      uploadedBy: req.user.id,
      courses: courseIds ? JSON.parse(courseIds) : [],
    });

    res.status(201).json({
      success: true,
      data: { resource },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("uploadedBy", "name email")
      .populate("courses", "title")
      .select("-fileData"); 
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

exports.downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Resource not found" },
      });
    }

    const decompress = promisify(zlib.gunzip);
    const decompressedData = await decompress(resource.fileData);

    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${resource.originalFileName}"`,
      "Content-Length": decompressedData.length,
    });

    res.send(decompressedData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};