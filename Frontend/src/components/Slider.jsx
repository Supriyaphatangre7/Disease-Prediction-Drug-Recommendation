import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    src: "image/8.jpeg",
    title: "AI-Powered Disease Prediction",
    desc: "Get accurate predictions of possible health conditions based on your symptoms using advanced machine learning models.",
  },
  {
    id: 2,
    src: "image/9.jpeg",
    title: "Smart Drug Recommendations",
    desc: "Receive personalized medicine suggestions safely and efficiently, tailored to predicted health conditions.",
  },
  {
    id: 3,
    src: "image/6.jpeg",
    title: "Interactive Medical Chatbot",
    desc: "Chat with our AI medical assistant to input symptoms and get instant guidance and health advice.",
  },
  {
    id: 4,
    src: "image/21.jpg",
    title: "Bridging AI and Healthcare",
    desc: "CuraAI combines technology and medicine to provide a smart support platform for better healthcare decisions.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-md">
      {/* Slider Container */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.src}
              className="w-full h-full object-cover"
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-white drop-shadow-2xl space-y-4 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-medium">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white/30 backdrop-blur-md text-white border-none hover:bg-white/50 transition"
      >
        ❮
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white/30 backdrop-blur-md text-white border-none hover:bg-white/50 transition"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
