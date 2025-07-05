
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

      if (res.data.user.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/buyer");
      }

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06687A] px-3">
      <div className="w-full max-w-sm bg-white rounded-md shadow-md p-5 border-t-4 border-[#0A6E86] flex flex-col justify-center relative">
        <div className="absolute top-0 left-0 w-full h-1 rounded-t bg-[#643c2c]"></div>

        <div className="flex justify-center mb-3">
          <img src="/i2.png" alt="EDULinker Logo" className="w-10 h-auto" />
        </div>

        <h2 className="text-xl font-semibold text-center text-custom-brown mb-2">
          Log In
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Email */}
          <div>
            <label className="block font-medium text-[#12192c]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded bg-gray-100 border border-[#0A6E86] focus:ring-1 focus:ring-[#0A6E86] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-[#12192c]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 rounded bg-gray-100 border border-[#0A6E86] focus:ring-1 focus:ring-[#0A6E86] focus:outline-none"
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

          <button
            type="submit"
            className="w-full bg-[#0A6E86] hover:bg-[#05596B] text-white font-medium py-2 rounded transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-[#12192c] mt-4">
          Don’t have an account?{" "}
          <a href="/Signup" className="text-[#0A6E86] font-semibold hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
