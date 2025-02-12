import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../auth/AuthCheck";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [userId, setUserId] = useState(""); // Store userId state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 px-6">
        <Link
          to="/"
          className="text-3xl md:text-5xl text-green-400 my-4 flex items-center gap-2 transition-all duration-300"
        >
          <span className="font-extrabold text-6xl logo text-green-500">E</span>
          <span className="text-green-100 tracking-tight">ventrr</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg italic">
          {isLoggedIn ? (
            <>
              <Link to="/create" className="hover:text-green-400 transition">
                Create Event
              </Link>

              <Link
                to={`/event-register/my-events/${userId}`}
                className="hover:text-green-400 transition"
              >
                Manage My Events
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-300 cursor-pointer transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-green-400 transition">
                Dashboard
              </Link>
              <Link to="/signup" className="hover:text-green-400 transition">
                Register
              </Link>
              <Link to="/login" className="hover:text-green-400 transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-gray-900 text-white text-center p-4 space-y-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/create"
                className="py-2 hover:text-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
              {userId && (
                <Link
                  to={`/event-register/my-events/${userId}`}
                  className="py-2 hover:text-green-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Manage My Events
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-2 text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="py-2 hover:text-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/signup"
                className="py-2 hover:text-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="py-2 hover:text-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
