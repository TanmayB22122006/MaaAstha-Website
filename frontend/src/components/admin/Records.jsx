import React, { useState, useEffect } from "react";
import { Eye, Handshake, Search, RefreshCw } from "lucide-react";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("current");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [reunionModal, setReunionModal] = useState(null);
  const [reunionForm, setReunionForm] = useState({
    dateOfLeaving: "",
    receiverName: "",
    receiverRelation: "",
    receiverContact: "",
    receiverIdProof: "",
    receiverAddress: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/persons/all");
      const data = await response.json();
      if (data.success) setRecords(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const calculateDays = (arrival, leaving) => {
    if (!arrival) return "N/A";
    const start = new Date(arrival);
    const end = leaving ? new Date(leaving) : new Date();
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + " Days";
  };

  const handleReunionSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/persons/update/${reunionModal._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...reunionForm, status: "Reunited" }),
        },
      );
      if (response.ok) {
        setReunionModal(null);
        fetchRecords();
        alert("Status updated to Reunited!");
      }
    } catch (error) {
      alert("Error updating record");
    } finally {
      setIsUpdating(false);
    }
  };

  // handleDelete function yahan se hata diya gaya hai

  const filteredRecords = records.filter((person) => {
    const matchesSearch =
      person.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesView =
      viewMode === "current"
        ? person.status !== "Reunited"
        : person.status === "Reunited";
    return matchesSearch && matchesView;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 ring-indigo-500/20 dark:text-white transition-all outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode("current")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === "current"
                ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Currently in Shelter
          </button>
          <button
            onClick={() => setViewMode("reunited")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === "reunited"
                ? "bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Reunited Cases
          </button>
        </div>

        <button
          onClick={fetchRecords}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold border-b dark:border-slate-800">
                <th className="px-6 py-4">Ref. ID</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Stay Duration</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-12 text-center text-slate-400 italic"
                  >
                    Loading records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-12 text-center text-slate-400 italic"
                  >
                    No records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((person) => (
                  <tr
                    key={person._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-slate-400 uppercase tracking-tighter">
                      #{person._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {person.fullName || person.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {person.age || "N/A"} • {person.gender || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {calculateDays(
                        person.dateOfArrival,
                        person.dateOfLeaving,
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border shadow-sm ${
                          person.status === "Reunited"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400"
                        }`}
                      >
                        {person.status || "In Shelter"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => setSelectedPerson(person)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                          title="View Profile"
                        >
                          <Eye size={18} />
                        </button>

                        {person.status !== "Reunited" && (
                          <button
                            onClick={() => setReunionModal(person)}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-600 dark:hover:text-white"
                          >
                            <Handshake size={14} /> Reunited
                          </button>
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

      {/* Profile Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
              <div className="md:w-1/3 bg-slate-100 dark:bg-slate-800/50 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                <div className="w-40 h-40 rounded-3xl bg-white dark:bg-slate-700 shadow-xl overflow-hidden mb-6 border-4 border-white dark:border-slate-600 ring-4 ring-indigo-500/10">
                  {selectedPerson.imageUrl ? (
                    <img
                      src={`http://localhost:5000${selectedPerson.imageUrl}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      No Photo
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                  {selectedPerson.fullName || selectedPerson.name}
                </h3>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full">
                  Ref ID: #{selectedPerson._id.slice(-6)}
                </span>
              </div>

              <div className="flex-1 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                        <div>
                          <p className="text-slate-500">Full Name</p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {selectedPerson.fullName ||
                              selectedPerson.name ||
                              "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Age & Gender</p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {selectedPerson.age || "N/A"} •{" "}
                            {selectedPerson.gender || "N/A"}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-500">Location Found</p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {selectedPerson.address ||
                              selectedPerson.location ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-right">
              <button
                onClick={() => setSelectedPerson(null)}
                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reunited Update Modal */}
      {reunionModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Reunion Details - {reunionModal.fullName || reunionModal.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Please fill in the details of the receiver for legal records.
              </p>
            </div>
            <form onSubmit={handleReunionSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                    Date of Departure
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-indigo-500/20 text-sm"
                    onChange={(e) =>
                      setReunionForm({
                        ...reunionForm,
                        dateOfLeaving: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                    Receiver Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Who is receiving?"
                    className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-indigo-500/20 text-sm"
                    onChange={(e) =>
                      setReunionForm({
                        ...reunionForm,
                        receiverName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                    Relation with Person
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Parent, Friend"
                    className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-indigo-500/20 text-sm"
                    onChange={(e) =>
                      setReunionForm({
                        ...reunionForm,
                        receiverRelation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Active mobile number"
                    className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-indigo-500/20 text-sm"
                    onChange={(e) =>
                      setReunionForm({
                        ...reunionForm,
                        receiverContact: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                  ID Proof Detail
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aadhar Card Number / DL Number"
                  className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-indigo-500/20 text-sm"
                  onChange={(e) =>
                    setReunionForm({
                      ...reunionForm,
                      receiverIdProof: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setReunionModal(null)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Processing..." : "Confirm Reunion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;
