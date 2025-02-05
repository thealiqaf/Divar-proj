const express = require('express');
const router = express.Router();
const { createCity, getCities, getCityById } = require('../controllers/cityController');
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", createCity, protect, adminOnly);
router.get("/", getCities);
router.get("/:id", getCityById);

module.exports = router;