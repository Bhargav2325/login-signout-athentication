import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";  // Import js-cookie

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    Cookies.remove("username"); // Clear the username cookie when the component mounts
  }, []);

  const ProceedLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/user/${username}`);

      if (!response.ok) {
        throw new Error("User not found or server error.");
      }

      const userData = await response.json();

      if (!userData || Object.keys(userData).length === 0) {
        toast.error("Invalid username.");
        return;
      }

      if (userData.password === password) {
        toast.success("Logged in successfully.");
        sessionStorage.setItem("username", username);  // Store username in sessionStorage
        Cookies.set("username", username, { expires: 1 });  // Store username in cookies for 1 day
        navigate("/");
      } else {
        toast.error("Invalid password.");
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={ProceedLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-3xl text-blue-500 mb-4">
            <h1>Login</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:border-blue-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:border-blue-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link className="ml-4" to="/register">
              New User?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
