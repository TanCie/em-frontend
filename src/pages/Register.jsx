import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import utils from "../lib/utils";

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
      const res = await axios.post(`${utils.API_URL}/auth/signup`, formData);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token); // Save token
      toast.success("Registration successful");
      navigate("/"); // Redirect to Home
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center opacity-95 items-center p-16 md:p-24">
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
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 mt-1.5 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1.5 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1.5 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 cursor-pointer text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300"
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
