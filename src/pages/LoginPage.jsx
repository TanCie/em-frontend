import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthCheck";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      login(res.data.token); // Store token & update state
      alert("Login successful");
      navigate("/"); // Redirect after login
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="w-full mt-4 cursor-pointer border border-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
        >
          Guest Login
        </button>
        <p className="text-gray-400 text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
