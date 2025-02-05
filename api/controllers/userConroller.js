const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne( {email} );
        if (existingUser) {
            console.log('The email already used');
            return res.status(400).json({
                message: 'The email already used'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create ({
            name,
            email,
            password: hashedPassword
        });
        console.log('User created');
        res.status(201).json({
            message: 'User created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

module.exports = { registerUser, getUsers };