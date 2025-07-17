import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WorkerLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSendOtp = () => {
    setShowOtpField(true);
  };

  // Updated login handler
  
  const handleLogin = (e) => {
  e.preventDefault();

  // ✅ Store dummy token to allow WorkerDashboard entry
  localStorage.setItem("workerToken", "dummy-worker-token");

  alert("Logged in successfully (dummy)");
  navigate("/worker/dashboard");
};

// Similarly in handleRegister:
const handleRegister = (e) => {
  e.preventDefault();

  // ✅ Store dummy token to allow WorkerDashboard entry
  localStorage.setItem("workerToken", "dummy-worker-token");

  alert("Registered successfully (dummy)");
  navigate("/worker/dashboard");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">
        <div className="flex justify-between">
          <button
            onClick={() => {
              setIsLogin(true);
              setShowOtpField(false);
            }}
            className={`w-1/2 py-2 font-semibold rounded-l ${isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setShowOtpField(false);
            }}
            className={`w-1/2 py-2 font-semibold rounded-r ${!isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <div className="flex justify-end text-sm">
              <a href="/forgot-password" className="text-indigo-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Login
            </button>
            <p className="text-center text-sm">
              Not a Member?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  setShowOtpField(false);
                }}
                className="text-indigo-500 cursor-pointer hover:underline"
              >
                Register Now
              </span>
            </p>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Send OTP
              </button>
            </div>

            {showOtpField && (
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Register
            </button>
            <p className="text-center text-sm">
              Already a Member?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  setShowOtpField(false);
                }}
                className="text-indigo-500 cursor-pointer hover:underline"
              >
                Login Now
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default WorkerLogin;
