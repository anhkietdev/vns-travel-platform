import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Package,
  Gift,
  Copy,
  BarChart3,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Star,
  Activity,
} from "lucide-react";

const PartnerPromotion = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  // Mock data
  const combosAndPromotions = [
    {
      id: 1,
      type: "combo",
      name: "Ultimate Hanoi Experience",
      description: "Complete 3-day package with hotel, tours, and meals",
      status: "active",
      originalPrice: 2400000,
      currentPrice: 2160000,
      discount: 10,
      validFrom: "2024-01-15",
      validUntil: "2024-12-31",
      bookings: 45,
      revenue: 97200000,
      rating: 4.8,
      services: ["Deluxe Hotel Room", "City Food Tour", "Airport Transfer"],
      created: "2024-01-10",
      lastModified: "2024-01-20",
    },
    {
      id: 2,
      type: "promotion",
      name: "Early Bird Special",
      description: "20% off all bookings made 30 days in advance",
      status: "active",
      promoCode: "EARLY2024",
      discountType: "percentage",
      discountValue: 20,
      minOrderValue: 500000,
      usageLimit: 100,
      usedCount: 23,
      validFrom: "2024-01-01",
      validUntil: "2024-06-30",
      bookings: 23,
      revenue: 45600000,
      applicableServices: "All Services",
      created: "2024-01-05",
      lastModified: "2024-01-15",
    },
    {
      id: 3,
      type: "combo",
      name: "Ho Chi Minh City Explorer",
      description: "2-day city exploration with guided tours",
      status: "draft",
      originalPrice: 1800000,
      currentPrice: 1620000,
      discount: 10,
      validFrom: "2024-02-01",
      validUntil: "2024-11-30",
      bookings: 0,
      revenue: 0,
      rating: 0,
      services: ["City Tour", "Local Restaurant", "Museum Tickets"],
      created: "2024-01-25",
      lastModified: "2024-01-25",
    },
    {
      id: 4,
      type: "promotion",
      name: "Weekend Flash Sale",
      description: "Fixed 200K off weekend bookings",
      status: "expired",
      promoCode: "WEEKEND200",
      discountType: "fixed",
      discountValue: 200000,
      minOrderValue: 1000000,
      usageLimit: 50,
      usedCount: 50,
      validFrom: "2024-01-20",
      validUntil: "2024-01-22",
      bookings: 50,
      revenue: 75000000,
      applicableServices: "Selected Services",
      created: "2024-01-18",
      lastModified: "2024-01-22",
    },
    {
      id: 5,
      type: "combo",
      name: "Mekong Delta Adventure",
      description: "4-day river cruise and cultural immersion",
      status: "paused",
      originalPrice: 3200000,
      currentPrice: 2880000,
      discount: 10,
      validFrom: "2024-03-01",
      validUntil: "2024-10-31",
      bookings: 12,
      revenue: 34560000,
      rating: 4.9,
      services: [
        "River Cruise",
        "Local Homestay",
        "Cooking Class",
        "Transportation",
      ],
      created: "2024-02-01",
      lastModified: "2024-02-15",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "draft":
        return <Clock className="w-4 h-4" />;
      case "paused":
        return <AlertCircle className="w-4 h-4" />;
      case "expired":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredItems = combosAndPromotions.filter((item) => {
    if (activeTab !== "all" && item.type !== activeTab) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    totalItems: combosAndPromotions.length,
    active: combosAndPromotions.filter((item) => item.status === "active")
      .length,
    totalBookings: combosAndPromotions.reduce(
      (sum, item) => sum + item.bookings,
      0
    ),
    totalRevenue: combosAndPromotions.reduce(
      (sum, item) => sum + item.revenue,
      0
    ),
  };

  return (
    <div className="min-h-screen bg-bg-light p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Combos & Promotions
            </h1>
            <p className="text-gray-600">
              Manage your service packages and promotional offers
            </p>
          </div>
          <button className="bg-[--color-primary] text-white px-4 py-2 rounded-lg hover:bg-[--color-primary-hover] flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalItems}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-[--color-primary]">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "all"
                    ? "bg-[--color-primary] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({combosAndPromotions.length})
              </button>
              <button
                onClick={() => setActiveTab("combo")}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  activeTab === "combo"
                    ? "bg-[--color-primary] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Combos (
                {
                  combosAndPromotions.filter((item) => item.type === "combo")
                    .length
                }
                )
              </button>
              <button
                onClick={() => setActiveTab("promotion")}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  activeTab === "promotion"
                    ? "bg-[--color-primary] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Gift className="w-4 h-4 mr-2" />
                Promotions (
                {
                  combosAndPromotions.filter(
                    (item) => item.type === "promotion"
                  ).length
                }
                )
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search combos and promotions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            >
              <option value="created">Sort by Created</option>
              <option value="name">Sort by Name</option>
              <option value="bookings">Sort by Bookings</option>
              <option value="revenue">Sort by Revenue</option>
            </select>
          </div>
        </div>

        {/* Items Grid/List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {item.type === "combo" ? (
                      <Package className="w-5 h-5 text-[--color-primary]" />
                    ) : (
                      <Gift className="w-5 h-5 text-[--color-primary]" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status}</span>
                    </span>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Pricing/Discount Info */}
                {item.type === "combo" ? (
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-[--color-primary]">
                          {formatPrice(item.currentPrice)}
                        </span>
                        {item.originalPrice !== item.currentPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      {item.discount > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          {item.discount}% off
                        </span>
                      )}
                    </div>
                    {item.rating > 0 && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          {item.rating}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                        {item.promoCode}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.discountType === "percentage" ? (
                        <span className="flex items-center">
                          <Percent className="w-3 h-3 mr-1" />
                          {item.discountValue}% discount
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {formatPrice(item.discountValue)} off
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Used: {item.usedCount}/{item.usageLimit}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {item.bookings}
                    </div>
                    <div className="text-xs text-gray-500">Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[--color-primary]">
                      {formatPrice(item.revenue)}
                    </div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>

                {/* Validity Period */}
                <div className="text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Valid: {new Date(
                      item.validFrom
                    ).toLocaleDateString()} -{" "}
                    {new Date(item.validUntil).toLocaleDateString()}
                  </div>
                </div>

                {/* Services (for combos) */}
                {item.type === "combo" && item.services && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Included Services:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.services.slice(0, 2).map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {service}
                        </span>
                      ))}
                      {item.services.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                          +{item.services.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Applicable Services (for promotions) */}
                {item.type === "promotion" && item.applicableServices && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Applicable to:
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {item.applicableServices}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[--color-primary] hover:bg-white rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[--color-primary] hover:bg-white rounded">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[--color-primary] hover:bg-white rounded">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.status === "active" && (
                      <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200">
                        Pause
                      </button>
                    )}
                    {(item.status === "draft" || item.status === "paused") && (
                      <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200">
                        Activate
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === "combo" ? (
                <Package className="w-8 h-8 text-gray-400" />
              ) : activeTab === "promotion" ? (
                <Gift className="w-8 h-8 text-gray-400" />
              ) : (
                <Activity className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {activeTab === "all" ? "items" : activeTab + "s"} found
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus !== "all"
                ? `No ${
                    activeTab === "all" ? "items" : activeTab + "s"
                  } with status "${filterStatus}"`
                : `Create your first ${
                    activeTab === "all" ? "combo or promotion" : activeTab
                  } to get started`}
            </p>
            <button className="bg-[--color-primary] text-white px-4 py-2 rounded-lg hover:bg-[--color-primary-hover] flex items-center mx-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create {activeTab === "all" ? "New Item" : activeTab}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerPromotion;
