import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/login', { email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken  (response.data.token);
        navigate('/tasks'); 
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <p>Not Regiestered? <a href="/">Register</a> here</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
