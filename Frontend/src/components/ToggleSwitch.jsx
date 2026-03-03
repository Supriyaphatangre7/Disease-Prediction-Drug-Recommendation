export default function ToggleSwitch({ label, name, value, onChange }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="font-medium">{label}</span>

      <button
        type="button"
        onClick={() =>
          onChange({ target: { name, value: value === 1 ? 0 : 1 } })
        }
        className={`w-14 h-8 flex items-center rounded-full p-1 transition duration-300 ${
          value === 1 ? "bg-[#0F8E95]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
            value === 1 ? "translate-x-6" : ""
          }`}
        ></div>
      </button>
    </div>
  );
}