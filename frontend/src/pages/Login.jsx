import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Page ko reload hone se rokta hai
    // Dummy redirect - seedha Admin Dashboard par bhej do
    navigate('/admin-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Staff Login</h2>
        
        {/* onSubmit add kiya hai */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email ID</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" // type="button" se "submit" kar diya taaki 'Enter' key kaam kare
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;