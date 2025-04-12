const express = require("express");
const { signup, signin, updateProfile, getMe, searchUsersByEmail } = require("../controllers/authController");
const {authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getMe);
router.get("/search", authMiddleware, searchUsersByEmail);

module.exports = router;