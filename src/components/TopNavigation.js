import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const TopNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            TaskMaster
          </Link>
        </div>
        <ul className="flex space-x-4 text-white">
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
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigation;
