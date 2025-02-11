import { useState } from "react";
import axios from "axios"; // Install via `npm install axios`
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:5000/api/auth/signup",
        formData
      );
      localStorage.setItem("token", res.data.token); // Save token
      alert("Registration successful");
      navigate("/"); // Redirect to Home
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
          >
            Register
          </button>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
