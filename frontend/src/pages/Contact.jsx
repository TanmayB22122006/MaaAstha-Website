import React from "react";

const Contact = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Koi sawal hai? Ya kisi ki madad karna chahte hain? Humse sampark karein, humari team jald hi aapse baat karegi.
          </p>
        </div>

        {/* Contact Layout Container */}
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Left Side - Contact Info (Dark Green Card) */}
          <div className="md:w-1/3 bg-ngo-dark text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Our Location</h3>
                    <p className="leading-relaxed">
                      Maa Astha Shelter Home,<br />
                      Near Station Road, Kalyan West,<br />
                      Maharashtra, India - 421301
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Phone Number</h3>
                    <p className="font-mono text-lg">+91 98765 43210</p>
                    <p className="text-sm text-gray-400 mt-1">Available 24/7 for emergencies</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <span className="text-2xl mr-4">✉️</span>
                  <div>
                    <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-1">Email Address</h3>
                    <p className="font-mono">contact@maaastha.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media placeholders */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <h3 className="font-semibold text-ngo-light uppercase tracking-wider text-sm mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-ngo-green transition">🌐</div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-ngo-green transition">📘</div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-ngo-green transition">📸</div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form (White Card) */}
          <div className="md:w-2/3 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-ngo-dark mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition" 
                    placeholder="+91 00000 00000" 
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition" 
                  placeholder="john@example.com" 
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition bg-white">
                  <option>General Inquiry</option>
                  <option>Volunteer Application</option>
                  <option>Donation Related</option>
                  <option>Missing Person Info</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition resize-none" 
                  rows="5" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-ngo-green text-white font-bold py-4 rounded-lg hover:bg-ngo-dark transition-colors duration-300 shadow-md text-lg"
              >
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