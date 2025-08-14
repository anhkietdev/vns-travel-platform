import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Car,
  Camera,
  MessageSquare,
  CreditCard,
} from "lucide-react";

const PartnerBookingDetails = () => {
  const [activeTab, setActiveTab] = useState("details");

  // Mock booking data updated for Oceanview Homestay
  const booking = {
    bookingId: "BK-2024-001",
    bookingReference: "VNS-HCM-240815-001",
    bookingType: "Homestay", // Homestay, Tour, Vehicle Rental
    bookingStatus: "pending",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    totalAmount: 3200000, // VND
    depositAmount: 640000, // VND
    remainingAmount: 2560000, // VND
    numberOfGuests: 6,
    specialRequests:
      "Early check-in preferred if possible, please confirm pool access details",
    createdAt: "2024-08-10T14:20:00",
    updatedAt: "2024-08-10T15:45:00",

    // Customer information
    customer: {
      fullName: "Tran Thi Thuy",
      email: "thuy.tran@email.com",
      phoneNumber: "+84 912 345 678",
      avatarUrl: "https://via.placeholder.com/100",
    },

    // Homestay booking details
    homestayBooking: {
      checkInDate: "2024-08-20T15:00:00",
      checkOutDate: "2024-08-25T11:00:00",
      nights: 5,
      adults: 4,
      children: 2,
      roomRate: 500000, // VND per night
      cleaningFee: 200000, // VND
      serviceFee: 300000, // VND
      totalAccommodationCost: 3200000, // VND
      hostApprovalRequired: true,
      hostApprovedAt: "2024-08-10T15:45:00",
    },

    // Service and location info - Updated for Oceanview Homestay
    service: {
      title: "Oceanview Homestay - Luxury Apartment with River View",
      serviceType: "Homestay",
      location: {
        name: "Saigon Riverside",
        address:
          "123 Nguyen Hue Street, Ben Nghe Ward, District 1, Ho Chi Minh City",
        city: "Ho Chi Minh City",
        district: "District 1",
        ward: "Ben Nghe Ward",
      },
    },

    // Room details - Updated for Oceanview Homestay
    room: {
      roomName: "Premium 3-Bedroom River View Suite",
      maxOccupancy: 6,
      bedType: "3 King beds",
      privateBathroom: true,
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Fully equipped kitchen",
        "Washing machine",
        "Balcony with river view",
        "City view",
      ],
    },

    // Payment history
    payments: [
      {
        paymentId: "PAY-001",
        amount: 640000,
        paymentType: "deposit",
        paymentTime: "2024-08-10T14:35:00",
        transactionId: "TXN-VNP-240810-001",
        paymentMethod: "credit_card",
        paymentStatus: "completed",
      },
      {
        paymentId: "PAY-002",
        amount: 2560000,
        paymentType: "balance",
        paymentTime: "2024-08-18T10:00:00",
        transactionId: "TXN-VNP-240818-002",
        paymentMethod: "credit_card",
        paymentStatus: "completed",
      },
    ],
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* <button className="flex items-center text-[#008fa0] hover:text-[#007a8a] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking Management
          </button> */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Booking Details
              </h1>
              <p className="text-gray-600 mt-1">
                Booking Reference: {booking.bookingReference}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                  booking.bookingStatus
                )}`}
              >
                {booking.bookingStatus.charAt(0).toUpperCase() +
                  booking.bookingStatus.slice(1)}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(booking.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "details", label: "Booking Details", icon: FileText },
                { key: "customer", label: "Customer Info", icon: User },
                { key: "payments", label: "Payment History", icon: CreditCard },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.key
                        ? "border-[#008fa0] text-[#008fa0]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Booking Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Service Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <Home className="h-5 w-5 text-[#008fa0] mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Service Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Service Name
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.service.title}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Service Type
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.service.serviceType}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1 flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-900">
                          {booking.service.location.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Homestay Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-[#008fa0] mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Stay Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Check-in Date
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDateOnly(booking.homestayBooking.checkInDate)}
                      </p>
                      <p className="text-xs text-gray-500">3:00 PM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Check-out Date
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDateOnly(booking.homestayBooking.checkOutDate)}
                      </p>
                      <p className="text-xs text-gray-500">11:00 AM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nights
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.homestayBooking.nights} nights
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Adults
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.homestayBooking.adults} adults
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Children
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.homestayBooking.children} children
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Guests
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.numberOfGuests} guests
                      </p>
                    </div>
                  </div>
                </div>

                {/* Room Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Room Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Room Name
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.room.roomName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bed Type
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.room.bedType}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Occupancy
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.room.maxOccupancy} guests
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Private Bathroom
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {booking.room.privateBathroom ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Room Amenities
                      </label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {booking.room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="h-5 w-5 text-[#008fa0] mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Special Requests
                      </h3>
                    </div>
                    <p className="text-sm text-gray-900">
                      {booking.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Customer Info Tab */}
            {activeTab === "customer" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 text-[#008fa0] mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Customer Information
                  </h3>
                </div>
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={booking.customer.avatarUrl}
                    alt={booking.customer.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">
                      {booking.customer.fullName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Customer since August 2024
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="text-sm text-gray-900">
                          {booking.customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <p className="text-sm text-gray-900">
                          {booking.customer.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Booking History
                      </label>
                      <p className="text-sm text-gray-900">
                        1 previous booking
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Customer Rating
                      </label>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">5.0/5.0</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (3 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History Tab */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-[#008fa0] mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Payment History
                    </h3>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {booking.payments.map((payment) => (
                        <tr key={payment.paymentId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.paymentId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {payment.paymentType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {payment.paymentMethod.replace("_", " ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(payment.paymentTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                payment.paymentStatus
                              )}`}
                            >
                              {payment.paymentStatus.charAt(0).toUpperCase() +
                                payment.paymentStatus.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {booking.bookingStatus === "pending" && (
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </button>
                )}
                {booking.bookingStatus !== "cancelled" &&
                  booking.bookingStatus !== "completed" && (
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </button>
                  )}
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Customer
                </button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Room Rate ({booking.homestayBooking.nights} nights @{" "}
                    {formatCurrency(booking.homestayBooking.roomRate)}/night)
                  </span>
                  <span className="text-gray-900">
                    {formatCurrency(
                      booking.homestayBooking.roomRate *
                        booking.homestayBooking.nights
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cleaning Fee</span>
                  <span className="text-gray-900">
                    {formatCurrency(booking.homestayBooking.cleaningFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">
                    {formatCurrency(booking.homestayBooking.serviceFee)}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deposit Paid</span>
                  <span className="text-green-600">
                    {formatCurrency(booking.depositAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining Balance</span>
                  <span className="text-gray-900">
                    {formatCurrency(booking.remainingAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Booking Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Booking Created
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Host Approved
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking.homestayBooking.hostApprovedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Check-in Date
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateOnly(booking.homestayBooking.checkInDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBookingDetails;
