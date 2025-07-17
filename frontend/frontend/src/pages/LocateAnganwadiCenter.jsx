import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LocateAnganwadiCenter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [centers, setCenters] = useState([
    { id: 1, name: "Anganwadi Center 1", location: "Block A" },
    { id: 2, name: "Anganwadi Center 2", location: "Block B" },
    { id: 3, name: "Anganwadi Center 3", location: "Block C" },
  ]);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleSearch = () => {
    // You can replace with backend API filtering if needed
    const filtered = centers.filter(center =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCenters(filtered);
  };

  const handleNext = () => {
    if (!selectedCenter) {
      alert("Please select a center to proceed.");
      return;
    }
    localStorage.setItem("selectedCenter", JSON.stringify(selectedCenter));
    navigate("/beneficiary-info");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
        {/* Back Arrow */}
      <button onClick={() => navigate(-1)} className="mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/109/109618.png" alt="Back" className="w-10" />
      </button>
      <h1 className="text-2xl font-bold text-indigo-800 mx-auto justify-center items-center flex mb-4">Locate Anganwadi Center</h1>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search center..."
          className="border rounded px-4 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {/* Centers List */}
      <div className="space-y-2">
        {centers.map(center => (
          <div
            key={center.id}
            onClick={() => setSelectedCenter(center)}
            className={`p-4 border rounded cursor-pointer ${
              selectedCenter?.id === center.id ? "bg-indigo-50 border-indigo-400" : "hover:bg-gray-50 "
            }`}
          >
            <h2 className="font-semibold">{center.name}</h2>
            <p className="text-sm text-gray-600">{center.location}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700"
      >
        Next
      </button>
    </div>
  );
}

export default LocateAnganwadiCenter;