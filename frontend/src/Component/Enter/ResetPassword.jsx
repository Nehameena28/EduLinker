import { useState } from "react";
import axios from "axios";

const ResetPassword = ({ token }) => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    try {
      const res = await axios.post(`http://localhost:7000/api/reset-password/${token}`, {
        password,
      });
      setMsg("Password has been reset successfully.");
    } catch (err) {
      setError("Reset failed. Invalid or expired token.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-custom-brown mb-6">
          Reset Password
        </h2>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
        {msg && <div className="text-green-600 text-sm text-center mb-4">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-custom-brown text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-custom-i-berry text-white font-semibold py-3 rounded-lg hover:bg-custom-brown transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
