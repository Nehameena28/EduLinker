import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
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
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await axios.post("http://localhost:7000/api/Signup", dataToSend, {
        withCredentials: true,
      });
      // alert("Signup Successful! Token: " + res.data.token);
      // Save user and token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.user.role === "seller") {
        navigate("/seller");
      } else if (res.data.user.role === "buyer") {
        navigate("/buyer");
      }

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06687A] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 border-t-[6px] border-[#0A6E86] flex flex-col justify-center relative">
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-xl bg-[#643c2c]"></div>

        <div className="flex justify-center mb-6">
          <img src="/i2.png" alt="EDULinker Logo" className="w-16 h-auto" />
        </div>

        <h2 className="text-3xl font-bold text-center text-custom-brown mb-2">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#12192c]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-[#0A6E86] focus:ring-2 focus:ring-[#0A6E86] focus:outline-none transition-all duration-200 hover:shadow-md"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#12192c]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-[#0A6E86] focus:ring-2 focus:ring-[#0A6E86] focus:outline-none transition-all duration-200 hover:shadow-md"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#12192c]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-[#0A6E86] focus:ring-2 focus:ring-[#0A6E86] focus:outline-none transition-all duration-200 hover:shadow-md"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-sm cursor-pointer text-[#0A6E86]"
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#12192c]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-[#0A6E86] focus:ring-2 focus:ring-[#0A6E86] focus:outline-none transition-all duration-200 hover:shadow-md"
                placeholder="Confirm your password"
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 right-3 text-sm cursor-pointer text-[#0A6E86]"
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-[#12192c]">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-[#0A6E86] focus:ring-2 focus:ring-[#0A6E86] focus:outline-none transition-all duration-200 hover:shadow-md"
              required
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A6E86] hover:bg-[#05596B] text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-[#12192c] mt-6">
          Already have an account?{" "}
          <a href="/Login" className="text-[#0A6E86] font-semibold hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
