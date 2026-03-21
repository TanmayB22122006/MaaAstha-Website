import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, subtitle, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${colorClass}`}>{value}</p>
    <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
  </div>
);

const DashboardOverview = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Shelter Overview</h1>
      <p className="text-gray-500">Current status and recent activities at Maa Astha.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Sheltered" value="142" subtitle="+3 this week" colorClass="text-blue-600" />
      <StatCard title="Recently Added" value="12" subtitle="Last 7 days" colorClass="text-orange-500" />
      <StatCard title="Reunited" value="89" subtitle="All time" colorClass="text-green-500" />
      <StatCard title="Medical Needs" value="15" subtitle="Requires attention" colorClass="text-red-500" />
    </div>
  </div>
);

const AddPerson = () => {
  const initialForm = { 
    name: '', age: '', gender: 'Select', 
    location: '', image: '', identificationMarks: '', 
    clothing: '', description: '', status: 'Sheltered' 
  };
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const body = new FormData();
      body.append("name", formData.name);
      body.append("age", String(formData.age));
      body.append("gender", formData.gender);
      body.append("location", formData.location);
      body.append("identificationMarks", formData.identificationMarks || "");
      body.append("clothing", formData.clothing || "");
      body.append("description", formData.description);
      body.append("status", formData.status || "Sheltered");
      if (formData.image instanceof File) body.append("image", formData.image);

      const res = await fetch("/api/people", {
        method: "POST",
        body,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed to save record");
      }

      alert("Record saved successfully!");
      setFormData(initialForm);
    } catch (err) {
      alert(`Save failed: ${err?.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Person Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Row 1: Name, Age, Gender */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required placeholder="e.g. Unknown or John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approx. Age</label>
            <input type="number" required placeholder="e.g. 45"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
              <option value="Select" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 2: Location and Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Found</label>
            <input type="text" required placeholder="Detailed location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <input type="file" accept="image/*"
              className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={e => setFormData({...formData, image: e.target.files[0]})} />
          </div>
        </div>

        {/* Row 3: Identification Marks & Clothing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Identification Marks</label>
            <input type="text" placeholder="Scars, birthmarks, tattoos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.identificationMarks} onChange={e => setFormData({...formData, identificationMarks: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clothes Found Wearing</label>
            <input type="text" placeholder="e.g. Blue shirt, black pants..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.clothing} onChange={e => setFormData({...formData, clothing: e.target.value})} />
          </div>
        </div>

        {/* Row 4: Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Physical Condition & Medical Needs</label>
          <textarea rows="3" required placeholder="Describe their mental/physical state, any immediate medical requirements..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => setFormData(initialForm)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
            Clear Form
          </button>
          <button disabled={saving} type="submit" className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm font-medium">
            {saving ? "Saving..." : "Save Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/people");
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to load records");
      setRecords(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setError(e?.message || "Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (record) => {
    if (!record?._id) return;
    const ok = window.confirm(`Delete record for "${record.name}"? This cannot be undone.`);
    if (!ok) return;
    try {
      setDeletingId(record._id);
      const res = await fetch(`/api/people/${record._id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Delete failed");
      setRecords((prev) => prev.filter((r) => r._id !== record._id));
    } catch (e) {
      alert(`Delete failed: ${e?.message || "Unknown error"}`);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Shelter Records</h2>
        <button
          type="button"
          onClick={load}
          className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <div className="p-6 text-gray-600">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-600">{error}</div>
      ) : records.length === 0 ? (
        <div className="p-6 text-gray-600">No records yet.</div>
      ) : (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-sm border-b">
            <th className="p-4">Name</th>
            <th className="p-4">Age</th>
            <th className="p-4">Location Found</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((record) => (
            <tr key={record._id} className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-800">{record.name}</td>
              <td className="p-4 text-gray-600">{record.age}</td>
              <td className="p-4 text-gray-600">{record.location}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  record.status === 'Reunited' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {record.status}
                </span>
              </td>
              <td className="p-4 text-right">
                <button
                  type="button"
                  disabled={deletingId === record._id}
                  onClick={() => remove(record)}
                  className="text-sm px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === record._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/donations");
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to load donations");
        if (mounted) setDonations(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load donations");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Donations</h2>
        <span className="text-sm text-gray-500">{donations.length} records</span>
      </div>
      {loading ? (
        <div className="p-6 text-gray-600">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-600">{error}</div>
      ) : donations.length === 0 ? (
        <div className="p-6 text-gray-600">No donations yet.</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Mode</th>
              <th className="p-4">Phone/Email</th>
              <th className="p-4">Ref</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50 align-top">
                <td className="p-4 font-medium text-gray-800">
                  <div>{d.name}</div>
                  {d.message ? <div className="text-xs text-gray-500 mt-1">{d.message}</div> : null}
                </td>
                <td className="p-4 text-gray-600">₹{d.amount}</td>
                <td className="p-4 text-gray-600">{d.paymentMode}</td>
                <td className="p-4 text-gray-600">
                  <div>{d.phone || "-"}</div>
                  <div className="text-xs text-gray-500">{d.email || "-"}</div>
                </td>
                <td className="p-4 text-gray-600">{d.referenceId || "-"}</td>
                <td className="p-4 text-gray-600">
                  {d.createdAt ? new Date(d.createdAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/volunteers");
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to load volunteers");
        if (mounted) setVolunteers(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load volunteers");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Volunteers</h2>
        <span className="text-sm text-gray-500">{volunteers.length} records</span>
      </div>
      {loading ? (
        <div className="p-6 text-gray-600">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-600">{error}</div>
      ) : volunteers.length === 0 ? (
        <div className="p-6 text-gray-600">No volunteer applications yet.</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">How can help</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {volunteers.map((v) => (
              <tr key={v._id} className="hover:bg-gray-50 align-top">
                <td className="p-4 font-medium text-gray-800">{v.name}</td>
                <td className="p-4 text-gray-600">{v.phone}</td>
                <td className="p-4 text-gray-600">{v.helpText}</td>
                <td className="p-4 text-gray-600">
                  {v.createdAt ? new Date(v.createdAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const RescueRequests = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/rescue-requests");
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to load rescue requests");
        if (mounted) setItems(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load rescue requests");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Rescue Requests</h2>
        <span className="text-sm text-gray-500">{items.length} records</span>
      </div>
      {loading ? (
        <div className="p-6 text-gray-600">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-600">{error}</div>
      ) : items.length === 0 ? (
        <div className="p-6 text-gray-600">No rescue requests yet.</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
              <th className="p-4">Location</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Reporter</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Photo</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50 align-top">
                <td className="p-4 font-medium text-gray-800">{r.location}</td>
                <td className="p-4 text-gray-600">{r.condition}</td>
                <td className="p-4 text-gray-600">{r.reporterName || "-"}</td>
                <td className="p-4 text-gray-600">{r.reporterPhone}</td>
                <td className="p-4 text-gray-600">
                  {r.photoUrl ? (
                    <a className="text-blue-600 hover:underline" href={r.photoUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-4 text-gray-600">{r.status}</td>
                <td className="p-4 text-gray-600">{r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// --- MAIN DASHBOARD LAYOUT ---

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); // <-- Added hook here

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'add', label: 'Add Person', icon: '➕' },
    { id: 'records', label: 'View Records', icon: '📁' },
    { id: 'donations', label: 'Donations', icon: '💰' },
    { id: 'volunteers', label: 'Volunteers', icon: '🤝' },
    { id: 'rescues', label: 'Rescue Alerts', icon: '🚨' },
  ];

  const handleLogout = () => {
    navigate('/admin'); // <-- Navigates back to the login page
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'add': return <AddPerson />;
      case 'records': return <Records />;
      case 'donations': return <Donations />;
      case 'volunteers': return <Volunteers />;
      case 'rescues': return <RescueRequests />;
      default: return <DashboardOverview />;
    }
  };

  return (
    // 'h-screen' ensures the dashboard takes the full window height
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-600">Maa Astha</h2>
          <p className="text-xs text-gray-500 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <button onClick={handleLogout} className="text-sm text-red-600 font-medium hover:underline">Logout</button>
        </header>
        
        {/* Dynamic View Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;