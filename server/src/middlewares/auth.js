const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    jwt.sign({ id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

}

const authenticate = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(' ')[0];

        if(!token) {
            return res.status(401).json({success: false, message: 'Token required'});

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ succes: false, message: error.message });
    }
}

module.exports = {
    generateToken,
    authenticate
}