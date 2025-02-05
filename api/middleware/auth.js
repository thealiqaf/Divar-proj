const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log('Token is not valid');
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
};

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Token is not valid');
        res.status(401).json({
            message: 'Token is not valid'
        });
    };
}

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.log('Not authorized to access this route');
        return res.status(403).json({
            message: 'Not authorized to access this route'
        });
    }
    next();
};