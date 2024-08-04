import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const TopNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user context
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">ToDo</div>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          {user ? (
            <>
              <li className="font-semibold">{user.name}</li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-gray-300 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/todoList" className="hover:text-gray-300">Todo List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigation;
