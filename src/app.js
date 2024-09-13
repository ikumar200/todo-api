const express=require('express');
const config=require("dotenv");
const app=express();
config();
const authRoutes="./routes/authRoutes";
const toDoRoutes="./routes/toDoRoutes";
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/todos",toDoRoutes);

export default app