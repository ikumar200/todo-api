const prisma = require('../models/prismaModel');

// Get all todos (with pagination and filtering)
const getTodos = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { page = 1, limit = 10 } = req.query; // Pagination

    try {
        // Fetch todos for the authenticated user
        const todos = await prisma.todo.findMany({
            where: { userId },
            skip: (page - 1) * limit,
            take: parseInt(limit)
        });

        const total = await prisma.todo.count({ where: { userId } });

        res.status(200).json({
            data: todos,
            page: parseInt(page),
            limit: parseInt(limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { title, description } = req.body;

    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                description,
                userId
            }
        });

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update an existing todo
const updateTodo = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { id } = req.params; // Extract todo ID from URL
    const { title, description } = req.body;

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

        // Check if the todo belongs to the user
        if (!todo || todo.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Update the todo
        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { title, description }
        });

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { id } = req.params;

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

        // Check if the todo belongs to the user
        if (!todo || todo.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Delete the todo
        await prisma.todo.delete({ where: { id: parseInt(id) } });

        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
