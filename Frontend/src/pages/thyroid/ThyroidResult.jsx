import { useLocation, useNavigate } from "react-router-dom";
import ReportDownload from "../../components/ReportDownload";

export default function ThyroidResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const probability = state?.probability ? state.probability : 0;
  const probabilityPercent = (probability * 100).toFixed(2);
  const result = state?.result || "Result Not Available";

  const isHypo = result.toLowerCase().includes("hypo");
  const isHyper = result.toLowerCase().includes("hyper");
  const isNormal = result.toLowerCase().includes("normal");

  const getColor = () => {
    if (isHypo) return "text-blue-600";
    if (isHyper) return "text-red-600";
    return "text-green-600";
  };

  const getBarColor = () => {
    if (isHypo) return "bg-blue-500";
    if (isHyper) return "bg-red-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Thyroid Risk Assessment
        </h1>

        {/* Result */}
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-bold ${getColor()}`}>
            {result}
          </h2>
          <p className="text-gray-600 mt-2">
            Score: {probabilityPercent}%
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
            Your hormone values indicate {result}.
            This is an AI-based analysis and not a confirmed diagnosis.
            Please consult an endocrinologist for confirmation.
          </p>
        </div>

        {/* Medication */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">💊 Recommended Medication</h3>

          {isHypo && (
            <p className="text-sm text-gray-700">
              <strong>Levothyroxine</strong> – Replaces deficient thyroid hormone.
            </p>
          )}

          {isHyper && (
            <p className="text-sm text-gray-700">
              <strong>Methimazole / Propylthiouracil</strong> – Reduces excess hormone production.
            </p>
          )}

          {isNormal && (
            <p className="text-sm text-green-600">
              No medication required. Thyroid levels are within normal range.
            </p>
          )}
        </div>

        {/* Lifestyle */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">🧘 Lifestyle Recommendations</h3>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Maintain balanced diet</li>
            <li>• Regular exercise</li>
            <li>• Periodic thyroid testing</li>
            <li>• Maintain healthy weight</li>
          </ul>
        </div>

        {/* About */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">About Thyroid Disorder</h3>
          <p className="text-sm text-gray-700">
            The thyroid gland controls metabolism and energy balance.
            Hormone imbalance may lead to Hypothyroidism or Hyperthyroidism.
            Early detection prevents complications.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate("/predict/thyroid")}
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