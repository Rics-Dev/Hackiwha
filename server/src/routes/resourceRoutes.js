const express = require("express");
const { uploadResource, getResources } = require("../controllers/resourceController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, uploadResource);
router.get("/", getResources);

module.exports = router;