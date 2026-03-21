import React, { useState } from "react";

const Volunteer = () => {
  const initial = { name: "", phone: "", helpText: "" };
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to submit");
      alert("Application submitted successfully!");
      setForm(initial);
    } catch (err) {
      alert(`Submit failed: ${err?.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Join Our Mission</h2>
        <p className="text-center text-gray-500 mb-6">Register to volunteer at Beghar Nivara Kendra</p>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="+91 9876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">How can you help?</label>
            <textarea
              required
              rows="3"
              placeholder="E.g., I can help teach kids, distribute food, etc."
              value={form.helpText}
              onChange={(e) => setForm({ ...form, helpText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            disabled={submitting}
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition duration-300"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;