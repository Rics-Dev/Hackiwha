const express = require("express");
const { signup, signin, updateProfile, getMe } = require("../controllers/authController");
const {authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getMe);

module.exports = router;