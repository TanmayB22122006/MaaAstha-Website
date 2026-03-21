import React, { useState } from "react";

const Donation = () => {
  const initial = {
    name: "",
    phone: "",
    email: "",
    amount: "",
    paymentMode: "UPI",
    referenceId: "",
    message: "",
  };
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to submit");
      alert("Thank you! Your donation info has been submitted.");
      setForm(initial);
    } catch (err) {
      alert(`Submit failed: ${err?.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark mb-4">
            Support Our Mission
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Aapka ek chhota sa yogdaan kisi beghar ko aashray, khana aur ek nayi zindagi de sakta hai.
          </p>
        </div>

        {/* Donation Details Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Bank Details */}
          <div className="md:w-1/2 p-8 md:p-12 bg-ngo-dark text-white">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
              <span className="mr-3">🏦</span> Bank Transfer
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-ngo-light mb-1 uppercase tracking-wider">Account Name</p>
                <p className="text-xl font-semibold">Maa Astha Shelter Project</p>
              </div>
              
              <div>
                <p className="text-sm text-ngo-light mb-1 uppercase tracking-wider">Account Number</p>
                <p className="text-xl font-mono tracking-widest">1234 5678 9012</p>
              </div>
              
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-ngo-light mb-1 uppercase tracking-wider">IFSC Code</p>
                  <p className="text-lg font-mono">SBIN000XXXX</p>
                </div>
                <div>
                  <p className="text-sm text-ngo-light mb-1 uppercase tracking-wider">Bank Name</p>
                  <p className="text-lg">State Bank of India</p>
                </div>
              </div>
            </div>

            {/* Tax Exemption Note */}
            <div className="mt-10 p-4 bg-white/10 rounded-lg border border-white/20">
              <p className="text-sm">
                <span className="font-bold text-yellow-400">Note:</span> All donations are eligible for tax exemption under Section 80G of the Income Tax Act.
              </p>
            </div>
          </div>

          {/* Right Side - UPI & QR + Donation Info */}
          <div className="md:w-1/2 p-8 md:p-12 bg-white">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-heading font-bold text-ngo-dark mb-6 flex items-center">
                <span className="mr-3">📱</span> Scan to Donate
              </h2>
              
              {/* QR Code Placeholder */}
              <div className="bg-gray-100 p-4 rounded-xl shadow-inner mb-6 border-2 border-dashed border-gray-300">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                  alt="Donation QR Code" 
                  className="w-48 h-48 opacity-80"
                />
              </div>
              
              <div className="text-center w-full">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Or use UPI ID</p>
                <div className="bg-gray-50 py-3 px-4 rounded-lg border border-gray-200 text-lg font-mono font-semibold text-ngo-dark inline-block w-full">
                  maaastha@upi
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-8 text-center">
                GPay, PhonePe, Paytm ya kisi bhi UPI app se scan karein.
              </p>
            </div>

            {/* Info form for admin tracking */}
            <div className="mt-10 border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share Donation Details (for receipt)</h3>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="Amount (INR)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green bg-white"
                    value={form.paymentMode}
                    onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Txn/UTR/Reference ID (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                  value={form.referenceId}
                  onChange={(e) => setForm({ ...form, referenceId: e.target.value })}
                />
                <textarea
                  rows="3"
                  placeholder="Message (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  disabled={saving}
                  type="submit"
                  className="w-full bg-ngo-green hover:bg-ngo-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                >
                  {saving ? "Submitting..." : "Submit Details"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donation;