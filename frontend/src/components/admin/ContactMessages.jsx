import React, { useState, useEffect } from "react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contacts/all");
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (e) {
      console.error("Failed to load messages", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadMessages();
    } catch (e) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Public Inquiries</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">Messages from Contact Us page</span>
        </div>
        <span className="text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">
          {messages.length} Messages
        </span>
      </div>
      
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-b dark:border-gray-700">
              <th className="p-4 font-semibold uppercase tracking-wider">Sender Info</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Subject</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Message</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Date</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">Loading messages...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">No messages found.</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{msg.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{msg.phone}</div>
                    {msg.email && <div className="text-xs text-gray-500 dark:text-gray-400">{msg.email}</div>}
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold">
                      {msg.subject}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300 text-sm max-w-md">
                    {msg.message}
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(msg.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(msg._id)}
                      className="text-xs font-bold uppercase bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-sm"
                    >
                      Delete
                    </button>
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

export default ContactMessages;