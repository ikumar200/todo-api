const express = require('express');
const app = express();

const authRoutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/toDoRoutes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", toDoRoutes);

// Export the app using module.exports
module.exports = app;
