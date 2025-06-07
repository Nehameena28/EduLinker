
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on new input
  };

  
   const validateForm = () => {
  const { name, email, password, confirmPassword } = formData;

  if (!name || !email || !password || !confirmPassword) {
    return "All fields are required.";
  }

  const nameRegex = /^[a-zA-Z ]{3,}$/;
  if (!nameRegex.test(name)) {
    return "Name must be at least 3 characters and contain only letters and spaces.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }

  if (password.length < 6) {
    return "Password should be at least 6 characters.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null; // All validations passed
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData; // remove confirmPassword
      const res = await axios.post("http://localhost:7000/api/Signup", dataToSend ,   {
      withCredentials: true // ⬅️ IMPORTANT: tells axios to receive cookies
    });
      alert("Signup Successful! Token: " + res.data.token);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-custom-brown mb-6">
          Sign up
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-custom-brown text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-custom-brown text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-custom-brown text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-custom-brown text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-custom-i-berry text-white font-semibold py-3 rounded-lg hover:bg-custom-brown transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="#" className="text-custom-i-berry hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

