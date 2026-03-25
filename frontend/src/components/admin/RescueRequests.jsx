import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck, Ban, MapPin, User, Phone } from "lucide-react";

const RescueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("active");

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/rescue-requests/all");
      const json = await res.json();
      if (json.success) setRequests(json.data);
    } catch (e) {
      console.error("Failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Mark this alert as ${newStatus}?`)) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/rescue-requests/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) loadRequests();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  // handleDelete function yahan se hata diya gaya hai

  const filtered = requests.filter((r) =>
    viewMode === "active" ? r.status === "Pending" : r.status !== "Pending",
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Rescue Alerts & Requests
          </h3>
          <p className="text-sm text-slate-500">
            Real-time reports from the public regarding people in need.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode("active")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${viewMode === "active" ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}
          >
            Active Alerts
          </button>
          <button
            onClick={() => setViewMode("history")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${viewMode === "history" ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Location Detail</th>
              <th className="px-6 py-4">Situation / Message</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-12 text-center text-slate-400 italic"
                >
                  Loading rescue requests...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-12 text-center text-slate-400 italic"
                >
                  No alerts found in this category.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                        <User size={14} className="text-slate-400" /> {r.name}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                        <Phone size={12} /> {r.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-xs">
                      <MapPin
                        size={14}
                        className="text-rose-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {r.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                        "{r.message}"
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                        <Clock size={10} />{" "}
                        {new Date(r.createdAt).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      {r.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(r._id, "Rescued")}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-600"
                          >
                            <ShieldCheck size={12} strokeWidth={3} /> Rescued
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(r._id, "Invalid")}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-600"
                          >
                            <Ban size={12} strokeWidth={3} /> Invalid
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border shadow-sm ${r.status === "Rescued" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400"}`}
                        >
                          {r.status}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RescueRequests;
