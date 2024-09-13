const jwt = require('jsonwebtoken');
const prisma = require('../models/prismaModel');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user (without bcrypt)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password // Directly storing the password (ensure it’s hashed in a real-world app)
            }
        });

        // Generate JWT token for the new user
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        // Respond with the token
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
