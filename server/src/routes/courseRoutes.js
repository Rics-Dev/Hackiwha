const express = require("express");
const { createCourse, getCourses, getMyCourses } = require("../controllers/courseController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.get("/", getCourses);
router.get("/my-courses", authMiddleware, getMyCourses);

module.exports = router;