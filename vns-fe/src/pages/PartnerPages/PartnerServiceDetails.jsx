import React, { useState } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Tv,
  AirVent,
  Users,
  Bed,
  Bath,
  Calendar,
  Clock,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Check,
  X,
  AlertCircle,
  Camera,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Percent,
} from "lucide-react";

const PartnerServiceDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Mock data based on the database schema - Updated to Oceanview Homestay
  const serviceData = {
    serviceId: "123e4567-e89b-12d3-a456-426614174000",
    title: "Oceanview Homestay - Luxury Apartment with River View",
    description:
      "Luxurious apartment in the heart of Ho Chi Minh City with a stunning river view. Spacious, modern space, perfect for families and groups of friends traveling.",
    propertyType: "homestay",
    homestayType: "entire_place",
    location: {
      address: "123 Nguyen Hue Street, Ben Nghe Ward",
      city: "Ho Chi Minh City",
      district: "District 1",
      ward: "Ben Nghe Ward",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    pricing: {
      basePrice: 1500000,
      weekendPrice: 1800000,
      cleaningFee: 200000,
      serviceFeePct: 10,
    },
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    policies: {
      checkInTime: "15:00",
      checkOutTime: "11:00",
      cancellationPolicy: "Flexible - 100% refund if canceled 1 day prior",
      houseRules: "No smoking, No pets, Quiet hours from 10:00 PM - 8:00 AM",
    },
    amenities: [
      { id: "wifi", name: "Free WiFi", icon: Wifi, available: true },
      {
        id: "kitchen",
        name: "Fully equipped kitchen",
        icon: Coffee,
        available: true,
      },
      { id: "tv", name: "Flat-screen TV", icon: Tv, available: true },
      {
        id: "parking",
        name: "Free parking",
        icon: Car,
        available: true,
      },
      { id: "ac", name: "Air conditioning", icon: AirVent, available: true },
      { id: "heater", name: "Heater", icon: AirVent, available: false },
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
    host: {
      name: "Nguyen Thi Lan Anh",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      joinedDate: "2022-03-15",
      responseRate: 98,
      responseTime: "Within 1 hour",
      verified: true,
    },
    ratings: {
      overall: 4.8,
      totalReviews: 127,
    },
    availability: {
      minNights: 2,
      isInstantBook: true,
      currentlyAvailable: true,
    },
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-08-10T15:30:00Z",
    isActive: true,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === serviceData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? serviceData.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {serviceData.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                {renderStars(serviceData.ratings.overall)}
                <span className="ml-2 font-medium">
                  {serviceData.ratings.overall}
                </span>
                <span className="ml-1">
                  ({serviceData.ratings.totalReviews} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {serviceData.location.address},{" "}
                  {serviceData.location.district}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <div className="aspect-video bg-gray-200">
              <img
                src={serviceData.images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {serviceData.images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {serviceData.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {serviceData.images.length > 4 && (
                <button className="w-12 h-12 bg-black/60 rounded-lg flex items-center justify-center text-white text-xs">
                  +{serviceData.images.length - 4}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "amenities", label: "Amenities" },
                { id: "policies", label: "Policies" },
                { id: "reviews", label: "Reviews" },
                { id: "location", label: "Location" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-[#008fa0] text-[#008fa0]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Property Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Property Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Users className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.maxGuests} guests
                        </div>
                        <div className="text-sm text-gray-600">Max</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Bed className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.bedrooms} bedrooms
                        </div>
                        <div className="text-sm text-gray-600">Private</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Bath className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.bathrooms} bathrooms
                        </div>
                        <div className="text-sm text-gray-600">Full</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Shield className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Instant Book</div>
                        <div className="text-sm text-gray-600">Available</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {serviceData.description}
                  </p>
                </div>

                {/* Host Info */}
                <div className="border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Host Information
                  </h3>
                  <div className="flex items-start gap-4">
                    <img
                      src={serviceData.host.avatar}
                      alt={serviceData.host.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">
                          {serviceData.host.name}
                        </h4>
                        {serviceData.host.verified && (
                          <div className="bg-[#008fa0] text-white px-2 py-1 rounded-full text-xs">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <div>Joined March 2022</div>
                        <div>
                          Response rate: {serviceData.host.responseRate}%
                        </div>
                        <div>
                          Response time: {serviceData.host.responseTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Available Amenities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceData.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.id}
                        className="flex items-center gap-3 p-3"
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            amenity.available
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`${
                            amenity.available
                              ? "text-gray-900"
                              : "text-gray-400 line-through"
                          }`}
                        >
                          {amenity.name}
                        </span>
                        {amenity.available ? (
                          <Check className="w-4 h-4 text-green-600 ml-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "policies" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Check-in/Check-out Policy
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Check-in</div>
                        <div className="text-gray-600">
                          After {serviceData.policies.checkInTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Check-out</div>
                        <div className="text-gray-600">
                          Before {serviceData.policies.checkOutTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Cancellation Policy</h4>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                    {serviceData.policies.cancellationPolicy}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">House Rules</h4>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                    {serviceData.policies.houseRules}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Important Note:</p>
                    <p>
                      Please read the policies and house rules carefully before
                      booking to ensure a smooth stay.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Reviews
                  </h3>

                  {/* Rating Overview */}
                  <div className="flex">
                    <div className="text-center justify-center">
                      <div className="text-4xl font-bold text-[#008fa0] mb-2">
                        {serviceData.ratings.overall}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(serviceData.ratings.overall)}
                      </div>
                      <div className="text-gray-600">
                        {serviceData.ratings.totalReviews} reviews
                      </div>
                    </div>

                    {/* <div className="space-y-3">
                      {[
                        {
                          label: "Cleanliness",
                          rating: serviceData.ratings.cleanliness,
                        },
                        {
                          label: "Service",
                          rating: serviceData.ratings.service,
                        },
                        { label: "Value", rating: serviceData.ratings.value },
                        {
                          label: "Location",
                          rating: serviceData.ratings.location,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3"
                        >
                          <span className="w-16 text-sm">{item.label}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#008fa0] h-2 rounded-full"
                              style={{ width: `${(item.rating / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm font-medium">
                            {item.rating}
                          </span>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      user: "Tran Van Nam",
                      avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
                      date: "2025-07-15",
                      rating: 5,
                      comment:
                        "The apartment is beautiful and clean. The location is convenient, close to many attractions. The host is very friendly and helpful. Will come back again!",
                    },
                    {
                      user: "Nguyen Thi Mai",
                      avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
                      date: "2025-07-08",
                      rating: 4,
                      comment:
                        "Spacious and cool space, beautiful river view. Fully equipped, suitable for families. Only the parking space is a bit tight.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium">{review.user}</h5>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-gray-500 text-sm">
                              {new Date(review.date).toLocaleDateString(
                                "en-US"
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#008fa0] mt-0.5" />
                      <div>
                        <div className="font-medium">
                          {serviceData.location.address}
                        </div>
                        <div className="text-gray-600">
                          {serviceData.location.ward},{" "}
                          {serviceData.location.district}
                        </div>
                        <div className="text-gray-600">
                          {serviceData.location.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  {/* <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Map location will be displayed here</p>
                      <p className="text-sm">
                        Coordinates: {serviceData.location.latitude},{" "}
                        {serviceData.location.longitude}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Booking Card (Hidden for Partner View) */}
        {/* <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="border rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(serviceData.pricing.basePrice)}
                  </span>
                  <span className="text-gray-600">/ night</span>
                </div>
                <div className="text-sm text-gray-600">
                  Weekend: {formatPrice(serviceData.pricing.weekendPrice)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">CHECK-IN</div>
                    <div className="font-medium">15/08/2024</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">CHECK-OUT</div>
                    <div className="font-medium">17/08/2024</div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">GUESTS</div>
                  <div className="font-medium">2 guests</div>
                </div>
              </div>

              <button className="w-full bg-[#008fa0] text-white py-3 rounded-lg font-semibold hover:bg-[#007a8a] transition-colors mb-4">
                Book now
              </button>

              <div className="text-center text-sm text-gray-600 mb-4">
                You will not be charged immediately
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>
                    {formatPrice(serviceData.pricing.basePrice)} × 2 nights
                  </span>
                  <span>{formatPrice(serviceData.pricing.basePrice * 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>{formatPrice(serviceData.pricing.cleaningFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>
                    {formatPrice(
                      (serviceData.pricing.basePrice *
                        2 *
                        serviceData.pricing.serviceFeePct) /
                        100
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        serviceData.pricing.basePrice * 2 +
                          serviceData.pricing.cleaningFee +
                          (serviceData.pricing.basePrice *
                            2 *
                            serviceData.pricing.serviceFeePct) /
                            100
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Host */}
        {/* <div className="mt-6 p-4 border rounded-xl">
              <h4 className="font-semibold mb-3">Contact Host</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <MessageCircle className="w-5 h-5" />
                  <span>Message</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            {/* Safety Info */}
        {/* <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#008fa0] mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Safety Guarantee</p>
                  <p className="text-gray-600">
                    We are committed to protecting your personal information and payments. Never transfer money or communicate outside the website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Management Actions - Only visible to property owner/admin */}
      <div className="mt-16 border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Service Management
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Last Updated:{" "}
              {new Date(serviceData.updatedAt).toLocaleDateString("en-US")} •
              Status:{" "}
              <span
                className={`font-medium ${
                  serviceData.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {serviceData.isActive ? "Active" : "Inactive"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-blue-700 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-red-700 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">28</div>
                <div className="text-sm text-blue-700">Bookings This Month</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {serviceData.ratings.overall}
                </div>
                <div className="text-sm text-green-700">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Percent className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-900">94%</div>
                <div className="text-sm text-yellow-700">Occupancy Rate</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatPrice(42000000).replace("₫", "").trim()}
                </div>
                <div className="text-sm text-purple-700">
                  Revenue This Month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerServiceDetails;
