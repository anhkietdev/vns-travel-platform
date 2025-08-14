import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Camera,
  FileText,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Navigation,
  Utensils,
  Wifi,
  Car,
  Plane,
  Ticket,
} from "lucide-react";

const PartnerTourRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    destination: "",
    category: "",
    duration: "",
    groupSize: "",

    // Schedule & Availability
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    availableDays: [],
    season: "",

    // Pricing & Inclusions
    price: "",
    currency: "USD",
    includes: [],
    excludes: [],
    discounts: "",

    // Media & Details
    images: [],
    itinerary: "",
    cancellationPolicy: "",
    highlights: [],
    languages: [],
    meetingPoint: "",
    requirements: "",

    // Additional Features
    difficulty: "Beginner",
    ageGroup: "All Ages",
    physicalRating: "Low",
    specialFeatures: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const steps = [
    { id: 1, title: "Basic Information", icon: MapPin },
    { id: 2, title: "Schedule & Availability", icon: Calendar },
    { id: 3, title: "Pricing & Inclusions", icon: DollarSign },
    { id: 4, title: "Media & Details", icon: Camera },
    { id: 5, title: "Additional Features", icon: Star },
    { id: 6, title: "Review & Publish", icon: CheckCircle },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Basic Tour Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Sunset Kayak Adventure in Bali"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Bali, Indonesia"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your tour experience in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Food & Culinary">Food & Culinary</option>
                  <option value="Nature & Wildlife">Nature & Wildlife</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Historical">Historical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 4 hours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Size
                </label>
                <input
                  type="text"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 10 people max"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Schedule & Availability
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Days
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="availableDays"
                          value={day}
                          checked={formData.availableDays.includes(day)}
                          onChange={handleChange}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{day}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select season</option>
                  <option value="Year-round">Year-round</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Autumn">Autumn</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Pricing & Inclusions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Person *
                </label>
                <div className="flex">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Information
                </label>
                <input
                  type="text"
                  name="discounts"
                  value={formData.discounts}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 10% for groups of 5+"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's Included
                </label>
                <textarea
                  name="includes"
                  value={formData.includes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List what's included in the tour price..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's Not Included
                </label>
                <textarea
                  name="excludes"
                  value={formData.excludes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List what's not included in the tour price..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Media & Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Photos
                </label>
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
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="h-20 w-full object-cover rounded"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Itinerary *
                </label>
                <textarea
                  name="itinerary"
                  value={formData.itinerary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the detailed itinerary of your tour..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Point
                </label>
                <input
                  type="text"
                  name="meetingPoint"
                  value={formData.meetingPoint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Main entrance of City Hall"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cancellation Policy
                </label>
                <textarea
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your cancellation policy..."
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Additional Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Group
                </label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All Ages">All Ages</option>
                  <option value="Adults Only">Adults Only</option>
                  <option value="Children Friendly">Children Friendly</option>
                  <option value="Teens">Teens</option>
                  <option value="Seniors">Seniors</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Rating
                </label>
                <select
                  name="physicalRating"
                  value={formData.physicalRating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low (Minimal walking)</option>
                  <option value="Moderate">Moderate (2-3 miles)</option>
                  <option value="High">High (5+ miles)</option>
                  <option value="Extreme">Extreme (Strenuous activity)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages
                </label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. English, Spanish, French"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Highlights
                </label>
                <textarea
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List key highlights of your tour..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List any special requirements for participants..."
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Review & Publish
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Tour Title</h3>
                  <p className="text-gray-600">
                    {formData.title || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Destination</h3>
                  <p className="text-gray-600">
                    {formData.destination || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Category</h3>
                  <p className="text-gray-600">
                    {formData.category || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Duration</h3>
                  <p className="text-gray-600">
                    {formData.duration || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Group Size</h3>
                  <p className="text-gray-600">
                    {formData.groupSize || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Price</h3>
                  <p className="text-gray-600">
                    {formData.price
                      ? `${formData.currency} ${formData.price}`
                      : "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="text-gray-600">
                  {formData.description || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Itinerary</h3>
                <p className="text-gray-600">
                  {formData.itinerary || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">What's Included</h3>
                <p className="text-gray-600">
                  {formData.includes || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Meeting Point</h3>
                <p className="text-gray-600">
                  {formData.meetingPoint || "Not provided"}
                </p>
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
          <p className="text-gray-600 mt-2">
            Follow the steps to list your tour experience
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s.id
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : step > s.id
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : "bg-white border-2 border-gray-300 text-gray-500"
                }`}
              >
                {step > s.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  step === s.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center px-5 py-2 rounded-lg ${
            step === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {step < steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Publish Tour
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerTourRegistration;
