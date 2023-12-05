// SignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate()
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      // Store the session object in global state or context
      console.log('Signup successful', response.data);
      navigate("/login")
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className='signup-container'>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleSignup}>Signup</button>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignupForm;
