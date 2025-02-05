const express = require("express");
const router = express.Router();
const { makeAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/auth");

router.put("/make-admin/:id", protect, makeAdmin);

module.exports = router;
