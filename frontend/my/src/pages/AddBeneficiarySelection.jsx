import React from "react";
import { useNavigate } from "react-router-dom";

const beneficiaryOptions = [
  { title: "Pregnant Women", image: "https://media.istockphoto.com/id/1350543173/vector/pregnant-african-american-woman-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=mNdnw_hc6fdd4QcZoXfPLy3_X65hzl7U0RB5rCMoMhs=" },
  { title: "Lactating Mother", image: "https://t4.ftcdn.net/jpg/06/01/66/45/360_F_601664574_l72Nqtw5PcIICG1bF8NtzWncWLeh1ida.jpg" },
  { title: "Adolescent Girls", image: "https://static.vecteezy.com/system/resources/previews/036/151/775/non_2x/illustration-cartoon-of-a-cute-girl-standing-and-smiling-while-dressed-in-colorful-and-casual-clothes-vector.jpg" },
  { title: "Children upto 6 years", image: "https://img.freepik.com/premium-vector/vector-kids-illustration_844724-2742.jpg?semt=ais_hybrid&w=740" },
];

function AddBeneficiarySelection() {
  const navigate = useNavigate();

  const handleSelect = (beneficiary) => {
    localStorage.setItem("selectedBeneficiaryType", beneficiary);
    navigate("/locate-center");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Arrow */}


      {/* Title */}
      <h1 className="text-2xl font-bold justify-center items-center mx-auto flex text-indigo-800 mb-6">Add Beneficiary</h1>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 ">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <i className="fas fa-user"></i>
          </div>
          <span className="mt-2 text-sm font-medium cursor-pointer text-indigo-700">Select Beneficiary</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <i className="fas fa-home"></i>
          </div>
          <span className=" cursor-pointer mt-2 text-indigo-700 text-sm font-medium">Locate Anganwadi Center</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <i className="fas fa-info"></i>
          </div>
          <span className="mt-2 text-indigo-700 text-sm font-medium">Personal Information</span>
        </div>
      </div>

      {/* Selection Title */}
      <h2 className="text-xl font-semibold mb-4">Select a beneficiary to register</h2>

      {/* Beneficiary Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4  ">
        {beneficiaryOptions.map((item) => (
          <button
            key={item.title}
            onClick={() => handleSelect(item.title)}
            className="flex flex-col items-center p-4 bg-white shadow rounded cursor-pointer hover:bg-indigo-50"
          >
            <img src={item.image} alt={item.title} className="w-20 h-20 mb-2" />
            <span className="text-center font-semibold">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AddBeneficiarySelection;
