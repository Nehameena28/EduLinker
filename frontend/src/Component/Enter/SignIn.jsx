import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const validateForm = () => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return "Enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      const res = await axios.post("http://localhost:7000/api/login", formData);
      alert("Login successful!");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-custom-brown mb-6">
          Sign In
        </h2>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-custom-i-berry text-white font-semibold py-3 rounded-lg hover:bg-custom-brown transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          <a href="/forgot-password" className="text-custom-i-berry hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
