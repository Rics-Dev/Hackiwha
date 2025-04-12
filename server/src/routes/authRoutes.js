const express = require("express");
const { signup, signin, updateProfile } = require("../controllers/authController");
const {authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;