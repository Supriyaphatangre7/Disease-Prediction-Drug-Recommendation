import React from "react";
import { FaRobot, FaPills, FaStethoscope, FaFileMedical, FaBrain } from "react-icons/fa";

const services = [
  {
    icon: <FaRobot className="text-4xl text-[#0F8E95]" />,
    title: "AI Disease Prediction",
    desc: "Predict possible diseases accurately based on symptoms using advanced machine learning models.",
  },
  {
    icon: <FaPills className="text-4xl text-[#0F8E95]" />,
    title: "Smart Drug Recommendations",
    desc: "Receive personalized medicine suggestions safely and efficiently tailored to predicted conditions.",
  },
  {
    icon: <FaStethoscope className="text-4xl text-[#0F8E95]" />,
    title: "Personalized Health Reports",
    desc: "Get detailed AI-generated health reports and insights to help manage your overall wellness.",
  },
  {
    icon: <FaFileMedical className="text-4xl text-[#0F8E95]" />,
    title: "Symptom Analysis System",
    desc: "Structured symptom input using React state management for accurate and controlled data processing.",
  },
  {
    icon: <FaBrain className="text-4xl text-[#0F8E95]" />,
    title: "Machine Learning Insights",
    desc: "Advanced ML algorithms trained on medical datasets to ensure reliable and intelligent predictions.",
  },
];

const Services = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center text-[#0F8E95] mb-12">
        Our Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#0F8E95]">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;