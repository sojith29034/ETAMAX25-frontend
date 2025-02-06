import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/students`,
        formData
      );

      if (response.status === 200) {
        alert(
          `${response.data.student.rollNumber} registered successfully. Check ${response.data.student.email} inbox`
        );
        setFormData({ name: "", rollNumber: "", email: "" });
      } else {
        setError("Failed to save data");
      }
    } catch (error) {
        setError("Error saving data");
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="m-3 w-full max-w-md p-6 border-3 border-[#2B1511] rounded-lg shadow-3xl">
        <h2 className="text-2xl font-semibold text-center text-[#2B1511]">
          Register
        </h2>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {isLoading ? (
          <div className="text-center mt-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2B1511]"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[#2B1511] text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-[#2B1511] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B1511]"
              />
            </div>

            <div>
              <label className="block text-[#2B1511] text-lg font-medium">
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-[#2B1511] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B1511]"
              />
            </div>

            <div>
              <label className="block text-[#2B1511] text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-[#2B1511] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B1511]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#2B1511] text-white text-lg font-semibold rounded-md hover:bg-[#3c1c0b] transition-colors duration-300"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
