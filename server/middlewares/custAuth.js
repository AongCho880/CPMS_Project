const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    // --- 1. Get the token from header
    const token = req.header('token');
    
    // --- 2. Check if there is a token
    if (!token) {
        return res.status(403).json({
            message: 'Access denied. No token provided. From custAuth',
        });
    }
    
    // --- 3. Verify the token
    try {
        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token. From custAuth',
        });
    }
};
