import React from "react";
import Hero from "./Hero";
import { useEffect } from "react";
import Slider from "./Slider";

const Home = () => {
  
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // 🔥 stop observing after first animation
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animate").forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);


  return (
    <>
      {/* Top Slider */}
      <div className="animate animate-down">
        <Slider />
      </div>

      {/* Hero Section */}
      <div className="animate animate-up">
        <Hero />
      </div>

      {/* How It Works */}
      <div className="py-12 px-6 bg-[#F8FAFC] animate">
        <div className="max-w-[85vw] mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 text-[#0F8E95]">
            How It Works
          </h1>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white shadow-md rounded-lg animate animate-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📝</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Enter Symptoms
                </h2>
              </div>
              <p className="text-[#334155]">
                Enter your symptoms in simple language using our AI chatbot.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg animate animate-up">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🤖</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  AI Analysis
                </h2>
              </div>
              <p className="text-[#334155]">
                Our machine learning model analyzes symptoms intelligently.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg animate animate-right">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧠</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Disease Prediction
                </h2>
              </div>
              <p className="text-[#334155]">
                The system predicts possible diseases based on symptom patterns.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg animate animate-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💊</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Drug Recommendation
                </h2>
              </div>
              <p className="text-[#334155]">
                Suggested medicines are provided with usage guidance.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg animate animate-up">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛡️</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Safe & Reliable
                </h2>
              </div>
              <p className="text-[#334155]">
                Recommendations follow trusted medical datasets and safety rules.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg animate animate-right">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👨‍⚕️</span>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Doctor Consultation
                </h2>
              </div>
              <p className="text-[#334155]">
                Always consult a certified doctor before taking medication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="py-12 px-6 bg-white animate animate-up">
        <div className="max-w-[85vw] mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0F8E95] mb-3">
            Gallery
          </h2>
          <p className="text-[#64748B]">
            A glimpse of our medical environment and AI-driven healthcare system
          </p>
        </div>

        <div className="max-w-[85vw] mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          {["a","b","c","d","e","f","g","h"].map((img, index) => (
           <img
    key={index}
    src={`image/${img}.jpeg`}
    alt={`Gallery ${index + 1}`}
    className="w-full h-64 object-cover rounded-lg animate animate-zoom gallery-img"
  />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
<div className="py-12 px-6 text-center bg-white animate">
  <h2 className="text-4xl font-bold mb-6 text-[#0F8E95]">
    Why Choose Us?
  </h2>

  <div className="max-w-[85vw] mx-auto grid md:grid-cols-3 gap-6">

    <div className="p-6 bg-[#F8FAFC] rounded-lg shadow-lg animate animate-left">
      <h3 className="text-xl font-semibold mb-3">
        🧬 Accurate Prediction
      </h3>
      <p className="text-[#334155]">
        Machine learning models trained on medical datasets for PCOS and Thyroid detection.
      </p>
    </div>

    <div className="p-6 bg-[#F8FAFC] rounded-lg shadow-lg animate animate-up">
      <h3 className="text-xl font-semibold mb-3">
        📊 Hormone-Based Analysis
      </h3>
      <p className="text-[#334155]">
        Advanced analysis of clinical and hormone parameters like TSH, T3, T4, BMI and symptoms.
      </p>
    </div>

    <div className="p-6 bg-[#F8FAFC] rounded-lg shadow-lg animate animate-right">
      <h3 className="text-xl font-semibold mb-3">
        💊 Smart Drug Guidance
      </h3>
      <p className="text-[#334155]">
        Provides medicine recommendations and lifestyle guidance based on prediction results.
      </p>
    </div>

  </div>
</div>
    </>
  );
};

export default Home;
