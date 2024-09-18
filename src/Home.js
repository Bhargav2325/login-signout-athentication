import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username =
      sessionStorage.getItem("username") || Cookies.get("username"); // Check sessionStorage or cookies
    if (!username) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    Cookies.remove("username"); // Remove the username from cookies
    navigate("/login");
  };

  return (
    <div className="max-w-full h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto bg-gray-200">
        <div className="flex justify-between items-center h-10 px-4 rounded-md bg-gray-300">
          <Link to="/">Home</Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
        <h1 className="text-4xl mt-8">Welcome to Home</h1>
      </div>
    </div>
  );
};

export default Home;
