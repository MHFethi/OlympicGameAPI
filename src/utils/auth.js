const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
}

/* Get header bearer*/
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Token checking */
const verifyToken = (req, res, next) => {
    // Get the token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // chef if we have the token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }
    // check the Token authenticity
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

// Export
module.exports = {
    generateAccessToken,
    verifyToken
}