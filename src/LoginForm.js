// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './LoginForm.css'
import { Link, useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      // Store the session object in global state
      login(response.data);
      console.log('Login successful', response.data);
      navigate("/home")
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <Link to="/signup">Register</Link>
    </div>
  );
};

export default LoginForm;
