import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login`,
        {
          rollNumber,
          password,
        }
      );
      // Save token or user details in local storage or context
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      setError("Invalid roll number or password");
    }
  };

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="m-3 w-full max-w-md p-6 border-3 border-[#2B1511] rounded-lg shadow-3xl">
        <h2 className="text-2xl font-semibold text-center text-[#2B1511]">
          Login
        </h2>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="rollNumber"
              className="block text-[#2B1511] text-lg font-medium"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-[#2B1511] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B1511]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[#2B1511] text-lg font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-[#2B1511] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B1511]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#2B1511] text-white text-lg font-semibold rounded-md hover:bg-[#3c1c0b] transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;