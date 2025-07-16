import React, { useEffect, useState } from "react";
import axios from "axios";
import BeneficiaryCard from "./BeneficiaryCard";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficiaries = async () => {
    try {
      const userId = localStorage.getItem("userId") || "testuser123";
      localStorage.setItem("userId", userId);

      const response = await axios.get(`http://localhost:8080/api/beneficiaries/user/${userId}`);
      setBeneficiaries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Left Section: Welcome and Add Button */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center">
          <img
            src="https://answers.childrenshospital.org/wp-content/uploads/2021/03/COVID-Vaccinated_image.jpg"
            alt="Family"
            className="w-48 md:w-64 mb-4 rounded-2xl shadow"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-2">
            Welcome to Teeka Sarthi
          </h2>
          <p className="text-gray-700 mb-4">
            Register your <strong>family members</strong> easily for vaccination to ensure timely protection.
          </p>
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Add a Family Member
          </button>
        </div>

        {/* Right Section: Beneficiary Cards */}
        <div className="flex-1 bg-white p-6 rounded-3xl shadow-xl overflow-y-auto max-h-[80vh]">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4 text-center">Registered Beneficiaries</h3>
          {loading ? (
            <p className="text-center text-gray-600">Loading beneficiaries...</p>
          ) : beneficiaries.length === 0 ? (
            <p className="text-center text-gray-600">No beneficiaries registered yet.</p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {beneficiaries.map((ben) => (
                <BeneficiaryCard key={ben._id} beneficiary={ben} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
