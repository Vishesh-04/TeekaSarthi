import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScheduleList from "./ScheduleList";

const DashboardHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split("/").pop(); // dashboard or add-beneficiary

  const [beneficiaryId, setBeneficiaryId] = useState(null);

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      {currentTab === "dashboard" && (
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-3xl mx-auto">
          <img
            src="https://answers.childrenshospital.org/wp-content/uploads/2021/03/COVID-Vaccinated_image.jpg"
            alt="Family"
            className="mx-auto w-60 md:w-72 mb-6 rounded-2xl shadow"
          />
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome to Teeka Sarthi</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Register your <strong>family members</strong> easily for vaccination to ensure timely protection.
          </p>
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer text-white font-semibold py-3 px-8 rounded-full shadow-lg"
          >
            Add a Family Member
          </button>
        </div>
      )}

      {/* Add Member Hero Section */}
      {currentTab === "add-beneficiary" && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Illustration */}
          <img
            src="https://cdn.dribbble.com/users/331265/screenshots/17775194/media/c2597ae229e756784b339a9d46a02dd5.gif"
            alt="Add Member"
            className="w-48 md:w-64 rounded-2xl shadow-lg"
          />

          {/* Text and CTA */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-3">
              Add a Family Member
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Register your loved ones easily to keep them protected with timely vaccinations. Track schedules, get reminders, and manage their health confidently with Teeka Sarthi.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
            >
              Start Registration
            </button>
          </div>
        </div>
      )}

      {/* Schedule Component */}
      {beneficiaryId && (
        <div className="bg-white p-6 rounded-lg shadow mt-6 max-w-4xl mx-auto">
          <ScheduleList beneficiaryId={beneficiaryId} />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
