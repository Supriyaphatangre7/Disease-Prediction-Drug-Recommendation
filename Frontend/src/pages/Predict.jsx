import { Link } from "react-router-dom";
import { FaFemale, FaVial } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Predict() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e6f7f8] flex flex-col items-center justify-center px-6 py-20">

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F8E95]">
          Select Your Health Test
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Choose a clinical AI-powered evaluation to analyze symptoms and
          hormone parameters for accurate disease prediction.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-12 w-full max-w-5xl">

        {/* PCOS CARD */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/predict/pcos">
            <div className="p-12 rounded-3xl backdrop-blur-lg bg-white/80 shadow-xl hover:shadow-2xl border border-gray-100 transition duration-300 text-center cursor-pointer group">

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaFemale className="text-6xl text-pink-500 mx-auto mb-6 group-hover:scale-110 transition" />
              </motion.div>

              <h2 className="text-2xl font-semibold text-gray-800">
                PCOS Test
              </h2>

              <p className="text-gray-500 mt-3">
                Hormonal + Symptom + Optional Ultrasound Analysis
              </p>

              <div className="mt-6 text-[#0F8E95] font-semibold">
                Start Test →
              </div>

            </div>
          </Link>
        </motion.div>

        {/* THYROID CARD */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/predict/thyroid">
            <div className="p-12 rounded-3xl backdrop-blur-lg bg-white/80 shadow-xl hover:shadow-2xl border border-gray-100 transition duration-300 text-center cursor-pointer group">

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaVial className="text-6xl text-blue-500 mx-auto mb-6 group-hover:scale-110 transition" />
              </motion.div>

              <h2 className="text-2xl font-semibold text-gray-800">
                Thyroid Test
              </h2>

              <p className="text-gray-500 mt-3">
                Hormonal & Clinical Parameter Evaluation
              </p>

              <div className="mt-6 text-[#0F8E95] font-semibold">
                Start Test →
              </div>

            </div>
          </Link>
        </motion.div>

      </div>

    </div>
  );
}