// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
        </li>
        <li>
          <Link to="/event" className="text-white hover:text-gray-200">Event</Link>
        </li>
        <li>
          <Link to="/eventlist" className="text-white hover:text-gray-200">Event List</Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
        </li>
        <li>
          <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;