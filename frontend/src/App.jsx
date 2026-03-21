import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import MissingPeople from './pages/MissingPeople';
import RescueRequest from './pages/RescueRequest';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Login from './pages/Login';
import Volunteer from './pages/Volunteer';
import AdminDashboard from './pages/AdminDashboard';

const AppContent = () => {
  const location = useLocation();
  
  // Checking if the current route is the admin dashboard
  const isAdminRoute = location.pathname === '/admin-dashboard';

  return (
    <>
      {/* Show Navbar only if it's not the Admin Dashboard */}
      {!isAdminRoute && <Navbar />}

      {/* Remove top padding on admin route so the sidebar touches the top */}
      <div className={`${!isAdminRoute ? 'pt-20' : ''} min-h-screen flex flex-col font-sans`}>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/missing" element={<MissingPeople />} />
            <Route path="/rescue" element={<RescueRequest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/volunteer" element={<Volunteer />} />
            
            {/* Admin Dashboard Route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Show Footer only if it's not the Admin Dashboard */}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;