import React from "react";

function BeneficiaryCard({ beneficiary }) {
  // Determine badge color and text based on status
  const status = beneficiary.status || "Pending";
  const badgeColor =
    status.toLowerCase() === "approved"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm relative">
      {/* Status Badge */}
      <div
        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${badgeColor}`}
      >
        {status}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={
            beneficiary.membertype?.toLowerCase().includes("pregnant")
              ? "/pregnant-woman.png"
              : beneficiary.membertype?.toLowerCase().includes("lactating")
              ? "/lactating-mother.png"
              : "/girl.png"
          }
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
          <span className="font-medium">Email:</span> {beneficiary.email}
        </p>
      </div>
    </div>
  );
}

export default BeneficiaryCard;
