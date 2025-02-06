const express = require('express');
const router = express.Router();
const { createCity, getCities, getCityById } = require('../controllers/cityController');
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, adminOnly, createCity);
router.get("/", getCities);
router.get("/:id", getCityById);

module.exports = router;