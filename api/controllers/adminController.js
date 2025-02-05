const User = require("../models/user");

exports.makeAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(req.user);
        if (req.user.role !== 'admin') {
            console.log('Access denied');
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                message: 'User not found'
            });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({
            message: 'User promoted to admin', user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};