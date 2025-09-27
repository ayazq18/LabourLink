const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-token", resendVerificationEmail);
router.get("/fetchUsers", fetchUsers);
router.get("/fetchUserById/:id", fetchUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
