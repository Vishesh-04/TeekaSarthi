import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();

  // Send OTP (generate on backend) for registration
  const handleSendOtp = async () => {
    if (!name || !phoneNumber || !password) {
      alert("Please fill all fields before sending OTP");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        phone: phoneNumber,
        email,
        password,
      });
      alert(response.data); // "OTP sent to phone"
      setIsOtpSent(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Failed to generate OTP");
    }
  };

  // Verify OTP and complete registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      alert("Please generate OTP first");
      return;
    }
    try {
      await axios.post("/api/auth/verify-register", {
        phone: phoneNumber,
        otp,
      });
      alert("Registration successful");
      setIsLogin(true);
      setIsOtpSent(false);
      setOtp("");
      // Optionally navigate to login or dashboard
      // navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "OTP verification failed");
    }
  };

  // Login: send OTP for login
  const handleSendLoginOtp = async () => {
    if (!name || !phoneNumber) {
      alert("Please enter name and phone number to login");
      return;
    }
    try {
      const response = await axios.post("/api/auth/login", {
        name,
        phone: phoneNumber,
        email,
      });
      alert(response.data); // "OTP sent for login"
      setIsOtpSent(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Failed to send OTP for login");
    }
  };

  // Verify login OTP and get token
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      alert("Please request OTP first");
      return;
    }
    try {
      const response = await axios.post("/api/auth/verify-login", {
        phone: phoneNumber,
        otp,
      });
      alert(response.data.message || "Login successful");
      // Save token somewhere (localStorage etc.)
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">
        <div className="flex justify-between mb-7">
          <button
            onClick={() => {
              setIsLogin(true);
              setIsOtpSent(false);
              setOtp("");
            }}
            className={`w-1/2 py-2 font-semibold rounded-l ${
              isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setIsOtpSent(false);
              setOtp("");
            }}
            className={`w-1/2 py-2 font-semibold rounded-r ${
              !isLogin
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          // Login form
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl   rounded-lg font-bold text-center text-indigo-700">
              Login
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {!isOtpSent ? (
              <button
                type="button"
                onClick={handleSendLoginOtp}
                className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded hover:bg-indigo-700"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Login
                </button>
              </>
            )}
          </form>
        ) : (
          // Register form
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">
              Register
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {!isOtpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Register
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
