const express = require("express");
const { registerUser, loginUser, verifyEmail, resendVerificationEmail } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-token", resendVerificationEmail);


module.exports = router;
