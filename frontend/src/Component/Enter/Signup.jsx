
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.setAttribute('data-auth-page', 'true');
    return () => document.body.removeAttribute('data-auth-page');
  }, []);

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

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("email", res.data.user.email); // ✅ Save email for upload



      if (res.data.user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/buyer/dashboard");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border-l-4 border-custom-i-berry">
        
        <div className="flex justify-center mb-4">
          <img src="/i2.png" alt="EDULinker Logo" className="w-12 h-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-custom-i-berry mb-1">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">Join our community today</p>

        {error && <p className="text-red-500 text-sm text-center mb-3 bg-red-50 p-2 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
                placeholder="Create a password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-lg cursor-pointer text-custom-i-berry hover:text-custom-brown transition"
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
                placeholder="Confirm your password"
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 right-3 text-lg cursor-pointer text-custom-i-berry hover:text-custom-brown transition"
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
              required
            >
              <option value="">Select your role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-custom-i-berry to-custom-brown hover:from-custom-brown hover:to-custom-i-berry text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/Login" className="text-custom-i-berry font-semibold hover:underline transition">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
