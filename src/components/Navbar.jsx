import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-[#F2DAB8] z-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="spicy-rice text-[#2B1511] text-2xl">
          <Link to="/">SPECTRUM</Link>
        </div>

        {/* Hamburger Menu Button (Hidden on Desktop) */}
        <div className="text-black text-xl font-bold align-middle md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="#2B1511"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navbar Links (Visible on Desktop) */}
        <div className="wide-screen sm:flex space-x-4">
          <Link
            to="/"
            className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            to="/events"
            className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
          >
            Events
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-[#2B1511] text-lg border-b-2 border-transparent hover:border-[#2B1511] py-2 px-2 transition-all duration-300 ease-in-out"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu (Visible on Mobile) */}
      <div className="bg-[#F2DAB8] w-full">
        <div
          className={`mt-2 ${
            isOpen ? "block" : "hidden"
          } md:hidden text-center m-4 border-t-2`}
        >
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
          >
            About
          </Link>
          <Link
            to="/events"
            onClick={toggleMenu}
            className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
          >
            Events
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block text-[#2B1511] text-lg py-2 px-2 border-b-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;