const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getUserById } = require('../controllers/userConroller');
const { protect, adminOnly } = require('../middleware/auth');

router.get("/", getUsers, protect, adminOnly);
router.get("/:id", getUserById, protect, adminOnly);
router.delete("/:id", deleteUser, protect, adminOnly);

module.exports = router;