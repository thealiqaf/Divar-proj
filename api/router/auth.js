const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userConroller');
const { verifyEmail } = require('../controllers/userConroller');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;