import React, { useState, useEffect } from "react";

const MissingReports = () => {
  const [reports, setReports] = useState([]);
  const [publishedPersons, setPublishedPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("claims"); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialForm = {
    name: "",
    age: "",
    missingSince: "",
    location: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reportsRes, publishedRes] = await Promise.all([
        fetch("http://localhost:5000/api/reports/all"),
        fetch("http://localhost:5000/api/missing-persons/all")
      ]);
      const reportsJson = await reportsRes.json();
      const publishedJson = await publishedRes.json();
      
      if (reportsJson.success) setReports(reportsJson.data);
      if (publishedJson.success) setPublishedPersons(publishedJson.data);
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Delete this claim permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reports/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadData();
    } catch (e) {
      alert("Failed to delete claim");
    }
  };

  const handleDeletePublished = async (id) => {
    if (!window.confirm("Remove this case from the public website?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/missing-persons/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadData();
    } catch (e) {
      alert("Failed to delete record");
    }
  };

  const handlePublishSubmit = async (e) => {
    e.preventDefault();
    if (publishedPersons.length >= 6) {
      alert("You can only publish up to 6 missing persons at a time.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          dataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("http://localhost:5000/api/missing-persons/add", {
        method: "POST",
        body: dataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert("Case published to public website successfully!");
        setFormData(initialForm);
        document.getElementById("missing-photo-upload").value = "";
        loadData();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Server connection failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-red-600 dark:text-red-500 font-heading">Missing Persons Portal</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">Manage claims and public listings</span>
        </div>

        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg w-fit">
          <button
            onClick={() => setViewMode("claims")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              viewMode === "claims" ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Public Claims
          </button>
          <button
            onClick={() => setViewMode("manage")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              viewMode === "manage" ? "bg-white dark:bg-gray-600 text-red-600 dark:text-red-400 shadow-sm" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Publish Cases ({publishedPersons.length}/6)
          </button>
        </div>
      </div>
      
      {viewMode === "claims" && (
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-b dark:border-gray-700">
                <th className="p-4 font-semibold uppercase tracking-wider">Claimed Person</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Reporter Details</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Relationship</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Additional Info</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Date</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">Loading reports...</td></tr>
              ) : reports.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">No claims reported yet.</td></tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id} className="hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                        {report.personName}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{report.reporterName}</div>
                      <div className="text-sm text-red-600 dark:text-red-400 font-semibold mt-1">📞 {report.phone}</div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">{report.relation}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                      {report.message || <span className="text-gray-400 italic">No info</span>}
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{new Date(report.createdAt).toLocaleString("en-IN")}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDeleteReport(report._id)} className="text-xs font-bold uppercase bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-sm">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "manage" && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Post New Case</h3>
            {publishedPersons.length >= 6 && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm border border-yellow-200 dark:border-yellow-700/50">
                ⚠️ Maximum limit of 6 cases reached. Delete an older case to add a new one.
              </div>
            )}
            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age *</label>
                  <input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Missing Since *</label>
                  <input type="text" placeholder="e.g., 15 March 2026" required value={formData.missingSince} onChange={(e) => setFormData({...formData, missingSince: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Seen Location *</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Photo</label>
                <input type="file" id="missing-photo-upload" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 dark:file:bg-red-900/30 dark:file:text-red-400 hover:file:bg-red-100 dark:hover:file:bg-red-900/50 transition-colors" />
              </div>
              <button type="submit" disabled={isSubmitting || publishedPersons.length >= 6} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
                {isSubmitting ? "Publishing..." : "🚀 Publish to Website"}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Published Cases</h3>
            <div className="space-y-3">
              {publishedPersons.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">No cases published currently.</div>
              ) : (
                publishedPersons.map((person) => (
                  <div key={person._id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        {person.imageUrl ? (
                          <img src={`http://localhost:5000${person.imageUrl}`} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="flex items-center justify-center h-full text-gray-400">👤</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{person.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{person.location}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeletePublished(person._id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors">
                      Unpublish
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingReports;