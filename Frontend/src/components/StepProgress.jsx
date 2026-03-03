export default function StepProgress({ step, totalSteps }) {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm mb-2 font-medium">
        <span>Step {step}</span>
        <span>{totalSteps} Steps</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-[#0F8E95] h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}