import React, { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  Wifi,
  DollarSign,
  Camera,
  FileText,
  Bed,
  Bath,
  Car,
  Coffee,
  Tv,
  AirVent,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerRentalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "apartment",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [],
    basePrice: "",
    cleaningFee: "",
    securityDeposit: "",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "flexible",
    houseRules: "",
    images: [],
  });
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Property Type", icon: Home },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Rooms & Guests", icon: Users },
    { id: 4, title: "Amenities", icon: Wifi },
    { id: 5, title: "Pricing", icon: DollarSign },
    { id: 6, title: "Photos", icon: Camera },
    { id: 7, title: "Policies", icon: FileText },
    { id: 8, title: "Review & Publish", icon: CheckCircle },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              What type of property are you listing?
            </h2>
            <p className="text-gray-600 mb-4">
              Choose the option that best describes your space
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: "apartment",
                  label: "Apartment",
                  desc: "A furnished place within a building",
                },
                {
                  value: "house",
                  label: "House",
                  desc: "A residential building",
                },
                {
                  value: "condo",
                  label: "Condominium",
                  desc: "A privately owned unit in a building",
                },
                {
                  value: "studio",
                  label: "Studio",
                  desc: "A single room with kitchen and bathroom",
                },
              ].map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.propertyType === type.value
                      ? "border-[#008fa0] bg-[#e6f7f9]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => updateFormData("propertyType", type.value)}
                >
                  <h3 className="font-medium text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name *
              </label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => updateFormData("propertyName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                placeholder="Enter a catchy name for your property"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Where is your property located?
            </h2>
            <p className="text-gray-600 mb-4">
              Provide the complete address for your listing
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Tell us about your space
            </h2>
            <p className="text-gray-600 mb-4">
              How many rooms and guests can you accommodate?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Bed className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "bedrooms",
                        Math.max(0, formData.bedrooms - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.bedrooms}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("bedrooms", formData.bedrooms + 1)
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Bath className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "bathrooms",
                        Math.max(0, formData.bathrooms - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.bathrooms}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("bathrooms", formData.bathrooms + 1)
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Guests
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "maxGuests",
                        Math.max(1, formData.maxGuests - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.maxGuests}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("maxGuests", formData.maxGuests + 1)
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              What amenities do you offer?
            </h2>
            <p className="text-gray-600 mb-4">
              Select all amenities available to your guests
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: "wifi", label: "WiFi", icon: Wifi },
                { value: "kitchen", label: "Kitchen", icon: Coffee },
                { value: "tv", label: "TV", icon: Tv },
                { value: "parking", label: "Free Parking", icon: Car },
                { value: "ac", label: "Air Conditioning", icon: AirVent },
                { value: "heating", label: "Heating", icon: AirVent },
              ].map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.value);

                return (
                  <div
                    key={amenity.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#008fa0] bg-[#e6f7f9]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleAmenity(amenity.value)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Icon className="w-6 h-6 mb-2 text-gray-600" />
                      <span className="text-sm font-medium">
                        {amenity.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Set your pricing
            </h2>
            <p className="text-gray-600 mb-4">
              Determine competitive rates for your property
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price per Night *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      updateFormData("basePrice", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="120"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cleaning Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.cleaningFee}
                    onChange={(e) =>
                      updateFormData("cleaningFee", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      updateFormData("securityDeposit", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>

            {formData.basePrice && (
              <div className="bg-[#e6f7f9] p-4 rounded-lg">
                <h3 className="font-medium text-[#008fa0] mb-2">
                  Total for 3 nights
                </h3>
                <div className="space-y-1 text-sm text-[#007a8a]">
                  <div className="flex justify-between">
                    <span>${formData.basePrice} × 3 nights</span>
                    <span>${formData.basePrice * 3}</span>
                  </div>
                  {formData.cleaningFee > 0 && (
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>${formData.cleaningFee}</span>
                    </div>
                  )}
                  <div className="border-t border-[#007a8a] pt-1 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        $
                        {formData.basePrice * 3 +
                          (parseInt(formData.cleaningFee) || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add photos of your space
            </h2>
            <p className="text-gray-600 mb-4">
              Great photos help your listing stand out. Add at least 5 photos.
            </p>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#008fa0] hover:text-[#007a8a]">
                    <span>Upload files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="h-24 w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Set your policies
            </h2>
            <p className="text-gray-600 mb-4">
              Establish check-in times and house rules for guests
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Time
                </label>
                <input
                  type="time"
                  value={formData.checkInTime}
                  onChange={(e) =>
                    updateFormData("checkInTime", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Time
                </label>
                <input
                  type="time"
                  value={formData.checkOutTime}
                  onChange={(e) =>
                    updateFormData("checkOutTime", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancellation Policy
              </label>
              <select
                value={formData.cancellationPolicy}
                onChange={(e) =>
                  updateFormData("cancellationPolicy", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
              >
                <option value="flexible">
                  Flexible - Full refund 1 day prior
                </option>
                <option value="moderate">
                  Moderate - Full refund 5 days prior
                </option>
                <option value="strict">
                  Strict - 50% refund up until 1 week prior
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                House Rules
              </label>
              <textarea
                value={formData.houseRules}
                onChange={(e) => updateFormData("houseRules", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                placeholder="No smoking, No pets, Quiet hours 10PM-8AM"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Review your listing
            </h2>
            <p className="text-gray-600 mb-4">
              Make sure everything looks good before publishing
            </p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Property Name</h3>
                  <p className="text-gray-600">
                    {formData.propertyName || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Property Type</h3>
                  <p className="text-gray-600">
                    {formData.propertyType.charAt(0).toUpperCase() +
                      formData.propertyType.slice(1)}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">
                    {formData.address}, {formData.city}, {formData.state}{" "}
                    {formData.zipCode}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Capacity</h3>
                  <p className="text-gray-600">
                    {formData.bedrooms} bedrooms, {formData.bathrooms}{" "}
                    bathrooms, up to {formData.maxGuests} guests
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Price</h3>
                  <p className="text-gray-600">
                    ${formData.basePrice || 0} per night
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Cleaning Fee</h3>
                  <p className="text-gray-600">${formData.cleaningFee || 0}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Amenities</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.length > 0 ? (
                    formData.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-[#008fa0] text-white text-sm rounded-full"
                      >
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">None selected</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Check-in:</span>{" "}
                    {formData.checkInTime}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Check-out:</span>{" "}
                    {formData.checkOutTime}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Cancellation:</span>{" "}
                    {formData.cancellationPolicy}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">House Rules</h3>
                <p className="text-gray-600">
                  {formData.houseRules || "No special rules"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="publish-confirmation"
                type="checkbox"
                className="h-4 w-4 text-[#008fa0] focus:ring-[#008fa0] border-gray-300 rounded"
              />
              <label
                htmlFor="publish-confirmation"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that all information is accurate and I agree to the
                terms and conditions
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const publishListing = () => {
    navigate("/PartnerService");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Property
          </h1>
          <p className="text-gray-600 mt-2">
            Follow the steps to create your rental listing
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-[#008fa0] -z-10 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? "bg-[#008fa0] text-white border-2 border-[#008fa0]"
                      : currentStep > step.id
                      ? "bg-green-500 text-white border-2 border-green-500"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    currentStep === step.id ? "text-[#008fa0]" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-5 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < 8 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-[#008fa0] text-white rounded-lg hover:bg-[#007a8a]"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={publishListing}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Publish Listing
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerRentalRegistration;
