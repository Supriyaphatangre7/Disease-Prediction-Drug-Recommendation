import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/predict");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white text-gray-900 px-10 md:px-20 py-20">
      
      {/* Left Side - Medical Content */}
      <div className="w-full md:w-3/5 space-y-6 order-1">

        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0F8E95]">
          AI-Based Disease Prediction System
        </h2>

        <p className="text-lg md:text-xl text-[#334155] font-medium">
          Our intelligent healthcare system analyzes clinical symptoms
          and hormone parameters to predict conditions such as
          <span className="text-[#0F8E95] font-semibold"> PCOS </span>
          and
          <span className="text-[#0F8E95] font-semibold"> Thyroid Disorders</span>.
          Get fast, accurate insights powered by advanced machine learning models.
        </p>

        <button
          className="rounded-lg px-6 py-3 text-lg font-semibold
                     border-2 border-[#0F8E95] text-[#0F8E95]
                     hover:bg-[#0F8E95] hover:text-white
                     hover:scale-105 transition duration-300"
          onClick={handleClick}
        >
          Start Health Assessment
        </button>

      </div>

      {/* Right Side - Medical Illustration */}
      <div className="order-2 mt-10 md:mt-0">
        <img
          src="image/23.jpg"
          alt="AI Medical System"
          className="w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] object-contain"
        />
      </div>

    </div>
  );
};

export default Hero;