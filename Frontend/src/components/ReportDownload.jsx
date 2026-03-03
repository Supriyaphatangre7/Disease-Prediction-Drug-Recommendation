import jsPDF from "jspdf";

export default function ReportDownload({ data }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CuraAI Clinical Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Result: ${data.result}`, 20, 40);
    doc.text(`Probability: ${(data.probability * 100).toFixed(2)}%`, 20, 50);

    doc.text("Drug Recommendation:", 20, 70);
    doc.text(data.drug_recommendation, 20, 80);

    doc.text("Lifestyle:", 20, 100);
    data.lifestyle_recommendation.forEach((item, i) => {
      doc.text(`- ${item}`, 20, 110 + i * 10);
    });

    doc.save("CuraAI_Report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="mt-6 btn bg-black text-white hover:bg-[#0F8E95]"
    >
      Download Report
    </button>
  );
}