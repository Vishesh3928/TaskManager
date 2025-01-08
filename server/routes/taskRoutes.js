import express from "express"
import { createTask,getAllTasks,deleteTask,updateTask } from "../controllers/taskController.js";
import authenticateToken from "../middlewares/tokenVerification.js";

const router = express.Router();

router.post('/create-task',authenticateToken,createTask);
router.get('/get-tasks',authenticateToken,getAllTasks);
router.patch('/edit/:id',authenticateToken,updateTask);
router.delete('/delete/:id',authenticateToken,deleteTask)
export default router;
