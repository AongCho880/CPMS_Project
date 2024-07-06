const jwt = require('jsonwebtoken');
require('dotenv').config();

function tokenGenerator(user_id) {
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret);
}

module.exports = tokenGenerator;
