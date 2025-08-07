import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Check,
  X,
} from "lucide-react";

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "John Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    role: "Admin Manager",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [avatarPreview, setAvatarPreview] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, text: "Very Weak", color: "bg-red-500" },
      { strength: 1, text: "Weak", color: "bg-red-400" },
      { strength: 2, text: "Fair", color: "bg-yellow-400" },
      { strength: 3, text: "Good", color: "bg-yellow-500" },
      { strength: 4, text: "Strong", color: "bg-green-500" },
      { strength: 5, text: "Very Strong", color: "bg-green-600" },
    ];

    return levels[strength] || levels[0];
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);
  const passwordsMatch =
    passwordData.newPassword === passwordData.confirmPassword;

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Handle password update logic here
    alert("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and security settings
          </p>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User size={24} />
            Profile Information
          </h2>

          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avatar Section */}
              <div className="md:col-span-2 flex items-center gap-6">
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Profile Avatar"
                    className="rounded-full w-24 h-24 object-cover border-4 border-gray-200"
                  />
                  <label className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 cursor-pointer hover:bg-teal-700 transition-colors">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-600">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                  <label className="mt-2 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                    <Camera size={16} />
                    Change Avatar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={profileData.role}
                    readOnly
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 text-white rounded-md px-6 py-2 hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="w-full p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={24} />
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{passwordStrength.text}</span>
                      <span>{passwordData.newPassword.length}/32</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        {passwordData.newPassword.length >= 8 ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[a-z]/.test(passwordData.newPassword) ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                        <span>One lowercase letter</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[A-Z]/.test(passwordData.newPassword) ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[0-9]/.test(passwordData.newPassword) ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                        <span>One number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      passwordData.confirmPassword && !passwordsMatch
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {passwordData.confirmPassword && !passwordsMatch && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X size={12} />
                    Passwords do not match
                  </p>
                )}
                {passwordData.confirmPassword && passwordsMatch && (
                  <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                    <Check size={12} />
                    Passwords match
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordsMatch
                }
                className="bg-teal-600 text-white rounded-md px-6 py-2 hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Lock size={16} />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
