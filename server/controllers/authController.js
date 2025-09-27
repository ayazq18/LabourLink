const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const rateLimit = require("express-rate-limit");
const SendEmail = require("../services/sendEmail.js");

// Rate limiter for login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: "Too many login attempts from this IP, please try again later.",
});

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, industryName, phone, email, password, address } = req.body;
    console.log("name: ", name);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists, Please Login" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      industryName,
      phone,
      email,
      password: hashedPassword,
      address,
      isVerified: false,
    });

    const verificationToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    await newUser.save();

    const verificationUrl = `http://localhost:5173/verify-email/${verificationToken}`;
    await SendEmail(
      process.env.EMAIL_USER,
      email,
      "Email Verification",
      `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>
      <p>This link will expire in 1 minute.</p>
      `
    );

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY USER
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("token: ", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);

    const user = await User.findById(decoded.userId);
    console.log("user: ", user);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    setTimeout(async () => {
      user.isVerified = true;
      await user.save();

      res.status(200).json({
        message: "Email successfully verified! You can now log in.",
      });
    }, 2000);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Verification token has expired." });
    }
    res.status(500).json({ message: error.message });
  }
};

// Resend verification email endpoint
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    const newVerificationToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    const verificationUrl = `http://localhost:5173/verify-email/${newVerificationToken}`;
    await SendEmail(
      process.env.EMAIL_USER,
      user.email,
      "Email Verification",
      `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p><p>This link will expire in 1 minute.</p>`
    );

    res.status(200).json({
      message:
        "A new verification email has been sent. Please check your inbox.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER with rate limiting
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid credentials, Please register first" });

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        industryName: user.industryName,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch user by ID
const fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update function can be added here
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete function can be added here

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply rate limiter to login route
const applyLoginRateLimiter = (app) => {
  app.use("/api/auth/login", loginRateLimiter);
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  applyLoginRateLimiter,
  resendVerificationEmail,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
};
