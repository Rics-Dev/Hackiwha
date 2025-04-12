const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        error: { code: "NO_TOKEN", message: "No token provided" },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_TOKEN", message: "Invalid token" },
      });
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { code: "AUTH_ERROR", message: "Authentication failed" },
    });
  }
};