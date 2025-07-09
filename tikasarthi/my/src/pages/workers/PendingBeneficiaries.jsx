import React, { useEffect, useState } from "react";
import axios from "axios";
import BeneficiaryCard from "./BeneficiaryCard";

function WorkerDashboard() {
  const [pendingBeneficiaries, setPendingBeneficiaries] = useState([]);

  useEffect(() => {
    fetchPendingBeneficiaries();
  }, []);

  const fetchPendingBeneficiaries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/beneficiaries/pending");
      setPendingBeneficiaries(response.data);
    } catch (error) {
      console.error("Error fetching pending beneficiaries:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Pending Beneficiaries for Verification</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pendingBeneficiaries.map((beneficiary) => (
          <BeneficiaryCard
            key={beneficiary._id}
            beneficiary={beneficiary}
            isWorkerView={true}
            refreshList={fetchPendingBeneficiaries}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkerDashboard;