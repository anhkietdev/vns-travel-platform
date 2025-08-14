import React, { useState } from "react";
import { Plus, Edit2, Trash2, Eye, MoreVertical } from "lucide-react";
import PartnerServiceModal from "../../components/PartnerServiceModal";
import { useNavigate } from "react-router-dom";

const PartnerService = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "Oceanview Homestay", type: "rental", status: "active" },
    {
      id: 2,
      title: "Hanoi Street Food Tour",
      type: "tour",
      status: "inactive",
    },
    { id: 3, title: "7-Seater SUV Rental", type: "car", status: "active" },
    { id: 4, title: "Mountain View Villa", type: "rental", status: "active" },
    { id: 5, title: "Mekong Delta Adventure", type: "tour", status: "active" },
    { id: 6, title: "Luxury Sedan Rental", type: "car", status: "inactive" },
    { id: 7, title: "Beachfront Apartment", type: "rental", status: "active" },
    {
      id: 8,
      title: "Cultural Heritage Walk",
      type: "tour",
      status: "inactive",
    },
  ];

  const filterTabs = ["All", "Rental", "Tour", "Car Rental"];

  const filteredServices = services.filter((service) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Rental") return service.type === "rental";
    if (activeFilter === "Tour") return service.type === "tour";
    if (activeFilter === "Car Rental") return service.type === "car";
    return true;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  const getTypeDisplay = (type) => {
    const typeMap = {
      rental: "Rental",
      tour: "Tour",
      car: "Car Rental",
    };
    return typeMap[type] || type;
  };

  const handleAddNewService = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDetail = () => {
    navigate("/PartnerService/detail");
  };

  return (
    <div className="min-h-screen bg-bg-light p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Services
            </h1>
            <p className="text-gray-600">
              Manage your rental properties, tours, and vehicle rentals
            </p>
          </div>

          {/* Add New Service Button */}
          <button
            onClick={handleAddNewService}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--color-primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--color-primary)")
            }
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Service
          </button>
        </div>

        {/* Service Stats */}
        {filteredServices.length > 0 && (
          <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {services.filter((s) => s.status === "active").length}
              </div>
              <div className="text-sm text-gray-500">Active Services</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {services.filter((s) => s.status === "inactive").length}
              </div>
              <div className="text-sm text-gray-500">Inactive Services</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {services.length}
              </div>
              <div className="text-sm text-gray-500">Total Services</div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeFilter === tab
                      ? "text-white border-transparent rounded-t-lg px-4 py-2"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  style={
                    activeFilter === tab
                      ? { backgroundColor: "var(--color-primary)" }
                      : {}
                  }
                >
                  {tab}
                  <span className="ml-2 text-xs">
                    (
                    {tab === "All"
                      ? services.length
                      : tab === "Rental"
                      ? services.filter((s) => s.type === "rental").length
                      : tab === "Tour"
                      ? services.filter((s) => s.type === "tour").length
                      : services.filter((s) => s.type === "car").length}
                    )
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
            >
              {/* Service Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      {/* Updated the color of this badge to match the new theme */}
                      <span className="px-3 py-1 bg-[#E6F3F4] text-[#008fa0] rounded-full text-sm font-medium">
                        {getTypeDisplay(service.type)}
                      </span>
                      <span className={getStatusBadge(service.status)}>
                        {service.status.charAt(0).toUpperCase() +
                          service.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Options Menu */}
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                  <button
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: "var(--color-primary)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        "var(--color-primary-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--color-primary)")
                    }
                    onClick={handleOpenDetail}
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>

                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeFilter === "All"
                ? "You haven't created any services yet."
                : `No ${activeFilter.toLowerCase()} services found.`}
            </p>
            <button
              onClick={handleAddNewService}
              className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--color-primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--color-primary)")
              }
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Service
            </button>
          </div>
        )}
      </div>

      {isModalOpen && <PartnerServiceModal onClose={handleCloseModal} />}
    </div>
  );
};

export default PartnerService;
