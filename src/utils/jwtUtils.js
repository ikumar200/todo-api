const jwt = require('jsonwebtoken');

// Generate a JWT token for a given user
const generateToken = (user) => {
    const data = {
        id: user.id, // Include user ID in the token payload
        email: user.email, // You can include other info if needed (optional)
    };

    const jwtSecret = process.env.JWT_SECRET;

    // Return a signed JWT token
    return jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Verify the provided JWT token
const verifyToken = (token) => {
    const jwtSecret = process.env.JWT_SECRET;

    // Verify the token and return the decoded payload
    return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };
