import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger & close icons

const Nav = ({ userName = "User", onTextSizeChange, currentSize = "base" }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Teeka Sarthi</h1>

        {/* Hamburger icon (visible on small screens) */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Beneficiaries
          </button>
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Add Beneficiary
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-2 mt-4 md:hidden">
          <button
            onClick={() => {
              navigate("/add-beneficiary");
              toggleMenu();
            }}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 text-left"
          >
            Beneficiaries
          </button>
          <button
            onClick={() => {
              navigate("/add-beneficiary");
              toggleMenu();
            }}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 text-left"
          >
            Add Beneficiary
          </button>
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
