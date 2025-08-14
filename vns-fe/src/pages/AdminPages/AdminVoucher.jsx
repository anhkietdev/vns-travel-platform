import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Power,
  Calendar,
  Tag,
  Percent,
  DollarSign,
  Filter,
  X,
} from "lucide-react";

const AdminVoucher = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: "Summer Special",
      code: "SUMMER2024",
      discountType: "percentage",
      value: 20,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
      usageLimit: 100,
      usedCount: 45,
      applicableServices: ["Spa Package", "Massage Therapy"],
    },
    {
      id: 2,
      name: "New Customer Bonus",
      code: "WELCOME50",
      discountType: "amount",
      value: 50,
      startDate: "2024-07-01",
      endDate: "2024-12-31",
      status: "active",
      usageLimit: 500,
      usedCount: 123,
      applicableServices: ["All Services"],
    },
    {
      id: 3,
      name: "Holiday Promo",
      code: "HOLIDAY25",
      discountType: "percentage",
      value: 25,
      startDate: "2024-12-01",
      endDate: "2025-01-15",
      status: "scheduled",
      usageLimit: 200,
      usedCount: 0,
      applicableServices: ["Premium Package", "VIP Service"],
    },
    {
      id: 4,
      name: "Flash Sale",
      code: "FLASH30",
      discountType: "percentage",
      value: 30,
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      status: "expired",
      usageLimit: 50,
      usedCount: 50,
      applicableServices: ["Basic Package"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountType: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    status: "active",
    usageLimit: "",
    applicableServices: [],
  });

  const serviceOptions = [
    "Spa Package",
    "Massage Therapy",
    "Premium Package",
    "VIP Service",
    "Basic Package",
    "Facial Treatment",
    "Body Wrap",
    "Aromatherapy",
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      discountType: "percentage",
      value: "",
      startDate: "",
      endDate: "",
      status: "active",
      usageLimit: "",
      applicableServices: [],
    });
    setEditingVoucher(null);
  };

  const openModal = (voucher = null) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setFormData({
        name: voucher.name,
        code: voucher.code,
        discountType: voucher.discountType,
        value: voucher.value,
        startDate: voucher.startDate,
        endDate: voucher.endDate,
        status: voucher.status,
        usageLimit: voucher.usageLimit,
        applicableServices: voucher.applicableServices,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const generateVoucherCode = () => {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setFormData((prev) => ({ ...prev, code }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.code ||
      !formData.value ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingVoucher) {
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === editingVoucher.id
            ? {
                ...voucher,
                ...formData,
                id: editingVoucher.id,
                usedCount: voucher.usedCount,
              }
            : voucher
        )
      );
    } else {
      const newVoucher = {
        ...formData,
        id: Date.now(),
        usedCount: 0,
      };
      setVouchers((prev) => [...prev, newVoucher]);
    }

    closeModal();
  };

  const handleStatusToggle = (voucher) => {
    const newStatus = voucher.status === "active" ? "inactive" : "active";
    setConfirmAction({
      type: "toggle",
      voucher,
      newStatus,
      message: `Are you sure you want to ${
        newStatus === "active" ? "activate" : "deactivate"
      } this voucher?`,
    });
    setShowConfirmDialog(true);
  };

  const handleDelete = (voucher) => {
    setConfirmAction({
      type: "delete",
      voucher,
      message:
        "Are you sure you want to delete this voucher? This action cannot be undone.",
    });
    setShowConfirmDialog(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction.type === "toggle") {
      setVouchers((prev) =>
        prev.map((v) =>
          v.id === confirmAction.voucher.id
            ? { ...v, status: confirmAction.newStatus }
            : v
        )
      );
    } else if (confirmAction.type === "delete") {
      setVouchers((prev) =>
        prev.filter((v) => v.id !== confirmAction.voucher.id)
      );
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      expired: "bg-red-100 text-red-800 border-red-200",
    };
    return badges[status] || badges.inactive;
  };

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch =
      voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || voucher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      applicableServices: prev.applicableServices.includes(service)
        ? prev.applicableServices.filter((s) => s !== service)
        : [...prev.applicableServices, service],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Voucher Management
            </h1>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={20} />
              Create New Voucher
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search vouchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voucher Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voucher Code / Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVouchers.map((voucher) => (
                  <tr
                    key={voucher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {voucher.name}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                          {voucher.code}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {voucher.discountType === "percentage" ? (
                          <Percent className="text-green-600" size={16} />
                        ) : (
                          <DollarSign className="text-green-600" size={16} />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {voucher.discountType === "percentage"
                            ? `${voucher.value}% off`
                            : `$${voucher.value} off`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(voucher.startDate).toLocaleDateString()} -{" "}
                        {new Date(voucher.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {voucher.usedCount} / {voucher.usageLimit || "∞"}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: voucher.usageLimit
                              ? `${Math.min(
                                  (voucher.usedCount / voucher.usageLimit) *
                                    100,
                                  100
                                )}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                          voucher.status
                        )}`}
                      >
                        {voucher.status.charAt(0).toUpperCase() +
                          voucher.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(voucher)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusToggle(voucher)}
                          className={`p-1 transition-colors ${
                            voucher.status === "active"
                              ? "text-gray-400 hover:text-red-600"
                              : "text-gray-400 hover:text-green-600"
                          }`}
                          title={
                            voucher.status === "active"
                              ? "Deactivate"
                              : "Activate"
                          }
                        >
                          <Power size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(voucher)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingVoucher ? "Edit Voucher" : "Create New Voucher"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Voucher Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Voucher Code *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.code}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              code: e.target.value.toUpperCase(),
                            }))
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={generateVoucherCode}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Type *
                      </label>
                      <select
                        value={formData.discountType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            discountType: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="percentage">Percentage Off</option>
                        <option value="amount">Amount Off</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        value={formData.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step={
                          formData.discountType === "percentage" ? "1" : "0.01"
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usage Limit
                      </label>
                      <input
                        type="number"
                        value={formData.usageLimit}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            usageLimit: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        placeholder="Leave empty for unlimited"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicable Services
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.applicableServices.includes(
                              service
                            )}
                            onChange={() => handleServiceToggle(service)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {editingVoucher ? "Update Voucher" : "Create Voucher"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Action
                </h3>
                <p className="text-gray-600 mb-6">{confirmAction?.message}</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmActionHandler}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVoucher;
