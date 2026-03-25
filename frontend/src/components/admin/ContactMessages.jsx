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

  // handleDelete function yahan se nikal diya gaya hai

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Contact Inquiries
        </h3>
        <p className="text-sm text-slate-500">
          Messages received from the website contact form.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <th className="px-6 py-4">Sender Details</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Message Content</th>
              <th className="px-6 py-4">Date Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {messages.map((msg) => (
              <tr
                key={msg._id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                    {msg.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {msg.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded text-[10px] font-black uppercase tracking-tight">
                    {msg.subject}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-600 dark:text-slate-300 text-sm italic max-w-md leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                    "{msg.message}"
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-400 text-[11px] font-bold">
                    {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {messages.length === 0 && !loading && (
        <div className="p-12 text-center">
          <p className="text-slate-400 font-medium italic">
            No messages found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
