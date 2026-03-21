import { useLocation } from "react-router-dom";
import { useState } from "react";

const ReportForm = () => {
  const location = useLocation();
  const person = location.state;

  const [formData, setFormData] = useState({
    reporterName: "",
    phone: "",
    relation: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reporterName || !formData.phone || !formData.relation) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          personName: person?.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Report submitted successfully!");
        setFormData({
          reporterName: "",
          phone: "",
          relation: "",
          message: "",
        });
      } else {
        alert("❌ Failed to submit report");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server error");
    }
  };

  return (
    <div className="pt-24 flex justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Report Missing Person
        </h2>

        <p className="mb-4">
          Reporting for: <b>{person?.name}</b>
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="reporterName"
            placeholder="Your Name"
            required
            value={formData.reporterName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="relation"
            placeholder="Relation (Father, Brother...)"
            required
            value={formData.relation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="message"
            placeholder="Additional info"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button className="bg-green-600 text-white py-2 w-full rounded">
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
};

export default ReportForm;