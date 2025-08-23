import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";
import { API_ENDPOINTS } from "../../config/api";

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
      const res = await axios.post(API_ENDPOINTS.LOGIN, formData, {
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
    <div className="h-screen flex bg-slate-900 overflow-hidden">
      {/* Left Side - Image/Pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-custom-blue relative">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center ml-20">
          <div className="mb-8">
            <img src="/i2.png" alt="EDULinker" className="w-24 h-auto cursor-pointer mx-auto" onClick={() => navigate('/')} />
          </div>
          <h2 className="text-4xl font-bold mb-4">Welcome to EDULinker</h2>
          <p className="text-xl text-white/80">Your gateway to knowledge sharing</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <img src="/i2.png" alt="EDULinker" className="w-16 h-auto mx-auto cursor-pointer" onClick={() => navigate('/')} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log In</h2>
            <p className="text-gray-600">Access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-colors outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-colors outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-custom-blue hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
               Log in
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/Signup" className="text-custom-blue hover:opacity-80 font-medium hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Login;