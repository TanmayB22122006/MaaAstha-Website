import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Fingerprint,
  Briefcase,
} from "lucide-react";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/volunteers/all");
      const json = await res.json();
      if (json.success) setVolunteers(json.data);
    } catch (e) {
      console.error("Failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  const handleResolve = async (id) => {
    if (!window.confirm("Mark as resolved?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/volunteers/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Resolved" }),
        },
      );
      if (res.ok) loadVolunteers();
    } catch (e) {
      alert("Failed");
    }
  };

  // DELETE FUNCTION NIKAL DIYA HAI SURAKSHA KE LIYE

  if (loading)
    return (
      <div className="p-8 text-center dark:text-white">
        Loading Volunteers...
      </div>
    );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">
                Volunteer Name
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">
                Contact
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">
                Help Interest
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">
                Status
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {volunteers.map((v) => (
              <tr
                key={v._id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {v.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Age: {v.age || "N/A"}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                  <div>{v.phone}</div>
                  <div className="text-xs opacity-70">{v.email}</div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {v.helpType || "General"}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${v.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedVolunteer(v)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  {v.status !== "Resolved" && (
                    <button
                      onClick={() => handleResolve(v._id)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg"
                      title="Resolve"
                    >
                      <CheckSquare size={18} />
                    </button>
                  )}
                  {/* DELETE BUTTON REMOVED */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Detail Modal (Popup) --- */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Volunteer Details
              </h3>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fingerprint className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">ID Proof</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.idProof}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">Designation</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.designation || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-indigo-500" size={18} />{" "}
                  <div>
                    <p className="text-xs text-slate-500">Available Date</p>
                    <p className="text-sm font-medium dark:text-white">
                      {selectedVolunteer.availableDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t pt-4 dark:border-slate-700">
                <MapPin className="text-indigo-500 mt-1" size={18} />{" "}
                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="text-sm dark:text-white">
                    {selectedVolunteer.address}
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase mb-1">
                  Message / Help Info
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  "
                  {selectedVolunteer.message ||
                    "No additional message provided."}
                  "
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-right">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
