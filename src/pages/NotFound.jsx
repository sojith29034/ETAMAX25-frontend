import { FaHome } from "react-icons/fa"; // Import home icon from React Icons

const NotFound = () => {
  return (
    <div className="flex justify-center m-auto">
      <div className="text-center">

        {/* 404 Message */}
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>

        {/* Home Link with Icon */}
        <a
          href="/"
          className="mt-4 inline-block text-blue-500 hover:text-blue-700"
        >
          <FaHome className="inline mr-2" /> Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;