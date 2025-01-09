import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ['completed', 'pending'], 
      default: 'pending', 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model('Task', taskSchema);
export default Task;
