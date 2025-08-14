import React, { useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Eye,
  ChevronRight,
  Star,
  Calendar,
  Building,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data
  const summaryData = [
    {
      title: "Total Partners",
      value: "1,247",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Accounts",
      value: "1,089",
      icon: CheckCircle,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Pending Verifications",
      value: "23",
      icon: Clock,
      color: "bg-yellow-500",
      change: "-5%",
    },
    {
      title: "Total Feedback",
      value: "4,892",
      icon: MessageSquare,
      color: "bg-purple-500",
      change: "+24%",
    },
    {
      title: "Platform Income",
      value: "$287,450",
      icon: DollarSign,
      color: "bg-emerald-500",
      change: "+15%",
    },
  ];

  const recentFeedback = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: "Partner",
      feedback:
        "Excellent platform! The integration process was seamless and customer support is outstanding...",
      rating: 5,
      date: "2025-07-12",
      time: "14:30",
    },
    {
      id: 2,
      name: "TechCorp Solutions",
      type: "Business",
      feedback:
        "Great features but the dashboard could use some UI improvements. Overall satisfied with the service...",
      rating: 4,
      date: "2025-07-12",
      time: "11:45",
    },
    {
      id: 3,
      name: "Mike Chen",
      type: "Partner",
      feedback:
        "Payment processing is fast and reliable. Would recommend to other partners...",
      rating: 5,
      date: "2025-07-11",
      time: "16:20",
    },
    {
      id: 4,
      name: "Digital Dynamics",
      type: "Business",
      feedback:
        "Good platform but needs better mobile responsiveness. Desktop experience is excellent...",
      rating: 4,
      date: "2025-07-11",
      time: "09:15",
    },
  ];

  const pendingPartners = [
    {
      id: 1,
      businessName: "Innovate Solutions LLC",
      contactPerson: "John Smith",
      status: "Pending",
      submittedDate: "2025-07-10",
      type: "Technology",
    },
    {
      id: 2,
      businessName: "Green Energy Co.",
      contactPerson: "Emma Wilson",
      status: "Under Review",
      submittedDate: "2025-07-09",
      type: "Energy",
    },
    {
      id: 3,
      businessName: "Marketing Pro Agency",
      contactPerson: "David Brown",
      status: "Pending",
      submittedDate: "2025-07-08",
      type: "Marketing",
    },
    {
      id: 4,
      businessName: "FinTech Innovations",
      contactPerson: "Lisa Garcia",
      status: "Documentation Required",
      submittedDate: "2025-07-07",
      type: "Finance",
    },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 68000 },
    { month: "Jul", revenue: 72000 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Documentation Required":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {summaryData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {item.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {item.change} from last month
                      </p>
                    </div>
                    <div className={`${item.color} p-3 rounded-full`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Feedback Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Feedback
                </h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800">
                          {feedback.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({feedback.type})
                        </span>
                        <div className="flex items-center ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(feedback.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {feedback.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Verification Snapshot */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Pending Verifications
                </h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  {pendingPartners.length} pending
                </span>
              </div>
              <div className="space-y-3">
                {pendingPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-800">
                          {partner.businessName}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <span>{partner.contactPerson}</span>
                        <span className="mx-2">•</span>
                        <span>{partner.type}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            partner.status
                          )}`}
                        >
                          {partner.status}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(partner.submittedDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Review
                      </button>
                      <button className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profit Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Revenue Overview
              </h3>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15% from last month</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    $287,450
                  </span>
                </div>
                <div className="space-y-2">
                  {monthlyRevenue.slice(-4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        {item.month}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ${item.revenue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Revenue trending upward</p>
                    <p className="text-xs opacity-90">
                      View detailed analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
