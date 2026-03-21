import React, { useEffect, useMemo, useState } from "react";

const MissingPeople = () => {
  // 1. Search aur Filter ke liye State (Memory)
  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const [missingPersons, setMissingPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/people");
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to load records");
        if (mounted) setMissingPersons(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load records");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 2. Jadoo yahan hota hai (Filtering Logic)
  const filteredPersons = useMemo(() => {
    return missingPersons.filter((person) => {
      const name = String(person?.name || "");
      const age = Number(person?.age || 0);
      // Naam check karega (chhota-bada letter sab handle ho jayega)
      const matchName = name.toLowerCase().includes(searchTerm.toLowerCase());
    
      // Age check karega
      const matchMinAge = minAge === "" || age >= parseInt(minAge);
      const matchMaxAge = maxAge === "" || age <= parseInt(maxAge);

      return matchName && matchMinAge && matchMaxAge;
    });
  }, [missingPersons, searchTerm, minAge, maxAge]);

  return (
    <div className="py-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark mb-4">
            Help Us Find Them
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Agar aapne inme se kisi ko bhi dekha hai, toh turant NGO ko inform karein. Ek call kisi ki zindagi badal sakti hai.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Name Search Bar */}
          <div className="w-full md:w-1/2 relative">
            <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition"
            />
          </div>

          {/* Age Filters */}
          <div className="w-full md:w-1/2 flex gap-4 items-center md:justify-end">
            <span className="text-gray-600 font-semibold hidden md:block">Age:</span>
            <input 
              type="number" 
              placeholder="Min Age" 
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full md:w-28 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              placeholder="Max Age" 
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full md:w-28 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition"
            />
          </div>
          
        </div>

        {/* Dynamic Cards Grid System */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-600">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 text-red-600">
            {error}
          </div>
        ) : filteredPersons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPersons.map((person) => (
              <div key={person._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={person.imageUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"} 
                    alt={person.name || "Missing person"} 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 bg-ngo-red text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    MISSING
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-ngo-dark mb-2">{person.name}</h3>
                  <div className="space-y-2 text-gray-600 mb-6 text-sm">
                    <p><span className="font-semibold text-gray-800">Age:</span> {person.age} years</p>
                    <p><span className="font-semibold text-gray-800">Added On:</span> {person.createdAt ? new Date(person.createdAt).toLocaleDateString() : "-"}</p>
                    <p><span className="font-semibold text-gray-800">Last Seen:</span> {person.location}</p>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-ngo-green hover:bg-ngo-dark text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                    I Have Information
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Agar koi search result na mile toh ye dikhega */
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🤷‍♂️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or age filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setMinAge(""); setMaxAge(""); }}
              className="mt-6 text-ngo-green font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MissingPeople;