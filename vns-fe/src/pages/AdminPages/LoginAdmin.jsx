import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("admin");
  const navigate = useNavigate();
  const API_URL = "/api/auth/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // if (!form.username || !form.password) {
    //   setError("Please enter both username and password.");
    //   return;
    // }

    // try {
    //   const response = await axios.post(API_URL + "login", {
    //     email: form.username,
    //     passwordHash: form.password,
    //     phoneNumber: "0000000000",
    //   });

    //   const { token, user } = response.data;

    //   if (token) {
    //     localStorage.setItem("authToken", token);
    //   }

    navigate("/Home");
    // } catch (err) {
    //   if (err.response && err.response.status === 401) {
    //     setError("Invalid username or password.");
    //   } else {
    //     setError("Server error. Please try again later.");
    //   }
    // }
  };

  const handleRoleSwitch = (role) => {
    setLoginType(role);
    setError("");
  };

  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#008FA0" }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">VNS Admin</h2>
            <p className="text-gray-600">Secure Administrative Access</p>
          </div>

          {/* Role Switcher */}
          <div className="mb-6">
            <div
              className="flex rounded-xl p-1"
              style={{ backgroundColor: "#E9E9E9" }}
            >
              <button
                onClick={() => handleRoleSwitch("admin")}
                className={`flex-1 py-2 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  loginType === "admin"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Admin Login
              </button>
              <button
                onClick={() => handleRoleSwitch("manager")}
                className={`flex-1 py-2 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  loginType === "manager"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Manager Login
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                style={{
                  "--tw-ring-color": "#008FA0",
                  "--tw-ring-opacity": "0.3",
                }}
                autoComplete="username"
                placeholder={`Enter your ${loginType} username`}
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
                style={{
                  "--tw-ring-color": "#008FA0",
                  "--tw-ring-opacity": "0.3",
                }}
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <div
              onClick={handleSubmit}
              className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-offset-2 cursor-pointer text-center"
              style={{
                backgroundColor: "#008FA0",
                "--tw-ring-color": "#008FA0",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#007A8A")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#008FA0")}
            >
              Sign In as {loginType === "admin" ? "Admin" : "Manager"}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-500">Need Access?</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <a
                href="/LoginPartner"
                className="text-sm font-medium hover:underline transition-colors duration-200"
                style={{ color: "#008FA0" }}
              >
                Partner Login →
              </a>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                System access is monitored and restricted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
