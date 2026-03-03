import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../components/StepProgress";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function ThyroidForm() {
  const navigate = useNavigate();
  const totalSteps = 5;
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    sex: 1,
    TSH: "",
    T3: "",
    TT4: "",
    T4U: "",
    FTI: "",
    on_thyroxine: 0,
    on_antithyroid_meds: 0,
    I131_treatment: 0,
    thyroid_surgery: 0,
    goitre: 0,
    tumor: 0,
    hypopituitary: 0,
    query_hypothyroid: 0,
    query_hyperthyroid: 0,
    sick: 0,
    pregnant: 0,
    lithium: 0,
    psych: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict/thyroid",
        formData
      );
      navigate("/result/thyroid", { state: res.data });
    } catch {
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-8">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-[#0F8E95] mb-6">
          Thyroid Clinical Test
        </h2>

        <StepProgress step={step} totalSteps={totalSteps} />

        {/* Step 1 */}
        {step === 1 && (
          <>
            <input name="age" type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="input input-bordered w-full mb-4"
            />

            <select name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="select select-bordered w-full mb-4"
            >
              <option value={1}>Female</option>
              <option value={0}>Male</option>
            </select>

            <button onClick={() => setStep(2)}
              className="btn bg-[#0F8E95] text-white">
              Next
            </button>
          </>
        )}

        {/* Step 2 Hormones */}
        {step === 2 && (
          <>
            {["TSH", "T3", "TT4", "T4U", "FTI"].map(field => (
              <input key={field}
                name={field}
                type="number"
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="input input-bordered w-full mb-4"
              />
            ))}

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn">Back</button>
              <button onClick={() => setStep(3)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* Step 3 Treatments */}
        {step === 3 && (
          <>
            {["on_thyroxine","on_antithyroid_meds","I131_treatment","thyroid_surgery"].map(field => (
              <ToggleSwitch
                key={field}
                label={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="btn">Back</button>
              <button onClick={() => setStep(4)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* Step 4 Conditions */}
        {step === 4 && (
          <>
            {["goitre","tumor","hypopituitary","query_hypothyroid","query_hyperthyroid","sick"].map(field => (
              <ToggleSwitch
                key={field}
                label={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="btn">Back</button>
              <button onClick={() => setStep(5)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* Step 5 Other */}
        {step === 5 && (
          <>
            {["pregnant","lithium","psych"].map(field => (
              <ToggleSwitch
                key={field}
                label={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-between">
              <button onClick={() => setStep(4)} className="btn">Back</button>
              <button onClick={handleSubmit} className="btn bg-green-600 text-white">
                Submit Test
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}