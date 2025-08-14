import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Car,
  MapPin,
  Users,
  Wifi,
  DollarSign,
  Camera,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const PartnerCarRentalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    rentalType: "self-drive", // self-drive or with driver
    businessLicense: "",
    insurancePolicy: "",
    operatingHours: "",
    pickupDeliveryOptions: "",
    minRentalHours: 1,
    maxRentalDays: 30,
    fuelPolicy: "full-to-full", // Predefined options
    lateReturnFee: "",
    cleaningFee: "",
    smokingPenalty: "",
    basePrice: "",
    features: [],
    images: [],
    cancellationPolicy: "flexible", // Predefined options
  });

  const steps = [
    { id: 1, title: "Rental Type", icon: Car },
    { id: 2, title: "Business Info", icon: MapPin },
    { id: 3, title: "Vehicle Details", icon: Users },
    { id: 4, title: "Pricing & Fees", icon: DollarSign },
    { id: 5, title: "Photos", icon: Camera },
    { id: 6, title: "Policies", icon: FileText },
    { id: 7, title: "Review & Publish", icon: CheckCircle },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB max
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const handleNumberInput = (field, value) => {
    if (value >= 0) {
      updateFormData(field, value);
    } else {
      alert("Please enter a positive number.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              What type of rental service are you offering?
            </h2>
            <p className="text-gray-600 mb-4">Choose the rental type.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: "self-drive",
                  label: "Self-Drive",
                  desc: "Guests drive the vehicle themselves",
                },
                {
                  value: "with-driver",
                  label: "With Driver",
                  desc: "Vehicle comes with a driver for the rental",
                },
              ].map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.rentalType === type.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => updateFormData("rentalType", type.value)}
                >
                  <h3 className="font-medium text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Enter your business information
            </h2>
            <p className="text-gray-600 mb-4">Provide your rental business details.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business License Number *
                </label>
                <input
                  type="text"
                  value={formData.businessLicense}
                  onChange={(e) => updateFormData("businessLicense", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your business license number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Policy *
                </label>
                <input
                  type="text"
                  value={formData.insurancePolicy}
                  onChange={(e) => updateFormData("insurancePolicy", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your insurance policy details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operating Hours *
                </label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => updateFormData("operatingHours", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 9 AM to 6 PM"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Vehicle Details</h2>
            <p className="text-gray-600 mb-4">
              Provide details for the vehicles you are offering for rent.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup/Delivery Options *
                </label>
                <input
                  type="text"
                  value={formData.pickupDeliveryOptions}
                  onChange={(e) =>
                    updateFormData("pickupDeliveryOptions", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Pickup at station, Delivery available"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rental Hours *
                  </label>
                  <input
                    type="number"
                    value={formData.minRentalHours}
                    onChange={(e) => handleNumberInput("minRentalHours", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Rental Days *
                  </label>
                  <input
                    type="number"
                    value={formData.maxRentalDays}
                    onChange={(e) => handleNumberInput("maxRentalDays", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Pricing & Fees</h2>
            <p className="text-gray-600 mb-4">Set your rental price and fees.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price per Day *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => handleNumberInput("basePrice", e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="120"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Late Return Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.lateReturnFee}
                    onChange={(e) => handleNumberInput("lateReturnFee", e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="50"
                  />
                </div>
              </div>
            </div>

            {formData.basePrice && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Total for 3 days</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>${formData.basePrice} × 3 days</span>
                    <span>${formData.basePrice * 3}</span>
                  </div>
                  {formData.lateReturnFee > 0 && (
                    <div className="flex justify-between">
                      <span>Late return fee</span>
                      <span>${formData.lateReturnFee}</span>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-1 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        $
                        {formData.basePrice * 3 +
                          (parseInt(formData.lateReturnFee) || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Photos of your Vehicles</h2>
            <p className="text-gray-600 mb-4">Upload at least 5 photos to showcase your vehicles.</p>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
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
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Set your rental policies</h2>
            <p className="text-gray-600 mb-4">Establish check-in times and house rules for renters.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Duration (Hours/Days)
                </label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => updateFormData("operatingHours", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 24 hours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Policy
                </label>
                <select
                  value={formData.fuelPolicy}
                  onChange={(e) => updateFormData("fuelPolicy", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="full-to-full">Full to Full</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="fuel-included">Fuel Included</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Review your listing</h2>
            <p className="text-gray-600 mb-4">
              Make sure everything looks good before publishing your listing.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Rental Type</h3>
                  <p className="text-gray-600">
                    {formData.rentalType.charAt(0).toUpperCase() +
                      formData.rentalType.slice(1)}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Business License</h3>
                  <p className="text-gray-600">{formData.businessLicense}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Insurance Policy</h3>
                  <p className="text-gray-600">{formData.insurancePolicy}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Pickup/Delivery Options</h3>
                  <p className="text-gray-600">{formData.pickupDeliveryOptions}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Pricing</h3>
                  <p className="text-gray-600">${formData.basePrice} per day</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Policies</h3>
                <p className="text-gray-600">{formData.fuelPolicy}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">House Rules</h3>
                <p className="text-gray-600">{formData.smokingPenalty}</p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="publish-confirmation"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">List Your Rental Vehicle</h1>
          <p className="text-gray-600 mt-2">
            Follow the steps to create your rental vehicle listing
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-blue-600 -z-10 transition-all duration-500"
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
                      ? "bg-blue-600 text-white border-2 border-blue-600"
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
                    currentStep === step.id ? "text-blue-600" : "text-gray-500"
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

        {currentStep < 7 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Publish Listing
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerCarRentalRegistration;
