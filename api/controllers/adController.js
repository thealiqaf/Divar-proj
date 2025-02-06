const Ad = require('../models/ad');
const mongoose = require('mongoose');

exports.createAd = async (req, res) => {
    try {
        const { title, description, price, city, category } = req.body;
        const image = req.file ? req.file.path : null;
        const newAd = new Ad({
            title,
            description,
            price,
            city,
            category,
            image,
            user: req.user.userId
        });

        const saveAd = await newAd.save();
        console.log('Ad created successfully', saveAd);
        res.status(201).json({
            message: 'Ad created successfully',
            ad: saveAd
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: "Ad not found" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins access this route" });
        }

        console.log("Before Update:", ad.status);

        if (req.body.status === "approved" || req.body.status === "pending") {
            ad.status = req.body.status;
        } else {
            return res.status(400).json({ message: "Invalid status value" });
        }

        await ad.save();
        console.log("After Update:", ad.status);

        ad.status = req.body.status;
        await ad.save();

        res.status(200).json({ message: `Ad ${ad.status} successfully`, ad });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const ads = await Ad.find({ status: "approved" })
        .populate("city category user", "name email")
        .select('-status -__v')
        .skip(skip)
        .limit(limit);

        const total = await Ad.countDocuments({ status: "approved" });
        
        res.status(200).json({
            totalAds: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            ads
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdById = async (req, res) => {
    try {
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const ad = await Ad.findById(req.params.id).populate("city category user", "name email");

        if (!ad) {
            return res.status(404).json({
                message: 'Ad not found'
            });
        }
        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAd = async (req, res) => {
    try {
        const { title, description, price, city, category } = req.body;
        const updatedAd = await Ad.findByIdAndUpdate(
            req.params.id,
            { title, description, price, city, category },
            { new: true }
        );
        
        if (!updatedAd) {
            return res.status(404).json({ message: "Ad not found" });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (updatedAd.user.toString() !== req.user.userId && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this ad" });
        }


        res.status(200).json({ message: "Ad updated successfully", ad: updatedAd });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findByIdAndDelete(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: "Ad not found" });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (ad.user.toString() !== req.user.userId && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to delete this ad" });
        }

        res.status(200).json({ message: "Ad deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPendingAds = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can access this route" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const pendingAds = await Ad.find({ status: "pending" })
            .populate("user", "name email")
            .populate("category", "name")
            .skip(skip)
            .limit(limit);

        const total = await Ad.countDocuments({ status: "pending" });

        res.status(200).json({
            totalPendingAds: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            pendingAds
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};