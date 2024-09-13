const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwtUtils'); // Adjust the path based on your project structure

// Middleware function to authenticate requests
const authenticate = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = verifyToken(token);
        req.user = decoded; // Attach the user data to the request object
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
