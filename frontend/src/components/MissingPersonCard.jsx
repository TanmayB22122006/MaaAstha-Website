import React from "react";

const MissingPersonCard = ({
  name,
  age,
  missingSince,
  location,
  imageUrl,
  onReportClick // ✅ ADD
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      <div className="relative h-64">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full">
          MISSING
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{name}</h3>

        <p>Age: {age}</p>
        <p>Missing Since: {missingSince}</p>
        <p>Last Seen: {location}</p>

        <button
          onClick={onReportClick} // ✅ MAIN FIX
          className="w-full bg-green-600 text-white py-2 mt-4 rounded"
        >
          Report Info
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;