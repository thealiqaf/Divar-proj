const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getUserById } = require('../controllers/userConroller');
const { protect, adminOnly } = require('../middleware/auth');

router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;