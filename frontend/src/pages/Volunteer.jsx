import React, { useState } from "react";

const Volunteer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    idProof: "",
    age: "",
    designation: "",
    address: "",
    email: "",
    phone: "",
    helpType: "",
    availableDate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/volunteers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Success! We will contact you.");
        setFormData({
          name: "",
          idProof: "",
          age: "",
          designation: "",
          address: "",
          email: "",
          phone: "",
          helpType: "",
          availableDate: "",
          message: "",
        });
        setStep(1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Volunteer Form (Step {step}/2)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="p-3 border rounded w-full md:col-span-2"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="ID Proof No *"
                className="p-3 border rounded"
                required
                value={formData.idProof}
                onChange={(e) =>
                  setFormData({ ...formData, idProof: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Age *"
                className="p-3 border rounded"
                required
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Designation"
                className="p-3 border rounded"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone *"
                className="p-3 border rounded"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email *"
                className="p-3 border rounded md:col-span-2"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                placeholder="Address *"
                className="p-3 border rounded md:col-span-2"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              <select
                className="p-3 border rounded w-full"
                required
                value={formData.helpType}
                onChange={(e) =>
                  setFormData({ ...formData, helpType: e.target.value })
                }
              >
                <option value="">Help Type *</option>
                <option value="Food">Food Distribution</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical Support</option>
              </select>
              <input
                type="date"
                className="p-3 border rounded w-full"
                required
                value={formData.availableDate}
                onChange={(e) =>
                  setFormData({ ...formData, availableDate: e.target.value })
                }
              />
              <textarea
                placeholder="Message"
                className="p-3 border rounded w-full"
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          )}
          <div className="flex gap-4">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-400 text-white py-3 rounded-lg"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold"
            >
              {step === 1 ? "Next" : loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
