const express = require("express");
const { uploadResource, getResources, downloadResource } = require("../controllers/resourceController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

router.post("/", authMiddleware, upload.single("file"), uploadResource);
router.get("/", getResources);
router.get("/:id/download", authMiddleware, downloadResource);

module.exports = router;