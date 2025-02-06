const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log('The email already used');
            return res.status(400).json({
                message: 'The email already used'
            });
        }
        if (!name || !email || !password) {
            console.log('Please fill all fields');
            return res.status(400).json({
                message: 'Please fill all fields'
            });
        }
        if (password.length < 6) {
            console.log('Password should be at least 6 characters');
            return res.status(400).json({
                message: 'Password should be at least 6 characters'
            });
        }
        
    const newUser = new User({ name, email, password });
        await newUser.save();

        console.log('User created successfully');
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.find({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }


        const token = jwt.sign(
            { userId: user._id,
                role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token, message: "Login successful" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found');
//             res.status(400).json({
//                 message: 'User not found'
//             });

//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) {
//                 console.log('Wrong password');
//                 return res.status(400).json({
//                     message: 'Wrong password'
//                 });
//             }

//             const token = jwt.sign({ id: user._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1d' }
//             );

//             res.status(200).json({
//                 token, message: 'Login successful'
//             });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

const getUsers = async (req, res) => {
    try {
        const user = await User.find().select("name email createdAt role");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        .select("name email createdAt");
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                message: 'User not found'
            });
        }
        console.log('User found');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                message: 'User not found'
            });
        }
        console.log('User deleted successfully');
        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
}

module.exports = { registerUser, getUsers, deleteUser, getUserById, loginUser };