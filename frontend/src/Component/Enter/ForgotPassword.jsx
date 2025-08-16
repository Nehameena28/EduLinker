import { useState } from "react";
import axios from "axios";
import { useToast } from "../Toast/useToast";
import ToastContainer from "../Toast/ToastContainer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { toasts, showToast, removeToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/api/forgot-password", { email });
      setMsg("Password reset email sent!");
      showToast("Password reset email sent!", "success");
    } catch (err) {
      setError("Failed to send reset email.");
      showToast("Failed to send reset email.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-custom-brown mb-6">
          Forgot Password
        </h2>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
        {msg && <div className="text-green-600 text-sm text-center mb-4">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-custom-brown text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-100 border border-custom-i-berry text-gray-800 focus:ring-2 focus:ring-custom-i-berry focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-i-berry text-white font-semibold py-3 rounded-lg hover:bg-custom-brown transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ForgotPassword;
