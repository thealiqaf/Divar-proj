const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAd, getAllAds, getAdById, updateAd, deleteAd, approveAd, getPendingAds } = require('../controllers/adController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, upload.single('image'), createAd);
router.get('/', getAllAds);
router.get('/:id', getAdById);
router.patch('/:id', updateAd);
router.delete('/', protect, adminOnly, deleteAd);

router.patch('/:id/approve', protect, adminOnly, approveAd);
// router.get('/pending/count', protect, adminOnly, getPendingAdsCount);
router.get('/pending', protect, adminOnly, getPendingAds);

module.exports = router;
