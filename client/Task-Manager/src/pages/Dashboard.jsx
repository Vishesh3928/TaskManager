import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error , setError]  = useState(null);
  
  const navigate = useNavigate();
  const token=localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks/get-tasks',{
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });

        setTasks(response.data.tasks);
      } catch (error) {
        setError(error.response.data.message)
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, dueDate, status };
      const response = await axios.post('http://localhost:5000/tasks/create-task', newTask,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setTasks([...tasks, response.data.task]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { title, description, dueDate, status };
      const response = await axios.patch(`http://localhost:5000/tasks/edit/${editingTaskId}`, updatedTask,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setTasks(tasks.map(task => task._id === editingTaskId ? response.data.task : task));
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
      setEditingTaskId(null);
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/delete/${taskId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setEditingTaskId(task._id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); 
    navigate('/login'); 
  }
  return (
    <>
    <div className="task-manager-container">
      <div className="form-container">
        <h2 className="form-title">{editingTaskId ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask} className="task-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
                />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            {editingTaskId ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>

      <div className="task-list-container">
        <h2 className="task-list-title">Task List</h2>
        <ol className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString(): "No Due Date Set  "}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleEditTask(task)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ol>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
