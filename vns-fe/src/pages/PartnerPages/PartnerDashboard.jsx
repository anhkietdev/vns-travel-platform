import React from "react";
import {
  Calendar,
  Package,
  Gift,
  Megaphone,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PartnerDashboard = () => {
  // Sample data - in a real app, this would come from your API
  const partnerData = {
    name: "Sarah Johnson",
    businessName: "Wellness Spa & Salon",
    stats: {
      totalServices: 24,
      activeCombos: 8,
      livePromotions: 3,
      totalBookings: 142,
      totalRevenue: 28750,
    },
    recentBookings: [
      {
        id: 1,
        customer: "Emma Wilson",
        service: "Full Body Massage",
        time: "2:00 PM",
        status: "confirmed",
      },
      {
        id: 2,
        customer: "Michael Chen",
        service: "Hair & Beard Combo",
        time: "3:30 PM",
        status: "pending",
      },
      {
        id: 3,
        customer: "Lisa Rodriguez",
        service: "Facial Treatment",
        time: "4:00 PM",
        status: "confirmed",
      },
      {
        id: 4,
        customer: "David Kim",
        service: "Wellness Package",
        time: "5:00 PM",
        status: "confirmed",
      },
    ],
  };

  const StatCard = ({ icon: Icon, number, label, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
      emerald: "bg-emerald-50 text-emerald-600",
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {number.toLocaleString()}
            </p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const BookingItem = ({ booking }) => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const StatusIcon =
      booking.status === "confirmed" ? CheckCircle : AlertCircle;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <User className="w-8 h-8 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{booking.customer}</p>
            <p className="text-sm text-gray-600">{booking.service}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{booking.time}</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[booking.status]
              }`}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {booking.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                {partnerData.businessName}
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {partnerData.name}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Package}
            number={partnerData.stats.totalServices}
            label="Total Services"
            color="blue"
          />
          <StatCard
            icon={Gift}
            number={partnerData.stats.activeCombos}
            label="Active Combos"
            color="purple"
          />
          <StatCard
            icon={Megaphone}
            number={partnerData.stats.livePromotions}
            label="Live Promotions"
            color="orange"
          />
          <StatCard
            icon={Calendar}
            number={partnerData.stats.totalBookings}
            label="Total Bookings"
            color="green"
          />
          <StatCard
            icon={DollarSign}
            number={partnerData.stats.totalRevenue}
            label="Total Revenue"
            color="emerald"
          />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Bookings
                </h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {partnerData.recentBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                  <Gift className="w-4 h-4 mr-2" />
                  Manage Promotions
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </button>
              </div>
            </div>

            {/* Performance Insight */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                This Week
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bookings</span>
                  <span className="text-sm font-medium text-green-600">
                    +12%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-medium text-green-600">
                    +8%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Customers</span>
                  <span className="text-sm font-medium text-blue-600">
                    +15%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
