import React, { useState } from "react";

const RescueRequest = () => {
  const initial = {
    location: "",
    condition: "",
    reporterName: "",
    reporterPhone: "",
    photo: null,
  };
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("location", form.location);
      body.append("condition", form.condition);
      body.append("reporterName", form.reporterName || "");
      body.append("reporterPhone", form.reporterPhone);
      if (form.photo instanceof File) body.append("photo", form.photo);

      const res = await fetch("/api/rescue-requests", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to send rescue alert");

      alert("Rescue alert sent! Our team will contact you soon.");
      setForm(initial);
    } catch (err) {
      alert(`Submit failed: ${err?.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-red-100 text-ngo-red px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-4 animate-pulse">
            🚨 EMERGENCY RESPONSE
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark mb-4">
            Request a Rescue
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Agar aapko sadak par koi beghar, bimar ya mentally challenged insaan dikhe jise turant madad ki zaroorat hai, toh ye form bharein.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Emergency Info & Guidelines */}
          <div className="lg:w-1/3 space-y-6">
            {/* Direct Call Box */}
            <div className="bg-ngo-red text-white p-8 rounded-2xl shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Need Urgent Help?</h2>
              <p className="text-red-100 mb-6">Form bharne ka time nahi hai? Direct call karein:</p>
              <div className="bg-white text-ngo-red text-3xl font-mono font-bold py-4 rounded-xl shadow-inner">
                +91 98765 43210
              </div>
              <p className="mt-4 text-sm font-medium">Available 24/7 in Navi Mumbai/Kalyan</p>
            </div>

            {/* Guidelines */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="font-bold text-ngo-dark text-lg mb-4 flex items-center gap-2">
                📋 Rescue Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-ngo-green">✓</span>
                  Kripya exact location aur landmark batayein.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ngo-green">✓</span>
                  Agar possible ho, toh team aane tak us insaan ke paas hi rahein.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ngo-green">✓</span>
                  Dur se ek photo zaroor kheenchiye aur upload karein, isse team ko dhundne mein aasaani hoti hai.
                </li>
                <li className="flex items-start gap-2 text-ngo-red font-semibold">
                  <span>⚠️</span>
                  Fake requests na dalein, ye kisi ki jaan ka sawal ho sakta hai.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Rescue Form */}
          <div className="lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-ngo-red">
            <h2 className="text-2xl font-heading font-bold text-ngo-dark mb-6">Rescue Details Form</h2>
            
            <form onSubmit={submit} className="space-y-6">
              
              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Exact Location / Landmark <span className="text-ngo-red">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-red focus:border-ngo-red outline-none transition" 
                  placeholder="E.g., Outside Kalyan Station Platform 1 ticket counter" 
                />
              </div>

              {/* Person Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description of the Person's Condition <span className="text-ngo-red">*</span>
                </label>
                <textarea 
                  required
                  rows="3"
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-red focus:border-ngo-red outline-none transition resize-none" 
                  placeholder="Kapde kaise pehne hain? Chot lagi hai kya? Age kitni lag rahi hai?" 
                ></textarea>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upload Photo (Optional but Highly Recommended)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] || null })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-ngo-red hover:file:bg-red-100 transition" 
                />
              </div>

              {/* Reporter Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    value={form.reporterName}
                    onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-red focus:border-ngo-red outline-none transition" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Phone Number <span className="text-ngo-red">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={form.reporterPhone}
                    onChange={(e) => setForm({ ...form, reporterPhone: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-red focus:border-ngo-red outline-none transition" 
                    placeholder="So we can contact you" 
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-ngo-red text-white font-bold text-lg py-4 rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg mt-4 flex justify-center items-center gap-2"
              >
                <span>🚨</span> {submitting ? "Sending..." : "Send Rescue Alert"}
              </button>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RescueRequest;