import { useLocation, useNavigate } from "react-router-dom";
import ReportDownload from "../../components/ReportDownload";

export default function PCOSResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const probability = state?.final_prob ? state.final_prob : 0;
  const probabilityPercent = (probability * 100).toFixed(2);

  const isDetected = state?.result === "PCOS Detected";

  const getColor = () => {
    return isDetected ? "text-red-600" : "text-green-600";
  };

  const getBarColor = () => {
    return isDetected ? "bg-red-500" : "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          PCOS Assessment Result
        </h1>

        {/* Final Result */}
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-bold ${getColor()}`}>
            {state?.result || "No Result"}
          </h2>
          <p className="text-gray-600 mt-2">
            Probability: {probabilityPercent}%
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-700 ${getBarColor()}`}
              style={{ width: `${probabilityPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Meaning */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">What does this mean?</h3>
          <p className="text-sm text-gray-700">
            {isDetected
              ? "Your results indicate that PCOS is detected. This suggests hormonal imbalance patterns commonly associated with PCOS."
              : "Your results indicate that PCOS is not detected based on the provided information."}
            {" "}This is not a final medical diagnosis. Please consult a gynecologist for confirmation.
          </p>
        </div>

        {/* Lifestyle Advice */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Recommended Lifestyle:</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            {state?.lifestyle_recommendation
              ? state.lifestyle_recommendation.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))
              : (
                <>
                  <li>• Maintain a healthy balanced diet</li>
                  <li>• Exercise at least 30 minutes daily</li>
                  <li>• Monitor menstrual cycle regularly</li>
                </>
              )}
          </ul>
        </div>

        {/* Medication */}
        {isDetected && state?.drug_recommendation && (
          <div className="bg-gray-50 p-5 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">💊 Recommended Medication</h3>
            <p className="text-sm text-gray-700">
              <strong>{state.drug_recommendation}</strong>
              <br />
              Always consult a doctor before starting any medication.
            </p>
          </div>
        )}

        {/* About PCOS */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">About PCOS</h3>
          <p className="text-sm text-gray-700">
            PCOS (Polycystic Ovary Syndrome) is a hormonal disorder affecting
            women of reproductive age. Early detection and lifestyle
            management can significantly improve long-term health outcomes.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate("/predict/pcos")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Take Assessment Again
          </button>

          <ReportDownload data={state} />
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          ⚠️ This AI prediction is for educational purposes only and does not replace professional medical advice.
        </p>

      </div>
    </div>
  );
}