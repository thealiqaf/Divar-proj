const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../controllers/userConroller');

router.post("/register", registerUser);
router.get("/", getUsers);

module.exports = router;