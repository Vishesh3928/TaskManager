import taskModel from "../models/taskModel.js";

export const createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const { _id: userId } = req.user;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
  
    try {
      const task = await taskModel.create({
        title,
        description,
        dueDate,
        user: userId, 
      });
      return res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      return res.status(500).json({ message: `Error in creating task: ${error}` });
    }
  };

export const getAllTasks = async (req, res) => {
    const { _id: userId } = req.user;
  
    try {
      const tasks = await taskModel.find({ user: userId }).sort({ dueDate: 1 }); 
      return res.status(200).json({ tasks });
    } catch (error) {
      return res.status(500).json({ message: `Error in fetching tasks: ${error}` });
    }
  };
  export const deleteTask = async (req, res) => {
    const { id: taskId } = req.params; 
    const { _id: userId } = req.user;
  
    try {
      const task = await taskModel.findOneAndDelete({ _id: taskId, user: userId });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found or unauthorized action" });
      }
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: `Error in deleting task: ${error.message}` });
    }
  };
  export const updateTask = async (req, res) => {
    const { id: taskId } = req.params; 
    const { title, description, dueDate, status } = req.body;
    const { _id: userId } = req.user;
    try {
      const task = await taskModel.findOneAndUpdate(
        { _id: taskId, user: userId },
        { title, description, dueDate, status },
        { new: true, runValidators: true } 
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
      return res.status(500).json({ message: `Error in updating task: ${error.message}` });
    }
  };
    
