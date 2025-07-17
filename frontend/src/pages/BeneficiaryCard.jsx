import React from "react";

function BeneficiaryCard({ beneficiary }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm relative">
      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
        Pending
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={
            beneficiary.membertype.toLowerCase().includes("pregnant")
              ? "/pregnant-woman.png"
              : beneficiary.membertype.toLowerCase().includes("lactating")
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
          <span className="font-medium">Age:</span> 22 Years 4 Months
        </p>
        <p>
          <span className="font-medium">Height:</span> 52 cm
        </p>
        <p>
          <span className="font-medium">Weight:</span> 4 kgs
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center border-t pt-2">
        <div className="flex items-center space-x-2 text-sm">
          <span>📞</span>
          <span>{beneficiary.phoneNo}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span>🆔</span>
          <span>XXXX-XXXX-2345</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">ABHA Not Found</div>
    </div>
  );
}

export default BeneficiaryCard;