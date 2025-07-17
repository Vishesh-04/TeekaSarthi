import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ScheduleConfirmationCard({ data }) {
  // Initial status from data
  const [status, setStatus] = useState(data.status);

  const { childName, dob, guardian, vaccine, dose, dueDate } = data;

  const getStatusIcon = () => {
    if (status === 'CONFIRMED') return <CheckCircle className="text-green-600" />;
    if (status === 'PENDING') return <Clock className="text-yellow-500" />;
    return <AlertCircle className="text-red-600" />;
  };

  // Just toggle status locally for demo, no backend call
  const handleConfirmClick = () => {
    if (status !== 'CONFIRMED') {
      setStatus('CONFIRMED');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto my-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{childName}</h2>
        {getStatusIcon()}
      </div>

      <p className="text-gray-500 text-sm mb-2">DOB: {dob}</p>
      <p className="text-gray-500 text-sm mb-4">Guardian: {guardian}</p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Vaccine:</span> {vaccine}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Dose:</span> {dose}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Due Date:</span> {dueDate}
        </p>
      </div>

      <button
        onClick={handleConfirmClick}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
          status === 'CONFIRMED'
            ? 'bg-green-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={status === 'CONFIRMED'}
      >
        {status === 'CONFIRMED' ? 'Confirmed' : 'Confirm Schedule'}
      </button>
    </div>
  );
}
