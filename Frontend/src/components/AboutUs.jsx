import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 overflow-hidden mt-20">
      <div className="flex flex-col md:flex-row gap-12 items-center">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F8E95] signika-negative">
            About Our Healthcare System
          </h1>

          <p className="text-xl text-[#334155]">
            Welcome to{" "}
            <span className="text-black font-semibold">CuraAI</span>, an
            AI-powered{" "}
            <b>Disease Prediction and Drug Recommendation System</b>{" "}
            designed to assist users in understanding health conditions through
            intelligent symptom analysis.
          </p>

          <p className="text-xl text-[#334155]">
            At <b>CuraAI</b>, our goal is to bridge the gap between technology and
            healthcare by offering a smart disease prediction system that
            analyzes user-entered symptoms and suggests appropriate medicines.
            The system is built using machine learning and a React-based state
            management form for structured symptom input.
          </p>

          {/* Features Card */}
          <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-3xl font-semibold text-[#0F8E95] flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Our Key Features
            </h3>

            <ul className="space-y-4">
              
              {/* Feature 1 */}
              <li className="flex items-start gap-4">
                <div className="bg-[#E6F4F1] p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#0F8E95]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    AI Disease Prediction
                  </h4>
                  <p className="text-gray-600">
                    Predicts possible diseases based on user symptoms using
                    trained machine learning models.
                  </p>
                </div>
              </li>

              {/* Feature 2 */}
              <li className="flex items-start gap-4">
                <div className="bg-[#E6F4F1] p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#0F8E95]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    Smart Drug Recommendation
                  </h4>
                  <p className="text-gray-600">
                    Suggests medicines based on predicted diseases with safety
                    awareness.
                  </p>
                </div>
              </li>

              {/* Feature 3 */}
              <li className="flex items-start gap-4">
                <div className="bg-[#E6F4F1] p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#0F8E95]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    React-Based Symptom Form
                  </h4>
                  <p className="text-gray-600">
                    Structured symptom input built using React state
                    management for accurate and controlled data handling.
                  </p>
                </div>
              </li>

            </ul>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 relative flex items-center justify-center md:-mt-6">

          <div className="absolute -top-6 -right-6 w-72 h-56 bg-[#0F8E95] opacity-20 rounded-xl"></div>

          <img
            src="image/14.jpg"
            alt="AI Healthcare System"
            className="relative z-10 w-full max-w-md rounded-xl shadow-lg"
          />

          <div className="absolute -bottom-6 -left-6 w-72 h-40 bg-[#E6F4F1] rounded-xl"></div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;