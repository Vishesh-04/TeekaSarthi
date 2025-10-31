
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
  Activity,
  Target,
  TrendingUp,

  Settings,
  LogOut,
  Search,
  Filter,
  Plus,
  Eye,
  Award,
  Home,
  Bell,
  Shield,
  Users,
  Briefcase,
  Heart
} from 'lucide-react';
import Navbar from '../../components/Navbar';




const WorkerDashboard = () => {
  const navigate = useNavigate();
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
  const [currentTime, setCurrentTime] = useState(new Date());
  

  const scheduleData = [
    { id: 1, date: 'Today - 2:00 PM', location: 'Community Center A', patients: 15, address: '123 Community St', type: 'General Vaccination', status: 'upcoming', priority: 'high' },
    { id: 2, date: 'Tomorrow - 10:00 AM', location: 'School District 5', patients: 45, address: '456 School Ave', type: 'School Vaccination Drive', status: 'upcoming', priority: 'medium' },
    { id: 3, date: 'Jul 10 - 3:00 PM', location: 'Senior Center', patients: 25, address: '789 Senior Blvd', type: 'Senior Citizen Drive', status: 'upcoming', priority: 'high' },
    { id: 4, date: 'Jul 11 - 11:00 AM', location: 'Corporate Office', patients: 30, address: '321 Business Park', type: 'Corporate Vaccination', status: 'upcoming', priority: 'low' },
  ];

  const initialStockData = [
    { id: 1, name: 'Pfizer-BioNTech', current: 150, used: 0, received: 0, expiry: '2025-12-31', status: 'good' },
    { id: 2, name: 'Moderna', current: 200, used: 0, received: 0, expiry: '2025-11-30', status: 'good' },
    { id: 3, name: 'Johnson & Johnson', current: 75, used: 0, received: 0, expiry: '2025-10-31', status: 'low' },
  ];

  const stats = [
    { label: 'Total Vaccinations', value: '1,247', change: '+12%', icon: Activity, color: 'from-emerald-500 to-teal-500' },
    { label: 'Success Rate', value: '98.5%', change: '+2.1%', icon: Target, color: 'from-blue-500 to-indigo-500' },
    { label: 'This Week', value: '89', change: '+15%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Pending', value: pendingApprovals.length.toString(), change: '-5%', icon: Clock, color: 'from-orange-500 to-red-500' },
  ];


  

//  const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     window.location.replace("/login");
//   };
  
  useEffect(() => {
    fetchPendingApprovals();
    setStockData(initialStockData);
    getCurrentLocation();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
  //       },
  //       () => {
  //         setLocation('Location access denied');
  //       }
  //     );
  //   } else {
  //     setLocation('Geolocation not supported');
  //   }
  // };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse Geocoding using OpenStreetMap API
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            if (data && data.address) {
              const { city, state, country } = data.address;
              setLocation(`${city || state}, ${country}`);
            } else {
              setLocation("Location not found");
            }
          } catch (error) {
            setLocation("Error fetching location");
          }
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
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
          adharVerified: true,
          remarks: "Verified during field visit",
          workerName: "John Doe",
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
      // yaha generate report m ek hi nam jara h kyuki dummy h

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStockStatus = (stock) => {
    if (stock.current < 50) return { color: 'text-red-500', bg: 'bg-red-100', label: 'Low Stock' };
    if (stock.current < 100) return { color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Medium' };
    return { color: 'text-green-500', bg: 'bg-green-100', label: 'Good Stock' };
  };
 

  return (


    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">



         {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-500" />
            Worker Dashboard
          </h1>

          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <button
              onClick={() => setShowApprovalModal(true)}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
              <Bell className="w-5 h-5" /> Approvals
            </button>

            {/* <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button> */}
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border-l-4 ${notification.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-800'
              : 'bg-green-50 border-green-500 text-green-800'
            } transform transition-all duration-300 animate-pulse`}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'error' ? (
              <X className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-2xl border border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              <div>
                <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-2">
                  Worker Dashboard
                </h1>
                <p className="text-gray-700 text-lg">Welcome back</p>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Clock className="w-4 h-4" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Stats Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Approvals */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Approvals</h3>
                    <p className="text-gray-900">Pending verification requests</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-emerald-800 font-semibold">Pending Requests</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{pendingApprovals.length}</div>
                  <p className="text-sm text-emerald-700">Awaiting your review</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-blue-800 font-semibold">Approved Today</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <p className="text-sm text-blue-700">Successfully verified</p>
                </div>
              </div>

              <button
                onClick={() => setShowApprovalModal(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Eye className="w-5 h-5" />
                Review Pending ({pendingApprovals.length})
              </button>
            </div>
          </div>

          {/* Right Column - Schedule & Stock */}
          <div className="xl:col-span-2 space-y-8">
            {/* Schedule Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Vaccination Schedule</h3>
                    <p className="text-gray-900">Upcoming appointments & drives</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {scheduleData.slice(0, showScheduleExpanded ? scheduleData.length : 3).map((schedule) => (
                  <div
                    key={schedule.id}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setShowAttendanceModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-800">{schedule.location}</h4>
                          <p className="text-sm text-blue-600">{schedule.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(schedule.priority)}`}>
                        {schedule.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{schedule.patients} patients</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Heart className="w-4 h-4" />
                        <span>{schedule.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowScheduleExpanded(!showScheduleExpanded)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                {showScheduleExpanded ? (
                  <>Show Less <ChevronUp className="w-5 h-5" /></>
                ) : (
                  <>View Full Schedule <ChevronDown className="w-5 h-5" /></>
                )}
              </button>
            </div>

            {/* Stock Report Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Vaccine Inventory</h3>
                    <p className="text-gray-900">Current stock levels & status</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stockData.map((stock) => {
                  const status = getStockStatus(stock);
                  return (
                    <div key={stock.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-purple-900 mb-2">{stock.current}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{stock.name}</div>
                      <div className="text-xs text-gray-900">Expires: {stock.expiry}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowStockModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Update Stock
                </button>
                <button
                  onClick={generatePDFReport}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Generate Report
                </button>
              </div>
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
                className="w-full bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
