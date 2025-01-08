import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        name,
        email,
        password,
      });

      alert('User registered successfully');
      navigate('/login');
    } catch (error) {
      // console.log(error)
      if (error.response && error.response.data.error){
          setError("Input a Vaild Email Format");
      }else{
        setError(error.response.data.message);
      }
     
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
          <p>Already Regiestered? <a href="/login">Login</a> here</p>
        </form>
      </div>
    </div>
  );
}

export default Register;