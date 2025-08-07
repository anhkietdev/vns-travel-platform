import React, { useState } from "react";

const PartnerBooking = () => {
  const [activeTab, setActiveTab] = useState("all");

  const bookings = [
    {
      id: "01",
      customerName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      serviceType: "Tour Booking",
      bookingDate: "2024-03-15",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "confirmed",
      amount: 150.0,
      address: "123 Main St, New York, NY",
      notes: "Please bring eco-friendly products",
    },
    {
      id: "02",
      customerName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      serviceType: "Ha Noi To HCM Flight",
      bookingDate: "2024-03-16",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: 80.0,
      address: "456 Oak Ave, Brooklyn, NY",
      notes: "",
    },
    {
      id: "03",
      customerName: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+1 (555) 456-7890",
      serviceType: "Fun Tour",
      bookingDate: "2024-03-14",
      timeSlot: "9:00 AM - 1:00 PM",
      status: "confirmed",
      amount: 200.0,
      address: "789 Pine St, Queens, NY",
      notes: "Customer very satisfied",
    },
    {
      id: "04",
      customerName: "Emily Wilson",
      email: "emily.w@email.com",
      phone: "+1 (555) 321-0987",
      serviceType: "Cu Chi Tunnels Tour",
      bookingDate: "2024-03-13",
      timeSlot: "11:00 AM - 1:00 PM",
      status: "cancelled",
      amount: 120.0,
      address: "321 Elm St, Manhattan, NY",
      notes: "Cancelled due to weather",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeTab);

  const handleConfirmBooking = (bookingId) => {};

  const handleCancelBooking = (bookingId) => {};

  const handleRefundProcess = (bookingId, amount) => {
    setShowRefundModal(false);
  };

  const CalendarIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const EyeIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const FilterIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const StatCard = ({ title, value, icon: Icon, bgColor = "bg-gray-50" }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div
          className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center pt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Management
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage your service bookings
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={CalendarIcon}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Pending"
            value={bookings.filter((b) => b.status === "pending").length}
            icon={CalendarIcon}
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Confirmed"
            value={bookings.filter((b) => b.status === "confirmed").length}
            icon={CalendarIcon}
            bgColor="bg-green-50"
          />
          {/* <StatCard
            title="Refunds"
            value={3}
            icon={CalendarIcon}
            bgColor="bg-red-50"
          /> */}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Bookings" },
                { key: "pending", label: "Pending" },
                { key: "confirmed", label: "Confirmed" },
                { key: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? "border-[#008fa0] text-[#008fa0]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {activeTab === "all"
                  ? "All Bookings"
                  : `${
                      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    } Bookings`}
              </h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.bookingDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.timeSlot}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${booking.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-[#008fa0] hover:text-[#007a8a]"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        {(booking.status === "confirmed" ||
                          booking.status === "pending") && (
                          <button
                            onClick={() => setShowModifyModal(true)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Modify
                          </button>
                        )}
                        {booking.status !== "cancelled" &&
                          booking.status !== "completed" && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBooking;
