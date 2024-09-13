const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController'); // Import controller logic
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

// Route to get all todos (with pagination and filtering)
router.get('/', authMiddleware, todoController.getTodos);

// Route to create a new todo item
router.post('/', authMiddleware, todoController.createTodo);

// Route to update a todo item
router.put('/:id', authMiddleware, todoController.updateTodo);

// Route to delete a todo item
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
