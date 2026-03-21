import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import MissingPersonCard from "../components/MissingPersonCard";

const MissingPeople = () => {
  const navigate = useNavigate(); // ✅ ADD

  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const missingPersons = [
    {
      id: 1,
      name: "Ramesh Kumar",
      age: 45,
      missingSince: "12 March 2026",
      location: "Panvel Station, Navi Mumbai",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      id: 2,
      name: "Sita Devi",
      age: 62,
      missingSince: "10 March 2026",
      location: "Kalyan West",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
    {
      id: 3,
      name: "Rahul Verma",
      age: 28,
      missingSince: "15 March 2026",
      location: "Vashi Sector 17",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },
  ];

  const filteredPersons = missingPersons.filter((person) => {
    const matchName = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchMinAge = minAge === "" || person.age >= parseInt(minAge);
    const matchMaxAge = maxAge === "" || person.age <= parseInt(maxAge);
    return matchName && matchMinAge && matchMaxAge;
  });

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPersons.map((person) => (
            <MissingPersonCard
              key={person.id}
              name={person.name}
              age={person.age}
              missingSince={person.missingSince}
              location={person.location}
              imageUrl={person.image}
              onReportClick={() =>
                navigate("/report", { state: person }) // ✅ MAIN FIX
              }
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MissingPeople;