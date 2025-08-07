import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Camera,
  DollarSign,
  FileText,
  Home,
} from "lucide-react";

const RegisterPartner = () => {
  // Main tab state
  const [activeTab, setActiveTab] = useState(0);

  // Sub-step state for each tab
  const [subSteps, setSubSteps] = useState({
    0: 0, // Basic Info
    1: 0, // Property Setup
    2: 0, // Photos
    3: 0, // Pricing & Calendar
    4: 0, // Legal Info
  });

  // Form data state
  const [formData, setFormData] = useState({
    basicInfo: {
      propertyName: "",
      description: "",
      mapPosition: {
        address: "",
        latitude: "",
        longitude: "",
      },
    },
    propertySetup: {
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      maxGuests: "",
      amenities: [],
      rules: "",
    },
    photos: {
      mainPhoto: null,
      additionalPhotos: [],
      photoDescriptions: {},
    },
    pricing: {
      basePrice: "",
      cleaningFee: "",
      securityDeposit: "",
      availability: {
        startDate: "",
        endDate: "",
      },
    },
    legalInfo: {
      ownerName: "",
      contactEmail: "",
      contactPhone: "",
      terms: false,
      privacy: false,
    },
  });

  // Tab configuration
  const tabs = [
    { id: 0, name: "Basic Info", icon: Home, subSteps: 2 },
    { id: 1, name: "Property Setup", icon: MapPin, subSteps: 3 },
    { id: 2, name: "Photos", icon: Camera, subSteps: 2 },
    { id: 3, name: "Pricing & Calendar", icon: DollarSign, subSteps: 2 },
    { id: 4, name: "Legal Info", icon: FileText, subSteps: 2 },
  ];

  // Update form data helper
  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Update nested form data helper
  const updateNestedFormData = (section, nestedField, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value,
        },
      },
    }));
  };

  // Navigation helpers
  const nextSubStep = () => {
    const currentSubStep = subSteps[activeTab];
    const maxSubSteps = tabs[activeTab].subSteps;

    if (currentSubStep < maxSubSteps - 1) {
      setSubSteps((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab] + 1,
      }));
    }
  };

  const prevSubStep = () => {
    const currentSubStep = subSteps[activeTab];

    if (currentSubStep > 0) {
      setSubSteps((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab] - 1,
      }));
    }
  };

  const goToTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  // Validation helper
  const validateCurrentStep = () => {
    const currentSubStep = subSteps[activeTab];

    switch (activeTab) {
      case 0: // Basic Info
        if (currentSubStep === 0) {
          return (
            formData.basicInfo.propertyName.trim() !== "" &&
            formData.basicInfo.description.trim() !== ""
          );
        }
        if (currentSubStep === 1) {
          return formData.basicInfo.mapPosition.address.trim() !== "";
        }
        break;
      case 1: // Property Setup
        if (currentSubStep === 0) {
          return (
            formData.propertySetup.propertyType !== "" &&
            formData.propertySetup.bedrooms !== ""
          );
        }
        if (currentSubStep === 1) {
          return (
            formData.propertySetup.bathrooms !== "" &&
            formData.propertySetup.maxGuests !== ""
          );
        }
        if (currentSubStep === 2) {
          return true; // Amenities are optional
        }
        break;
      case 2: // Photos
        return true; // Photos are optional for now
      case 3: // Pricing
        if (currentSubStep === 0) {
          return formData.pricing.basePrice !== "";
        }
        if (currentSubStep === 1) {
          return (
            formData.pricing.availability.startDate !== "" &&
            formData.pricing.availability.endDate !== ""
          );
        }
        break;
      case 4: // Legal Info
        if (currentSubStep === 0) {
          return (
            formData.legalInfo.ownerName.trim() !== "" &&
            formData.legalInfo.contactEmail.trim() !== ""
          );
        }
        if (currentSubStep === 1) {
          return formData.legalInfo.terms && formData.legalInfo.privacy;
        }
        break;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = () => {
    console.log("Complete Form Data:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  // Sub-step components
  const BasicInfoStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Name *
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your property name"
          value={formData.basicInfo.propertyName}
          onChange={(e) =>
            updateFormData("basicInfo", "propertyName", e.target.value)
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Description *
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Describe your property..."
          value={formData.basicInfo.description}
          onChange={(e) =>
            updateFormData("basicInfo", "description", e.target.value)
          }
        />
      </div>
    </div>
  );

  const BasicInfoStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Address *
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter full address"
          value={formData.basicInfo.mapPosition.address}
          onChange={(e) =>
            updateNestedFormData(
              "basicInfo",
              "mapPosition",
              "address",
              e.target.value
            )
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., 40.7128"
            value={formData.basicInfo.mapPosition.latitude}
            onChange={(e) =>
              updateNestedFormData(
                "basicInfo",
                "mapPosition",
                "latitude",
                e.target.value
              )
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., -74.0060"
            value={formData.basicInfo.mapPosition.longitude}
            onChange={(e) =>
              updateNestedFormData(
                "basicInfo",
                "mapPosition",
                "longitude",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );

  const PropertySetupStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type *
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.propertySetup.propertyType}
          onChange={(e) =>
            updateFormData("propertySetup", "propertyType", e.target.value)
          }
        >
          <option value="">Select property type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="villa">Villa</option>
          <option value="cabin">Cabin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Bedrooms *
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.propertySetup.bedrooms}
          onChange={(e) =>
            updateFormData("propertySetup", "bedrooms", e.target.value)
          }
        >
          <option value="">Select bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5+">5+ Bedrooms</option>
        </select>
      </div>
    </div>
  );

  const PropertySetupStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Bathrooms *
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.propertySetup.bathrooms}
          onChange={(e) =>
            updateFormData("propertySetup", "bathrooms", e.target.value)
          }
        >
          <option value="">Select bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="1.5">1.5 Bathrooms</option>
          <option value="2">2 Bathrooms</option>
          <option value="2.5">2.5 Bathrooms</option>
          <option value="3+">3+ Bathrooms</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Guests *
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.propertySetup.maxGuests}
          onChange={(e) =>
            updateFormData("propertySetup", "maxGuests", e.target.value)
          }
        >
          <option value="">Select max guests</option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="4">4 Guests</option>
          <option value="6">6 Guests</option>
          <option value="8">8 Guests</option>
          <option value="10+">10+ Guests</option>
        </select>
      </div>
    </div>
  );

  const PropertySetupStep3 = () => {
    const amenities = [
      "WiFi",
      "Kitchen",
      "Parking",
      "Pool",
      "Gym",
      "Pet Friendly",
      "Air Conditioning",
      "Heating",
    ];

    const toggleAmenity = (amenity) => {
      const current = formData.propertySetup.amenities;
      const updated = current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity];
      updateFormData("propertySetup", "amenities", updated);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.propertySetup.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary-hover"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            House Rules
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter any house rules..."
            value={formData.propertySetup.rules}
            onChange={(e) =>
              updateFormData("propertySetup", "rules", e.target.value)
            }
          />
        </div>
      </div>
    );
  };

  const PhotosStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Photo
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload main photo
          </p>
          <input type="file" className="hidden" accept="image/*" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo Description
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Describe your main photo..."
        />
      </div>
    </div>
  );

  const PhotosStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Photos
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
            >
              <Camera className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-xs text-gray-600">Photo {index}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PricingStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Price per Night *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="0.00"
            value={formData.pricing.basePrice}
            onChange={(e) =>
              updateFormData("pricing", "basePrice", e.target.value)
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cleaning Fee
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="0.00"
            value={formData.pricing.cleaningFee}
            onChange={(e) =>
              updateFormData("pricing", "cleaningFee", e.target.value)
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Security Deposit
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="0.00"
            value={formData.pricing.securityDeposit}
            onChange={(e) =>
              updateFormData("pricing", "securityDeposit", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );

  const PricingStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Availability Period
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.pricing.availability.startDate}
              onChange={(e) =>
                updateNestedFormData(
                  "pricing",
                  "availability",
                  "startDate",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              End Date *
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.pricing.availability.endDate}
              onChange={(e) =>
                updateNestedFormData(
                  "pricing",
                  "availability",
                  "endDate",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const LegalInfoStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Owner Name *
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter owner's full name"
          value={formData.legalInfo.ownerName}
          onChange={(e) =>
            updateFormData("legalInfo", "ownerName", e.target.value)
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter contact email"
          value={formData.legalInfo.contactEmail}
          onChange={(e) =>
            updateFormData("legalInfo", "contactEmail", e.target.value)
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Phone
        </label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter contact phone"
          value={formData.legalInfo.contactPhone}
          onChange={(e) =>
            updateFormData("legalInfo", "contactPhone", e.target.value)
          }
        />
      </div>
    </div>
  );

  const LegalInfoStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.legalInfo.terms}
            onChange={(e) =>
              updateFormData("legalInfo", "terms", e.target.checked)
            }
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to the Terms of Service and acknowledge that I have read and
            understand the platform's policies regarding property listings,
            guest interactions, and payment processing. *
          </span>
        </label>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.legalInfo.privacy}
            onChange={(e) =>
              updateFormData("legalInfo", "privacy", e.target.checked)
            }
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to the Privacy Policy and consent to the collection and
            processing of my personal data as described in the policy. *
          </span>
        </label>
      </div>
    </div>
  );

  // Render current sub-step
  const renderCurrentStep = () => {
    const currentSubStep = subSteps[activeTab];

    switch (activeTab) {
      case 0: // Basic Info
        return currentSubStep === 0 ? <BasicInfoStep1 /> : <BasicInfoStep2 />;
      case 1: // Property Setup
        return currentSubStep === 0 ? (
          <PropertySetupStep1 />
        ) : currentSubStep === 1 ? (
          <PropertySetupStep2 />
        ) : (
          <PropertySetupStep3 />
        );
      case 2: // Photos
        return currentSubStep === 0 ? <PhotosStep1 /> : <PhotosStep2 />;
      case 3: // Pricing
        return currentSubStep === 0 ? <PricingStep1 /> : <PricingStep2 />;
      case 4: // Legal Info
        return currentSubStep === 0 ? <LegalInfoStep1 /> : <LegalInfoStep2 />;
      default:
        return null;
    }
  };

  const isLastStep =
    activeTab === tabs.length - 1 &&
    subSteps[activeTab] === tabs[activeTab].subSteps - 1;
  const isFirstStep = activeTab === 0 && subSteps[activeTab] === 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Property Registration
        </h1>
        <p className="text-gray-600">
          Complete all sections to register your property
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {tabs[activeTab].name} - Step {subSteps[activeTab] + 1} of{" "}
            {tabs[activeTab].subSteps}
          </span>
          <span className="text-sm text-gray-500">
            {(
              (activeTab * 100) / tabs.length +
              ((subSteps[activeTab] + 1) * 100) /
                (tabs.length * tabs[activeTab].subSteps)
            ).toFixed(0)}
            % Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (activeTab * 100) / tabs.length +
                ((subSteps[activeTab] + 1) * 100) /
                  (tabs.length * tabs[activeTab].subSteps)
              }%`,
            }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <div className="min-h-[400px]">{renderCurrentStep()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevSubStep}
          disabled={isFirstStep}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isFirstStep
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Submit All</span>
          </button>
        ) : (
          <button
            onClick={nextSubStep}
            disabled={!validateCurrentStep()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              validateCurrentStep()
                ? "bg-primary text-white hover:bg-primary-hover"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterPartner;
