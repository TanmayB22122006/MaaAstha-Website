import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <div 
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-center"
        // Ye abhi ke liye ek placeholder image hai, baad me asali image ki link daal dena
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        {/* Dark Overlay taaki text clear dikhe */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Text and Button content */}
        <div className="relative z-10 px-4 max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-10 tracking-wide uppercase">
            Helping families <br/> reunite with their <br/>
            <span className="text-red-500">missing</span> loved ones.
          </h1>
          
          {/* Circular Red Button (Figma jaisa) */}
          <Link 
            to="/missing" 
            className="bg-red-500 text-white font-bold rounded-full w-36 h-36 flex items-center justify-center hover:bg-red-600 transition duration-300 transform hover:scale-105 shadow-xl text-center leading-tight"
          >
            <span className="text-sm tracking-wider">FIND MISSING<br/>PEOPLE</span>
          </Link>
        </div>
      </div>

      {/* 2. ABOUT US SNIPPET SECTION (Placeholder for next step) */}
      <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
         <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">KNOW ABOUT US</h2>
         <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
           We provide a place for the homeless with special needs
         </h3>
         <p className="text-gray-500 mb-8 leading-relaxed">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
         </p>
         <button className="bg-ngo-light text-white px-8 py-3 rounded-md font-medium hover:bg-ngo-green transition">
           Learn more
         </button>
      </div>

    </div>
  );
};

export default Home;