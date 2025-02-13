import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthCheck";
import toast from "react-hot-toast";
import utils from "../lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${utils.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        login(data.token, data.userId); // Store token & update state
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center opacity-95 items-center p-12 md:p-12">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-500 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full  p-1.5 pl-3 mt-0.5 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full  p-1.5 pl-3 mt-0.5  border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg font-semibold text-sm md:text-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="w-full mt-2 cursor-pointer border border-green-600 text-white py-2 rounded-lg font-semibold text-sm md:text-lg hover:bg-green-700 transition duration-300"
        >
          Guest Login
        </button>
        <p className="text-gray-400 text-sm text-center mt-2">
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
