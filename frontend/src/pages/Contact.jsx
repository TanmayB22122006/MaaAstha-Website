import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("✅ Thank you! Your message has been sent.");
        setFormData({ name: "", phone: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server error! Please try again later.");
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark dark:text-white mb-4 transition-colors duration-300">
            Get In Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors duration-300">
            Koi sawal hai? Ya kisi ki madad karna chahte hain? Humse sampark karein, humari team jald hi aapse baat karegi.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Contact Info */}
          <div className="md:w-1/3 bg-ngo-dark text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Our Location</h3>
                    <p className="leading-relaxed">Maa Astha Shelter Home,<br />Near Station Road, Kalyan West,<br />Maharashtra, India - 421301</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Phone Number</h3>
                    <p className="font-mono text-lg">+91 98765 43210</p>
                    <p className="text-sm text-gray-400 mt-1">Available 24/7 for emergencies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">✉️</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Email Address</h3>
                    <p className="font-mono">contact@maaastha.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="md:w-2/3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-heading font-bold text-ngo-dark dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none">
                  <option>General Inquiry</option>
                  <option>Volunteer Application</option>
                  <option>Donation Related</option>
                  <option>Missing Person Info</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green resize-none" rows="5" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-ngo-green text-white font-bold py-4 rounded-lg hover:bg-ngo-dark transition-colors duration-300 shadow-md text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;