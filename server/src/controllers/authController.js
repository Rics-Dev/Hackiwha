const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Sign JWT token
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Signup
exports.signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      role,
      name,
      location,
      preferredLanguage,
      skills,
      bio,
      studyLevel,
      credentials,
      avatar,
    } = req.body;

if (!email || !password || !name) { 
  return res.status(400).json({
    success: false,
    error: { code: "MISSING_FIELDS", message: "Email, password, and name are required" },
  });
}

    // Validate role
    if (role && !["student", "mentor"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_ROLE", message: "Role must be 'student' or 'mentor'" },
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: "EMAIL_EXISTS", message: "Email already in use" },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);


    // Create user
    const user = await User.create({
      email,
      passwordHash,
      name,
      role: role || "student",
      location,
      preferredLanguage: preferredLanguage || "fr",
      skills: skills || [],
      bio,
      studyLevel: studyLevel || "",
      credentials,
      avatar,
      knowledgePoints: 0,
    });

    // Generate JWT
    const token = signToken(user._id, user.role);

    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          skills: user.skills,
          location: user.location,
          studyLevel: user.studyLevel,
          bio: user.bio,
          knowledgePoints: user.knowledgePoints,
          preferredLanguage: user.preferredLanguage,
          credentials: user.credentials,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};

// Signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Email and password are required" },
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    // Verify password
    const isCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isCorrect) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    // Generate JWT
    const token = signToken(user._id, user.role);

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          skills: user.skills,
          location: user.location,
          studyLevel: user.studyLevel,
          bio: user.bio,
          knowledgePoints: user.knowledgePoints,
          preferredLanguage: user.preferredLanguage,
          credentials: user.credentials,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};


exports.updateProfile = async (req, res, next) => {
  try {
    const {
      location,
      preferredLanguage,
      skills,
      bio,
      studyLevel,
      credentials,
      avatar,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      });
    }

    if (preferredLanguage && !["ar", "fr", "tzm"].includes(preferredLanguage)) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_LANGUAGE", message: "Invalid language selected" },
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        location,
        preferredLanguage: preferredLanguage || "fr",
        skills: skills || [],
        bio,
        studyLevel,
        credentials,
        avatar,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: { code: "USER_NOT_FOUND", message: "User not found" },
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          _id: updatedUser._id.toString(),
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          skills: updatedUser.skills,
          location: updatedUser.location,
          studyLevel: updatedUser.studyLevel,
          bio: updatedUser.bio,
          knowledgePoints: updatedUser.knowledgePoints,
          preferredLanguage: updatedUser.preferredLanguage,
          credentials: updatedUser.credentials,
          avatar: updatedUser.avatar,
          createdAt: updatedUser.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};


exports.getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: "USER_NOT_FOUND", message: "User not found" },
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          skills: user.skills,
          location: user.location,
          studyLevel: user.studyLevel,
          bio: user.bio,
          knowledgePoints: user.knowledgePoints,
          preferredLanguage: user.preferredLanguage,
          credentials: user.credentials,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};


exports.searchUsersByEmail = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_QUERY", message: "Search query is required" },
      });
    }

    const users = await User.find({
      email: { $regex: query, $options: "i" },
    })
      .select("email name _id") 
      .limit(5); 

    res.json({
      success: true,
      data: {
        users: users.map((user) => ({
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: error.message },
    });
  }
};