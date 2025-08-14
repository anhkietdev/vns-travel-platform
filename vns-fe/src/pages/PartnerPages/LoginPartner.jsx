import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPartner = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = "/api/auth/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // if (!form.email || !form.password) {
    //   setError("Please enter both email and password.");
    //   return;
    // }

    // try {
    //   const response = await axios.post(API_URL + "login", {
    //     email: form.email,
    //     passwordHash: form.password,
    //     phoneNumber: "000000000",
    //   });

    navigate("/PartnerService");
    // } catch (err) {
    //   setError(
    //     err.response?.data?.message || "Invalid credentials or server error."
    //   );
    // }
  };

  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-primary w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              VNS Partner
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                autoComplete="email"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-offset-2 text-center"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-500">New Partner?</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <a
                href="/ForgotPassword"
                className="text-primary text-sm font-medium hover:underline transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact your administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPartner;
