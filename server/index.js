import express from "express";
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',userRoutes);
app.use('/tasks',taskRoutes);

const PORT = 5000;
app.listen(PORT , ()=>{
    console.log(`Server Running on PORT: ${PORT}`);
})
