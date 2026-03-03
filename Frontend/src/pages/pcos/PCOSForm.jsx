import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../components/StepProgress";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function PCOSForm() {
  const navigate = useNavigate();
  const totalSteps = 6;
  const [step, setStep] = useState(1);
  const [ultrasound, setUltrasound] = useState(null);

  const [formData, setFormData] = useState({
    "Age (yrs)": "",
    "Weight (Kg)": "",
    "Height(Cm)": "",
    "BMI": "",
    "Cycle(R/I)": "",
    "Cycle length(days)": "",
    "Marraige Status (Yrs)": "",
    "Pregnant(Y/N)": 0,
    "No. of abortions": "",
    "AMH(ng/mL)": "",
    "TSH (mIU/L)": "",
    "FSH(mIU/mL)": "",
    "LH(mIU/mL)": "",
    "Weight gain(Y/N)": 0,
    "hair growth(Y/N)": 0,
    "Pimples(Y/N)": 0,
    "Hair loss(Y/N)": 0,
    "Skin darkening (Y/N)": 0,
    "Fast food (Y/N)": 0,
    "Reg.Exercise(Y/N)": 0
  });

  // ✅ BMI AUTO CALCULATION
  useEffect(() => {
    const weight = parseFloat(formData["Weight (Kg)"]);
    const height = parseFloat(formData["Height(Cm)"]);

    if (weight > 0 && height > 0) {
      const bmi = weight / ((height / 100) ** 2);
      setFormData(prev => ({ ...prev, "BMI": bmi.toFixed(2) }));
    }
  }, [formData["Weight (Kg)"], formData["Height(Cm)"]]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("symptoms", JSON.stringify(formData));
      if (ultrasound) data.append("ultrasound", ultrasound);

      const res = await axios.post(
        "http://127.0.0.1:8000/predict/pcos",
        data
      );

      navigate("/result/pcos", { state: res.data });
    } catch {
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-8">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-[#0F8E95] mb-6">
          PCOS Clinical Test
        </h2>

        <StepProgress step={step} totalSteps={totalSteps} />

        {/* STEP 1 */}
        {step === 1 && (
          <>
            {["Age (yrs)", "Weight (Kg)", "Height(Cm)"].map(field => (
              <input key={field}
                name={field}
                type="number"
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="input input-bordered w-full mb-4"
              />
            ))}

            <input
              name="BMI"
              value={formData["BMI"]}
              readOnly
              className="input input-bordered w-full mb-4 bg-gray-100"
            />

            <select name="Cycle(R/I)"
              value={formData["Cycle(R/I)"]}
              onChange={handleChange}
              className="select select-bordered w-full mb-4"
            >
              <option value="">Cycle Type</option>
              <option value={0}>Regular</option>
              <option value={1}>Irregular</option>
            </select>

            <input
              name="Cycle length(days)"
              type="number"
              value={formData["Cycle length(days)"]}
              onChange={handleChange}
              placeholder="Cycle Length (days)"
              className="input input-bordered w-full mb-4"
            />

            <button onClick={() => setStep(2)}
              className="btn bg-[#0F8E95] text-white">
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              name="Marraige Status (Yrs)"
              type="number"
              value={formData["Marraige Status (Yrs)"]}
              onChange={handleChange}
              placeholder="Marriage Duration (years)"
              className="input input-bordered w-full mb-4"
            />

            <ToggleSwitch label="Pregnant"
              name="Pregnant(Y/N)"
              value={formData["Pregnant(Y/N)"]}
              onChange={handleChange}
            />

            <input
              name="No. of abortions"
              type="number"
              value={formData["No. of abortions"]}
              onChange={handleChange}
              placeholder="Number of Abortions"
              className="input input-bordered w-full mb-4"
            />

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn">Back</button>
              <button onClick={() => setStep(3)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {["AMH(ng/mL)", "TSH (mIU/L)", "FSH(mIU/mL)", "LH(mIU/mL)"].map(field => (
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
              <button onClick={() => setStep(2)} className="btn">Back</button>
              <button onClick={() => setStep(4)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            {[
              "Weight gain(Y/N)",
              "hair growth(Y/N)",
              "Pimples(Y/N)",
              "Hair loss(Y/N)",
              "Skin darkening (Y/N)"
            ].map(field => (
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

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <ToggleSwitch
              label="Fast Food"
              name="Fast food (Y/N)"
              value={formData["Fast food (Y/N)"]}
              onChange={handleChange}
            />

            <ToggleSwitch
              label="Regular Exercise"
              name="Reg.Exercise(Y/N)"
              value={formData["Reg.Exercise(Y/N)"]}
              onChange={handleChange}
            />

            <div className="flex justify-between">
              <button onClick={() => setStep(4)} className="btn">Back</button>
              <button onClick={() => setStep(6)} className="btn bg-[#0F8E95] text-white">Next</button>
            </div>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-6"
              onChange={(e) => setUltrasound(e.target.files[0])}
            />

            <div className="flex justify-between">
              <button onClick={() => setStep(5)} className="btn">Back</button>
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