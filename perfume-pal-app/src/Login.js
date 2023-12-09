// src/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post(
            'http://40.119.225.7/token',
            {
              username: username,
              password: password,
            },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

      const { access_token, notes_token } = response.data;
      // You can now store the tokens in local storage or a state management library.
      console.log('Access Token:', access_token);
      console.log('Notes Token:', notes_token);

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('notes_token', notes_token);

      // Redirect the user to the desired page after successful login.
      navigate('/notes');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
