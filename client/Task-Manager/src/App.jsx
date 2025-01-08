import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/tasks" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/tasks" /> : <Login setToken={setToken} />} />
        <Route path="/tasks" element={token ? <Dashboard setToken={setToken}/> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;