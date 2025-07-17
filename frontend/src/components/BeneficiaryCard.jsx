import React from "react";
import axios from "axios";

function BeneficiaryCard({ beneficiary, isWorkerView }) {
  const verifyBeneficiary = async () => {
    try {
      await axios.put(`http://localhost:8080/api/beneficiaries/${beneficiary._id}/verify`);
      alert("Beneficiary Verified!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Verification failed!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm relative">
      <div
        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs
          ${
            beneficiary.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }
        `}
      >
        {beneficiary.status === "active" ? "Active" : "Pending"}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={beneficiary.photoUrl || "/default-avatar.png"}
          alt="Beneficiary"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{beneficiary.name}</h2>
          <p className="text-sm text-gray-600">
            {beneficiary.address} ({beneficiary.phoneNo})
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Gender:</span> {beneficiary.gender}
        </p>
        <p>
          <span className="font-medium">DOB:</span> {beneficiary.dob}
        </p>
        <p>
          <span className="font-medium">ID Proof:</span> {beneficiary.idproof} ({beneficiary.idnumber})
        </p>
      </div>

      {isWorkerView && beneficiary.status === "pending" && (
        <button
          onClick={verifyBeneficiary}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow transition"
        >
          Verify Beneficiary
        </button>
      )}
    </div>
  );
}

export default BeneficiaryCard;
