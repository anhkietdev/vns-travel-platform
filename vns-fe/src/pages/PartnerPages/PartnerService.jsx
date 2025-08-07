import React, { useState } from "react";

const PartnerService = () => {
  const [activeTab, setActiveTab] = useState("services");

  const services = [
    {
      id: 1,
      name: "Morden LeParc Hotel & Spa",
      category: "Accommodation",
      price: 150,
      availability: "Available",
      rating: 4.8,
      bookings: 23,
      status: "Active",
    },
    {
      id: 2,
      name: "Small-Group Tour of the Cu Chi Tunnels",
      category: "Tours",
      price: 45,
      availability: "Limited",
      rating: 4.6,
      bookings: 47,
      status: "Active",
    },
    {
      id: 3,
      name: "Airport Transfer",
      category: "Transportation",
      price: 25,
      availability: "Available",
      rating: 4.9,
      bookings: 89,
      status: "Active",
    },
  ];

  const combos = [
    {
      id: 1,
      name: "Weekend Getaway Package",
      services: ["Deluxe Ocean View Room", "City Walking Tour"],
      originalPrice: 195,
      comboPrice: 170,
      savings: 25,
      bookings: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Complete Travel Experience",
      services: [
        "Deluxe Ocean View Room",
        "City Walking Tour",
        "Airport Transfer",
      ],
      originalPrice: 220,
      comboPrice: 185,
      savings: 35,
      bookings: 8,
      status: "Active",
    },
  ];

  const promotions = [
    {
      id: 1,
      name: "Summer Special",
      type: "Percentage",
      discount: 20,
      validFrom: "2025-06-01",
      validTo: "2025-08-31",
      applicableServices: ["Deluxe Ocean View Room"],
      status: "Active",
      usageCount: 15,
    },
    {
      id: 2,
      name: "Early Bird Discount",
      type: "Fixed Amount",
      discount: 30,
      validFrom: "2025-06-15",
      validTo: "2025-07-15",
      applicableServices: ["City Walking Tour", "Airport Transfer"],
      status: "Active",
      usageCount: 8,
    },
  ];

  const tabs = [
    {
      id: "services",
      label: "Individual Services",
      //   icon: (

      //   ),
    },
    {
      id: "combos",
      label: "Service Combos",
      //   icon: (

      //   ),
    },
    {
      id: "promotions",
      label: "Promotions",
      //   icon: (

      //   ),
    },
  ];

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {service.name}
          </h3>
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mt-2">
            {service.category}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-0 left-1 w-2 h-3 border-2 border-current border-b-0"></div>
              <div className="absolute bottom-0 left-0.5 w-3 h-1 border-2 border-current border-t-0"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-1 left-0.5 w-3 h-2 border-2 border-current rounded-t"></div>
              <div className="absolute bottom-0 left-0 w-4 h-2 border-2 border-current rounded-b"></div>
              <div className="absolute top-0 left-1.5 w-1 h-1 border border-current"></div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-gray-400 font-bold text-xs flex items-center justify-center">
            $
          </div>
          <span className="text-gray-900 font-medium">${service.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-yellow-400 relative">
            <div className="absolute inset-0 transform rotate-12">
              <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-current"></div>
            </div>
            <div className="absolute top-1.5 left-0.5 w-3 h-1.5 bg-current clip-polygon-star"></div>
          </div>
          <span className="text-gray-700">{service.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center text-gray-400">
            <div className="flex space-x-0.5">
              <div className="w-1 h-2 bg-current rounded-full"></div>
              <div className="w-1 h-2 bg-current rounded-full"></div>
            </div>
          </div>
          <span className="text-gray-700">{service.bookings} bookings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-0.5 bg-gray-400"></div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              service.availability === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {service.availability}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            service.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {service.status}
        </span>
      </div>
    </div>
  );

  const ComboCard = ({ combo }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{combo.name}</h3>
          <div className="mt-2">
            {combo.services.map((service, index) => (
              <span
                key={index}
                className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm mr-2 mb-1"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-0 left-1 w-2 h-3 border-2 border-current border-b-0"></div>
              <div className="absolute bottom-0 left-0.5 w-3 h-1 border-2 border-current border-t-0"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-1 left-0.5 w-3 h-2 border-2 border-current rounded-t"></div>
              <div className="absolute bottom-0 left-0 w-4 h-2 border-2 border-current rounded-b"></div>
              <div className="absolute top-0 left-1.5 w-1 h-1 border border-current"></div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-500">Original Price</span>
          <p className="text-gray-500 line-through">${combo.originalPrice}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Combo Price</span>
          <p className="text-lg font-semibold text-[#008fa0]">
            ${combo.comboPrice}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-green-500 relative">
            <div className="absolute inset-0 border-2 border-current rounded transform rotate-45"></div>
            <div className="absolute top-1 left-1.5 w-1 h-1 bg-current rounded-full"></div>
          </div>
          <span className="text-green-600 font-medium">
            Save ${combo.savings}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center text-gray-400">
            <div className="flex space-x-0.5">
              <div className="w-1 h-2 bg-current rounded-full"></div>
              <div className="w-1 h-2 bg-current rounded-full"></div>
            </div>
          </div>
          <span className="text-gray-700">{combo.bookings} bookings</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            combo.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {combo.status}
        </span>
      </div>
    </div>
  );

  const PromotionCard = ({ promotion }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {promotion.name}
          </h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${
              promotion.type === "Percentage"
                ? "bg-purple-100 text-purple-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {promotion.type === "Percentage"
              ? `${promotion.discount}% OFF`
              : `$${promotion.discount} OFF`}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-[#008fa0] hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-0 left-1 w-2 h-3 border-2 border-current border-b-0"></div>
              <div className="absolute bottom-0 left-0.5 w-3 h-1 border-2 border-current border-t-0"></div>
            </div>
          </button>
          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-4 h-4 relative">
              <div className="absolute top-1 left-0.5 w-3 h-2 border-2 border-current rounded-t"></div>
              <div className="absolute bottom-0 left-0 w-4 h-2 border-2 border-current rounded-b"></div>
              <div className="absolute top-0 left-1.5 w-1 h-1 border border-current"></div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-500">Valid From</span>
          <p className="text-gray-900">
            {new Date(promotion.validFrom).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Valid To</span>
          <p className="text-gray-900">
            {new Date(promotion.validTo).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center text-gray-400">
            <div className="flex space-x-0.5">
              <div className="w-1 h-2 bg-current rounded-full"></div>
              <div className="w-1 h-2 bg-current rounded-full"></div>
            </div>
          </div>
          <span className="text-gray-700">{promotion.usageCount} uses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
          <span className="text-gray-700">
            {promotion.applicableServices.length} services
          </span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-sm text-gray-500 block mb-2">
          Applicable Services:
        </span>
        <div className="flex flex-wrap gap-1">
          {promotion.applicableServices.map((service, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            promotion.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {promotion.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 pt-6">
            Services Management
          </h1>
          <p className="text-gray-600">
            Manage your services, create combos, and set up promotions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Combos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {combos.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Live Promotions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {promotions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">159</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#008fa0] text-[#008fa0]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "services" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Individual Services
                  </h2>
                  <button className="bg-[#008fa0] text-white px-4 py-2 rounded-lg hover:bg-[#007a8a] transition-colors flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <div className="absolute top-0 left-1.5 w-1 h-4 bg-white"></div>
                      <div className="absolute top-1.5 left-0 w-4 h-1 bg-white"></div>
                    </div>
                    Add New Service
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "combos" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Service Combos
                  </h2>
                  <button className="bg-[#008fa0] text-white px-4 py-2 rounded-lg hover:bg-[#007a8a] transition-colors flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <div className="absolute top-0 left-1.5 w-1 h-4 bg-white"></div>
                      <div className="absolute top-1.5 left-0 w-4 h-1 bg-white"></div>
                    </div>
                    Create New Combo
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {combos.map((combo) => (
                    <ComboCard key={combo.id} combo={combo} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "promotions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Promotions & Discounts
                  </h2>
                  <button className="bg-[#008fa0] text-white px-4 py-2 rounded-lg hover:bg-[#007a8a] transition-colors flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <div className="absolute top-0 left-1.5 w-1 h-4 bg-white"></div>
                      <div className="absolute top-1.5 left-0 w-4 h-1 bg-white"></div>
                    </div>
                    Create New Promotion
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {promotions.map((promotion) => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerService;
