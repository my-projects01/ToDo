import axios from 'axios';

const API_URL = 'http://localhost:3001'; 
const token = localStorage.getItem('token');

// get all tasks
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/api/tasks/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// get single task
export const createTask = async (task, ) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/api/tasks/create`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

// update single task
export const updateTask = async (taskId, updatedTask ) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/api/tasks/update/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

// delete single task
export const deleteTask = async (taskId ) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/api/tasks/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// get logged user data
export const getMe = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}