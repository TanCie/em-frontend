import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { AuthContext } from "../auth/AuthCheck";
import { X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    navigate("/"); // Redirect to dashboard page
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-4xl font-bold text-green-400">
          Evently
        </Link>

        {/* Right - Menu (Desktop) */}
        <div className="hidden text-lg italic md:flex space-x-12">
          {isLoggedIn ? (
            <>
              <Link to="/create" className="hover:text-green-400 transition">
                Create Event
              </Link>
              <Link
                to="/manage-events"
                className="hover:text-green-400 transition"
              >
                Manage Events
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

        {/* Mobile Menu Button */}

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          {isLoggedIn ? (
            <>
              <Link
                to="/create"
                className="block py-2 px-4 hover:bg-gray-600 text-center"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/manage"
                className="block py-2 px-4 hover:bg-gray-600 text-center"
                onClick={() => setIsOpen(false)}
              >
                Manage Events
              </Link>
              <button
                className="block w-full text-center py-2 px-4 hover:bg-gray-600 text-red-400"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-gray-600 text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-4 hover:bg-gray-600 text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 hover:bg-gray-600 text-center"
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
