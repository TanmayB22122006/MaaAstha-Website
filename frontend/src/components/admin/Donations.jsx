import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, TrendingUp, DollarSign } from "lucide-react";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("pending");

  const loadDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/donations/all");
      const json = await res.json();
      if (json.success) setDonations(json.data);
    } catch (e) {
      console.error("Failed to load donations", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  // --- Donation Stats Calculation Logic ---
  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let monthlyTotal = 0;
    let yearlyTotal = 0;

    donations.forEach((d) => {
      if (d.status === "Verified") {
        const dDate = new Date(d.createdAt || Date.now()); // Fallback agar date na ho
        const dAmount = parseFloat(d.amount) || 0;

        // Yearly Calculation
        if (dDate.getFullYear() === currentYear) {
          yearlyTotal += dAmount;
          // Monthly Calculation
          if (dDate.getMonth() === currentMonth) {
            monthlyTotal += dAmount;
          }
        }
      }
    });

    return { monthlyTotal, yearlyTotal };
  };

  const { monthlyTotal, yearlyTotal } = calculateStats();

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`))
      return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/donations/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) loadDonations();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Khatarnak Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none text-white relative overflow-hidden">
          <TrendingUp className="absolute right-[-10px] bottom-[-10px] size-24 opacity-20" />
          <p className="text-emerald-100 font-bold uppercase text-[11px] tracking-wider">
            This Month's Collection
          </p>
          <h2 className="text-3xl font-black mt-1">
            ₹{monthlyTotal.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none text-white relative overflow-hidden">
          <DollarSign className="absolute right-[-10px] bottom-[-10px] size-24 opacity-20" />
          <p className="text-indigo-100 font-bold uppercase text-[11px] tracking-wider">
            Annual Total ({new Date().getFullYear()})
          </p>
          <h2 className="text-3xl font-black mt-1">
            ₹{yearlyTotal.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* --- Original Table Content --- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Donation Records
            </h3>
            <p className="text-sm text-slate-500">
              Track and verify all incoming contributions.
            </p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
            <button
              onClick={() => setViewMode("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                viewMode === "pending"
                  ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                viewMode === "all"
                  ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              All History
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="px-6 py-4">Donor Details</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Transaction Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {donations
                .filter((d) => viewMode === "all" || d.status === "Pending")
                .map((d) => (
                  <tr
                    key={d._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {d.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-medium">
                        {d.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                        ₹{d.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        ID: {d.transactionId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border shadow-sm ${
                          d.status === "Verified"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                            : d.status === "Rejected"
                              ? "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                              : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {d.status === "Pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(d._id, "Verified")
                              }
                              className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800/50 dark:hover:bg-indigo-600 dark:hover:text-white dark:hover:border-transparent"
                            >
                              <CheckCircle size={14} strokeWidth={2.5} /> Verify
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(d._id, "Rejected")
                              }
                              className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white dark:bg-amber-900/40 dark:text-indigo-400 dark:border-amber-800/50 dark:hover:bg-amber-600 dark:hover:text-white dark:hover:border-transparent"
                            >
                              <XCircle size={14} strokeWidth={2.5} /> Reject
                            </button>
                          </>
                        ) : (
                          <span
                            className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg border ${
                              d.status === "Verified"
                                ? "bg-emerald-50/50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                : "bg-amber-50/50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                            }`}
                          >
                            {d.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {donations.length === 0 && !loading && (
          <div className="p-12 text-center">
            <p className="text-slate-400 font-medium italic">
              No donations found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donations;
