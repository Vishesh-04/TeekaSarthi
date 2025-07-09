import React, { useState, useEffect } from 'react';
import {
  Camera,
  Calendar,
  MapPin,
  Package,
  Check,
  X,
  Download,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  FileText,
} from 'lucide-react';

const WorkerDashboard = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showScheduleExpanded, setShowScheduleExpanded] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [location, setLocation] = useState('Getting location...');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // // Mock data - replace with backend later
  // const mockBeneficiaries = [
  //   { id: 1, name: 'John Smith', age: 45, phone: '+1234567890', address: '123 Main St, City', vaccineType: 'Pfizer', dose: 'First Dose', appointmentDate: '2025-07-08', medicalHistory: 'No allergies', status: 'pending' },
  //   { id: 2, name: 'Sarah Johnson', age: 32, phone: '+1234567891', address: '456 Oak Ave, City', vaccineType: 'Moderna', dose: 'Second Dose', appointmentDate: '2025-07-08', medicalHistory: 'Hypertension', status: 'pending' },
  //   { id: 3, name: 'Mike Wilson', age: 28, phone: '+1234567892', address: '789 Pine Rd, City', vaccineType: 'J&J', dose: 'Single Dose', appointmentDate: '2025-07-09', medicalHistory: 'None', status: 'pending' },
  // ];

  const scheduleData = [
    { id: 1, date: 'Today - 2:00 PM', location: 'Community Center A', patients: 15, address: '123 Community St', type: 'General Vaccination', status: 'upcoming' },
    { id: 2, date: 'Tomorrow - 10:00 AM', location: 'School District 5', patients: 45, address: '456 School Ave', type: 'School Vaccination Drive', status: 'upcoming' },
    { id: 3, date: 'Jul 10 - 3:00 PM', location: 'Senior Center', patients: 25, address: '789 Senior Blvd', type: 'Senior Citizen Drive', status: 'upcoming' },
    { id: 4, date: 'Jul 11 - 11:00 AM', location: 'Corporate Office', patients: 30, address: '321 Business Park', type: 'Corporate Vaccination', status: 'upcoming' },
  ];

  // const initialStockData = [
  //   { id: 1, name: 'Pfizer-BioNTech', current: 150, used: 0, received: 0, expiry: '2025-12-31' },
  //   { id: 2, name: 'Moderna', current: 200, used: 0, received: 0, expiry: '2025-11-30' },
  //   { id: 3, name: 'Johnson & Johnson', current: 75, used: 0, received: 0, expiry: '2025-10-31' },
  // ];

  // useEffect(() => {
  //   setPendingApprovals(mockBeneficiaries);
  //   setStockData(initialStockData);
  //   getCurrentLocation();
  // }, []);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/beneficiary/pending");
      if (response.ok) {
        const data = await response.json();
        setPendingApprovals(data);
      } else {
        showNotification("Failed to fetch beneficiaries", "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Error fetching beneficiaries", "error");
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

 const handleVerifyBeneficiary = async (beneficiaryId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/worker/verify/${beneficiaryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adharVerified: true, // Adjust if you want to ask user dynamically
        remarks: "Verified during field visit", // Or make dynamic later
        workerName: "John Doe", // Replace with dynamic worker name if stored
      }),
    });

    if (response.ok) {
      setPendingApprovals((prev) => prev.filter((b) => b.id !== beneficiaryId));
      setSelectedBeneficiary(null);
      setShowApprovalModal(false);
      showNotification("Beneficiary verified successfully!");
    } else {
      showNotification("Failed to verify beneficiary", "error");
    }
  } catch (error) {
    console.error(error);
    showNotification("An error occurred while verifying", "error");
  }
};

const handleApproval = (beneficiaryId, action) => {
  if (action === "approve") {
    handleVerifyBeneficiary(beneficiaryId);
  } else {
    setPendingApprovals((prev) => prev.filter((b) => b.id !== beneficiaryId));
    setSelectedBeneficiary(null);
    setShowApprovalModal(false);
    showNotification("Beneficiary rejected successfully!");
  }
};

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto({ name: file.name, data: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitAttendance = () => {
    if (!uploadedPhoto) {
      showNotification('Please upload a photo first!', 'error');
      return;
    }
    showNotification('Attendance submitted successfully!');
    setShowAttendanceModal(false);
    setUploadedPhoto(null);
    setSelectedSchedule(null);
  };

  const updateStock = (vaccineId, field, value) => {
    setStockData((prev) =>
      prev.map((vaccine) =>
        vaccine.id === vaccineId ? { ...vaccine, [field]: field === 'expiry' ? value : parseInt(value) || 0 } : vaccine
      )
    );
  };

  const submitStockUpdate = () => {
    showNotification('Stock updated successfully!');
    setShowStockModal(false);
  };

  const generatePDFReport = () => {
    const reportData = {
      date: new Date().toISOString().split('T')[0],
      worker: 'John Doe',
      workerId: 'HW001',
      stocks: stockData,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `stock-report-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showNotification('Stock report downloaded!');
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl">
          <h1 className="text-4xl mx-auto flex  justify-center font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Worker Dashboard
          </h1>
          <div className="flex items-center gap-4">
            
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Approvals Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r  from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Approvals</h3>
                <p className="text-gray-600">Pending requests and approvals</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-gray-700"><span className="font-bold text-lg">{pendingApprovals.length}</span> Pending Requests</p>
              <p className="text-gray-700"><span className="font-bold text-lg">12</span> Approved Today</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setShowApprovalModal(true)}
                className="w-full bg-gradient-to-r  from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Review Pending ({pendingApprovals.length})
              </button>
             
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Vaccination Schedule</h3>
                <p className="text-gray-600">Upcoming appointments</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {scheduleData.slice(0, showScheduleExpanded ? scheduleData.length : 2).map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    setSelectedSchedule(schedule);
                    setShowAttendanceModal(true);
                  }}
                >
                  <div className="font-semibold text-blue-600">{schedule.date}</div>
                  <div className="text-gray-800">{schedule.location}</div>
                  <div className="text-sm text-gray-600">{schedule.patients} patients scheduled</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowScheduleExpanded(!showScheduleExpanded)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {showScheduleExpanded ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View Full Schedule <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Stock Report Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Vaccine Stock Report</h3>
                <p className="text-gray-600">Current inventory status</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {stockData.map((stock) => (
                <div key={stock.id} className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stock.current}</div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Exp: {stock.expiry}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowStockModal(true)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Update Stock
              </button>
              <button
                onClick={generatePDFReport}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Pending Approvals</h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {!selectedBeneficiary ? (
              <div className="space-y-4">
                {pendingApprovals.map((beneficiary) => (
                  <div
                    key={beneficiary.id}
                    className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedBeneficiary(beneficiary)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{beneficiary.name}</h3>
                        <p className="text-gray-600">{beneficiary.vaccineType} - {beneficiary.dose}</p>
                        <p className="text-sm text-gray-500">Appointment: {beneficiary.appointmentDate}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedBeneficiary(null)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  ← Back to List
                </button>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Beneficiary Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900">{selectedBeneficiary.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <p className="text-gray-900">{selectedBeneficiary.age}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{selectedBeneficiary.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Type</label>
                      <p className="text-gray-900">{selectedBeneficiary.vaccineType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                      <p className="text-gray-900">{selectedBeneficiary.dose}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                      <p className="text-gray-900">{selectedBeneficiary.appointmentDate}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <p className="text-gray-900">{selectedBeneficiary.address}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                      <p className="text-gray-900">{selectedBeneficiary.medicalHistory}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApproval(selectedBeneficiary.id, 'approve')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(selectedBeneficiary.id, 'reject')}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Submit Attendance</h2>
              <button
                onClick={() => {
                  setShowAttendanceModal(false);
                  setSelectedSchedule(null);
                  setUploadedPhoto(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800">{selectedSchedule.location}</h3>
                <p className="text-blue-600">{selectedSchedule.date}</p>
                <p className="text-sm text-gray-600">{selectedSchedule.patients} patients</p>
              </div>

              <div className="flex items-center gap-3 text-green-600">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Location: {location}</span>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {uploadedPhoto ? (
                  <div className="space-y-2">
                    <div className="text-green-600">
                      <Check className="w-8 h-8 mx-auto" />
                    </div>
                    <p className="text-sm text-gray-600">Photo uploaded: {uploadedPhoto.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-gray-600">Take/Upload Photo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <button
                onClick={submitAttendance}
                disabled={!uploadedPhoto}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Update Stock</h2>
              <button
                onClick={() => setShowStockModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {stockData.map((vaccine) => (
                <div key={vaccine.id} className="border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-600">{vaccine.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock</label>
                      <input
                        type="number"
                        value={vaccine.current}
                        onChange={(e) => updateStock(vaccine.id, 'current', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Used Today</label>
                      <input
                        type="number"
                        value={vaccine.used}
                        onChange={(e) => updateStock(vaccine.id, 'used', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Received Today</label>
                      <input
                        type="number"
                        value={vaccine.received}
                        onChange={(e) => updateStock(vaccine.id, 'received', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="date"
                        value={vaccine.expiry}
                        onChange={(e) => updateStock(vaccine.id, 'expiry', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={submitStockUpdate}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Submit Update
              </button>
              <button
                onClick={() => setShowStockModal(false)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;