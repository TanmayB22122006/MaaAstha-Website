import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Ye state menu ko kholne aur band karne ka kaam karegi
  const [isOpen, setIsOpen] = useState(false);

  // Menu band karne ka function (jab koi link click kare)
  const closeMenu = () => setIsOpen(false);

  // Navbar ke saare links ek jagah (Manage karne mein aasan)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Missing People", path: "/missing" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Login", path: "/admin" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
              {/* Dummy Logo Icon */}
              <div className="w-10 h-10 bg-ngo-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="font-heading font-bold text-xl text-ngo-dark tracking-wide">
                Maa Astha
              </span>
            </Link>
          </div>

          {/* Desktop Menu (Laptop/PC pe dikhega, Mobile pe hide hoga) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                className="text-gray-600 hover:text-ngo-green font-medium transition duration-300"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200">
              <Link 
                to="/rescue" 
                className="text-ngo-red border border-ngo-red hover:bg-ngo-red hover:text-white px-4 py-2 rounded-md font-bold transition duration-300"
              >
                Emergency
              </Link>
              <Link 
                to="/donate" 
                className="bg-ngo-green hover:bg-ngo-dark text-white px-5 py-2 rounded-md font-bold transition duration-300 shadow-md"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Button (Sirf Mobile pe dikhega) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-ngo-dark hover:text-ngo-green focus:outline-none"
            >
              {/* Hamburger Icon (SVG) */}
              {isOpen ? (
                // Close (X) Icon
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // 3 Lines Icon
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown (Toggle hoga) */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-ngo-green hover:bg-green-50"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-3 px-3">
            <Link 
              to="/rescue" 
              onClick={closeMenu}
              className="w-full text-center text-ngo-red border border-ngo-red hover:bg-ngo-red hover:text-white px-4 py-3 rounded-md font-bold transition"
            >
              Rescue Emergency
            </Link>
            <Link 
              to="/donate" 
              onClick={closeMenu}
              className="w-full text-center bg-ngo-green hover:bg-ngo-dark text-white px-4 py-3 rounded-md font-bold transition shadow-md"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;