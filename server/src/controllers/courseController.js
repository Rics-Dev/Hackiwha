const Course = require("../models/Course");
const User = require("../models/User");

// Create a course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Title is required" },
      });
    }

    const course = await Course.create({
      title,
      description,
      creator: req.user.id,
    });

    // Add course to user's courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { courses: course._id },
    });

    res.status(201).json({
      success: true,
      data: { course },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("creator", "name email");
    res.json({
      success: true,
      data: { courses },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};


exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.user.id }).populate("creator", "name email");
    res.json({
      success: true,
      data: { courses },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};