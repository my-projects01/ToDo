import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import UserContext from '../context/UserContext';
const API_URL = 'http://localhost:3001';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      console.log('Attempting to log in with', { email, password }); // Debugging: log the request payload
      const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password });
      console.log('Login successful:', data); // Debugging: log the response data

      // Adjust according to the response structure
      if (data.token && data._id && data.name && data.email) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        setUser({
          id: data._id,
          name: data.name,
          email: data.email
        });
        navigate('/');
      } else {
        setError('Invalid response from server.');
        console.error('Invalid response structure:', data); // Debugging: log the invalid response
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        // Request was made but no response received
        setError('No response received from the server.');
        console.error('Error request data:', error.request); // Debugging: log the request data
      } else {
        // Something else happened while setting up the request
        setError('An error occurred while setting up the request.');
        console.error('Error message:', error.message); // Debugging: log the error message
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <LoginForm
        email={formData.email}
        password={formData.password}
        error={typeof error === 'string' ? error : JSON.stringify(error)}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
