import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.setAttribute('data-auth-page', 'true');
    return () => document.body.removeAttribute('data-auth-page');
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
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
      const res = await axios.post("http://localhost:7000/api/Login", formData, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);

      if (res.data.user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/buyer/dashboard");
      }

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      showToast("Login failed. Please try again.", "error");
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-l-4 border-custom-i-berry">
        
        <div className="flex justify-center mb-6">
          <img src="/i2.png" alt="EDULinker Logo" className="w-16 h-auto" />
        </div>

        <h2 className="text-3xl font-bold text-center text-custom-i-berry mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">Log in to your account</p>

        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-i-berry focus:border-transparent transition"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-4 text-lg cursor-pointer text-custom-i-berry hover:text-custom-brown transition"
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-custom-i-berry to-custom-brown hover:from-custom-brown hover:to-custom-i-berry text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{" "}
          <a href="/Signup" className="text-custom-i-berry font-semibold hover:underline transition">
            Create account
          </a>
        </p>
        
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
};

export default Login;