import React, { useState } from "react";
import Translate from "../utils/Translate";

const FeaturesSection = ({ selectedFeatures, setSelectedFeatures }) => {
  const features = [
    <Translate key={1} text={"360-degree camera"} />,
    <Translate key={2} text={"Adaptive headlights"} />,
    <Translate key={3} text={"Blind-spot warning"} />,
    <Translate key={4} text={"Cooled seats"} />,
    <Translate key={5} text={"Heated seats"} />,
    <Translate key={6} text={"LED headlights"} />,
    <Translate key={7} text={"Performance tyres"} />,
    <Translate key={8} text={"Sound system"} />,
    <Translate key={9} text={"ABS"} />,
    <Translate key={10} text={"Backup camera"} />,
    <Translate key={11} text={"Bluetooth"} />,
    <Translate key={12} text={"Extensive tool kit"} />,
    <Translate key={13} text={"Keyless start"} />,
    <Translate key={14} text={"Memory seat"} />,
    <Translate key={15} text={"Reversing camera"} />,
    <Translate key={16} text={"Traction control"} />,
    <Translate key={17} text={"Active head restraints"} />,
    <Translate key={18} text={"Blind spot alert"} />,
    <Translate key={19} text={"Brake assist"} />,
    <Translate key={20} text={"Forward-collision warning"} />,
    <Translate key={21} text={"Leather seats"} />,
    <Translate key={22} text={"Navigation system"} />,
    <Translate key={23} text={"Side airbags"} />,
    <Translate key={24} text={"USB port"} />,
  ];

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          <Translate text={"Features"} />
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button className="text-gray-400 hover:text-gray-600">▼</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <label
            key={feature}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => toggleFeature(feature)}
              className="peer hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                selectedFeatures.includes(feature)
                  ? "border-[#FF9540] bg-[#FF9540]"
                  : "border-[#314352] bg-transparent"
              }`}
            >
              {selectedFeatures.includes(feature) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <span
              className={`${
                selectedFeatures.includes(feature)
                  ? "text-[#FF9540]"
                  : "text-[#314352]"
              }`}
            >
              {feature}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
