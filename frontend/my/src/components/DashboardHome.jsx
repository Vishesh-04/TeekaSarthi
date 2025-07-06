import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const DashboardHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split("/").pop(); // dashboard or register

  const [formData, setFormData] = useState({
    membertype: "",
    name: "",
    dob: "",
    gender: "",
    idproof: "",
    idnumber: "",
    phoneNo: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [beneficiaryId, setBeneficiaryId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/beneficiaries/add",
        formData
      );
      alert("Beneficiary registered successfully!");
      const savedBeneficiary = response.data;
      setBeneficiaryId(savedBeneficiary.id);

      setFormData({
        membertype: "",
        name: "",
        dob: "",
        gender: "",
        idproof: "",
        idnumber: "",
        phoneNo: "",
        address: "",
        city: "",
        pincode: "",
      });
    } catch (error) {
      console.error("Error registering beneficiary:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex-1 p-9 bg-gray-100 min-h-screen">
     
      {/* Welcome Section */}
      {currentTab === "dashboard" && (
        <div className="bg-white p-10 rounded-xl shadow text-center max-w-3xl mx-auto">
          <img
            src="https://answers.childrenshospital.org/wp-content/uploads/2021/03/COVID-Vaccinated_image.jpg"
            alt="Family"
            className="mx-auto w-100 h-40 md:w-60 mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
          <p className="text-gray-600 mb-6">
            You can register <strong>family members</strong> for vaccination.
          </p>
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Register Member
          </button>
        </div>
      )}

      {/* Registration Form */}
      {currentTab === "register" && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Register a Beneficiary</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {[
              ["membertype", "Member Type", "text"],
              ["name", "Name", "text"],
              ["dob", "Date of Birth", "date"],
              ["gender", "Gender", "select"],
              ["idproof", "ID Proof", "text"],
              ["idnumber", "ID Number", "text"],
              ["phoneNo", "Phone Number", "text"],
              ["address", "Address", "text"],
              ["city", "City", "text"],
              ["pincode", "Pincode", "text"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder={label}
                  />
                )}
              </div>
            ))}

            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="w-72 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-3 rounded-lg shadow"
              >
                Register Beneficiary
              </button>
            </div>
          </form>
        </div>
      )}



<section className="py-30">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
      <p className="mt-4 text-lg text-gray-600">
        Empowering Anganwadi workers with essential tools for child health and vaccination management.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: (
            <svg
              className="w-12 h-12 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
          title: "Vaccination Tracking",
          description:
            "Monitor and manage vaccination schedules and reminders efficiently within Anganwadi centers.",
        },
        {
          icon: (
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
            </svg>
          ),
          title: "Nutrition Monitoring",
          description:
            "Track nutritional status and growth metrics of registered children for holistic health monitoring.",
        },
        {
          icon: (
            <svg
              className="w-12 h-12 text-purple-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          ),
          title: "Parent Engagement",
          description:
            "Send SMS reminders and health updates to parents, ensuring proactive participation in child health care.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg shadow hover:shadow-md p-6 text-center transition duration-300"
        >
          <div className="flex justify-center">{item.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <button
            className=" bg-indigo-600 hover:bg-indigo-700 mt-auto text-sm font-medium text-white hover:text-indigo-800 transition border-2 p-3 m-2 rounded-2xl"
            onClick={() => navigate("/add-beneficiary")}
          >
            Learn More &rarr;
          </button>
        </div>
      ))}
    </div>

    <div className="flex justify-center mt-12">
      <button
        className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg shadow transition"
        onClick={() => navigate("/add-beneficiary")}
      >
        Register a New Beneficiary
      </button>
    </div>
  </div>
</section>

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
