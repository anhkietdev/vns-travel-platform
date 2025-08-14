import React, { useState } from "react";
import {
  Search,
  Eye,
  Ban,
  RotateCcw,
  Key,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

const AdminManagement = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Partner",
      status: "Active",
      avatar: null,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Manager",
      status: "Active",
      avatar: null,
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@business.com",
      role: "Partner",
      status: "Banned",
      avatar: null,
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@partner.com",
      role: "Partner",
      status: "Pending Verification",
      avatar: null,
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@enterprise.com",
      role: "Manager",
      status: "Active",
      avatar: null,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showBanConfirmModal, setShowBanConfirmModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [actionType, setActionType] = useState("");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Filter accounts based on search query and role
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || account.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Banned":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "Pending Verification":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleResetPassword = (account) => {
    setSelectedAccount(account);
    setShowResetPasswordModal(true);
  };

  const handleBanToggle = (account) => {
    setSelectedAccount(account);
    setActionType(account.status === "Banned" ? "restore" : "ban");
    setShowBanConfirmModal(true);
  };

  const confirmBanToggle = () => {
    setAccounts(
      accounts.map((account) =>
        account.id === selectedAccount.id
          ? { ...account, status: actionType === "ban" ? "Banned" : "Active" }
          : account
      )
    );
    setShowBanConfirmModal(false);
    setSelectedAccount(null);
  };

  const submitPasswordReset = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Simulate password reset
    alert(`Password reset successfully for ${selectedAccount.name}`);
    setShowResetPasswordModal(false);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setSelectedAccount(null);
  };

  const handleViewProfile = (account) => {
    alert(`Viewing profile for ${account.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Account Management
          </h1>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Roles</option>
                <option value="Partner">Partner</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          {/* Account List Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            {account.avatar ? (
                              <img
                                src={account.avatar}
                                alt={account.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {getInitials(account.name)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {account.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(account.status)}>
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewProfile(account)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleBanToggle(account)}
                            className={`p-2 rounded-full transition-colors ${
                              account.status === "Banned"
                                ? "text-green-600 hover:text-green-900 hover:bg-green-50"
                                : "text-red-600 hover:text-red-900 hover:bg-red-50"
                            }`}
                            title={
                              account.status === "Banned"
                                ? "Restore Account"
                                : "Ban Account"
                            }
                          >
                            {account.status === "Banned" ? (
                              <RotateCcw className="w-4 h-4" />
                            ) : (
                              <Ban className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleResetPassword(account)}
                            className="text-purple-600 hover:text-purple-900 p-2 rounded-full hover:bg-purple-50 transition-colors"
                            title="Reset Password"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No accounts found matching your search criteria.
            </div>
          )}
        </div>

        {/* Reset Password Modal */}
        {showResetPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reset Password
                </h3>
                <button
                  onClick={() => setShowResetPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Resetting password for:{" "}
                  <span className="font-medium">{selectedAccount?.name}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowResetPasswordModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPasswordReset}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ban/Restore Confirmation Modal */}
        {showBanConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {actionType === "ban" ? "Ban Account" : "Restore Account"}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to {actionType} the account for{" "}
                <span className="font-medium">{selectedAccount?.name}</span>?
                {actionType === "ban" &&
                  " This will prevent them from accessing the platform."}
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBanConfirmModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBanToggle}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    actionType === "ban"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {actionType === "ban" ? "Ban Account" : "Restore Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
