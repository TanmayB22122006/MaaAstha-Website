import React, { useState, useEffect } from "react";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialForm = {
    title: "",
    date: "",
    location: "",
    description: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialForm);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events/all");
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch (e) {
      console.error("Failed to load events", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadEvents();
    } catch (e) {
      alert("Failed to delete event");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          dataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("http://localhost:5000/api/events/add", {
        method: "POST",
        body: dataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert("Event published successfully!");
        setFormData(initialForm);
        document.getElementById("event-photo-upload").value = "";
        loadEvents();
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
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-heading">Manage Events</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">Add or remove NGO activities & events</span>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 h-fit">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Post New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title *</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., Winter Blanket Drive" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
              <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., Kalyan Railway Station" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
              <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Details about the event..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Photo *</label>
              <input type="file" required id="event-photo-upload" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50 transition-colors" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
              {isSubmitting ? "Publishing..." : "🗓️ Publish Event"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Past & Upcoming Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full p-6 text-center text-gray-500">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="col-span-full p-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">No events published yet.</div>
            ) : (
              events.map((evt) => (
                <div key={evt._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex flex-col">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                    <img src={`http://localhost:5000${evt.imageUrl}`} alt={evt.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2 py-1 rounded shadow">
                      {new Date(evt.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{evt.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">📍 {evt.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{evt.description}</p>
                    </div>
                    <button onClick={() => handleDelete(evt._id)} className="w-full text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold text-sm bg-red-50 dark:bg-red-900/20 py-2 rounded-lg transition-colors mt-auto">
                      Delete Event
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;