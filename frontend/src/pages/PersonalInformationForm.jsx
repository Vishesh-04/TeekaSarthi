import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import BeneficiaryCard from '../components/BeneficiaryCard'



function PersonalInformationForm() {
  
useEffect(() => {
  const storedBeneficiaryType = localStorage.getItem("selectedBeneficiaryType");
  if (storedBeneficiaryType) {
    setFormData((prev) => ({
      ...prev,
      membertype: storedBeneficiaryType
    }));
    // localStorage.removeItem("selectedBeneficiaryType"); // Optional cleanup
  }
}, []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    membertype: "",
    name: "",
    guardianName: "",
    dob: "",
    gender: "",
    idproof: "",
    idnumber: "",
    phoneNo: "",
    address: "",
    city: "",
    pincode: "",
    centerName: "",
    photo: null,
    email: "",
  });

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
   useEffect(() => {
    const savedType = localStorage.getItem("selectedBeneficiaryType");
    const storedCenter = JSON.parse(localStorage.getItem("selectedCenter"));

    setFormData((prev) => ({
      ...prev,
      membertype: savedType || "",
      centerName: storedCenter?.name || "",
    }));
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/beneficiaries/add",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedBeneficiary = response.data;
      alert(`Beneficiary registered successfully! ID: ${savedBeneficiary.id}`);
      setBeneficiaries((prev) => [...prev, savedBeneficiary]);

      // Clear form
      setFormData({
        membertype: "",
        name: "",
        guardianName: "",
        dob: "",
        gender: "",
        idproof: "",
        idnumber: "",
        phoneNo: "",
        address: "",
        city: "",
        pincode: "",
        centerName: "",
        photo: null,
        email: "",
      });
      setPhotoPreview(null);
    } catch (error) {
      console.error("Error registering beneficiary:", error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-7/10 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
            alt="Back"
            className="w-8 hover:scale-110 transition-transform duration-200"
          />
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Register a Beneficiary
        </h1>
  <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "membertype", placeholder: "Beneficiary Type" },
              { name: "name", placeholder: "Full Name" },
              { name: "guardianName", placeholder: "Guardian's Name" },
              { name: "dob", placeholder: "Date of Birth", type: "date" },
              { name: "idproof", placeholder: "ID Proof Type (Aadhar, etc.)" },
              { name: "idnumber", placeholder: "ID Proof Number" },
              { name: "phoneNo", placeholder: "Phone Number" },
              { name: "address", placeholder: "Address" },
              { name: "city", placeholder: "City" },
              { name: "pincode", placeholder: "Pincode" },
              { name: "centerName", placeholder: "Center Name" },
              { name: "email", placeholder: "Email" },
            ].map((field) => {
  // ✅ Read-only fields
  if (field.name === "membertype" || field.name === "centerName") {
    return (
      <input
        key={field.name}
        type="text"
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        readOnly
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
      />
    );
  }

  // ✅ Dropdown for ID Proof
  if (field.name === "idproof") {
    return (
      <select
        key={field.name}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/70 shadow-sm"
      >
        <option value="">Select ID Proof</option>
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="PAN Card">PAN Card</option>
      </select>
    );
  }

  // ✅ Normal input for all other fields
  return (
    <input
      key={field.name}
      type={field.type || "text"}
      name={field.name}
      placeholder={field.placeholder}
      value={formData[field.name]}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/70 shadow-sm placeholder-gray-500"
    />
  );
})}

  {/* Gender Dropdown */}
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/70 shadow-sm"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Pregnant">Pregnant</option>
    <option value="0-3 years child">0-3 years child</option>
    <option value="3-6 years child">3-6 years child</option>
  </select>

            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-indigo-700">
                Upload Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/70 shadow-sm"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-3 w-32 h-32 object-cover rounded-xl shadow-md mx-auto"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              Register Beneficiary
            </button>
          </div>
        </form>

        {/* Beneficiary Cards */}
        {beneficiaries.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
              Registered Beneficiaries
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {beneficiaries.map((ben, idx) => (
                <BeneficiaryCard key={idx} beneficiary={ben} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInformationForm;
