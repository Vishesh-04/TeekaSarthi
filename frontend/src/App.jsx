import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthPage from "./pages/AuthPage";
import ForgotPassword from './pages/ForgotPassword';
import DashboardHome from './components/DashboardHome';
import Header from './components/Header';
import SchedulePage from './pages/SchedulePage';
import Footer from "./components/Footer";
import Navbar from './components/Navbar';

// import WorkerLogin from './pages/workers/WorkerLogin';
// import WorkerDashboard from './pages/workers/Workerdashboard'; 
// import PendingBeneficiaries from './pages/workers/PendingBeneficiaries';
// import VaccinationEntry from './pages/workers/VaccinationEntry';
import LocateAnganwadiCenter from './pages/LocateAnganwadiCenter';
import AddBeneficiarySelection from './pages/AddBeneficiarySelection';
import PersonalInformationForm from './pages/PersonalInformationForm';

import Nav from './components/Nav';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route 
        path="/login" 
        element={
          <>
            <AuthPage />
            <Header />
          </>
        } 
      />

      <Route 
        path="/register" 
        element={
          <>
            <AuthPage />
            <Header />
          </>
        } 
      />

      {/* <Route 
        path="/workerlogin" 
        element={
          <>
            <WorkerLogin />
            <Header />
          </>
        } 
      /> */}

      {/* <Route 
        path="/worker/dashboard" 
        element={
          <>
            <WorkerDashboard />
            <Header />
          </>
        } 
      />
      <Route 
        path="/worker/pending-beneficiaries" 
        element={
          <>
           <PendingBeneficiaries />
            <Header />
          </>
        } 
      /> */}

      <Route 
        path="/add-beneficiary" 
        element={
          <>
        <Nav/>
           <AddBeneficiarySelection />
            <Header />
          </>
        } 
      />
      
<Route 
path="/locate-center"
element={
  <>
<Nav/>
<LocateAnganwadiCenter />
<Header/>
</>

} 

/>
<Route
 path="/beneficiary-info"
 element={
  <>
  <Nav/>
 <PersonalInformationForm />
 <Header/>
 </>
 
 } 
 />

      {/* <Route path="/worker/vaccination-entry" element={<VaccinationEntry />} /> */}

      <Route 
        path="/forgot-password" 
        element={
          <>
            <ForgotPassword />
            <Header />
          </>
        } 
      />

      <Route
        path="/dashboard"
        element={
          <>
            <Navbar/>
            <DashboardHome />
            <Header />
          </>
        }
      />

      <Route
        path="/dashboard/register"
        element={
          <>
            <Navbar/>
            <DashboardHome />
            <Header />
          </>
        }
      />

      <Route path="/schedule" element={<SchedulePage />} />
    </Routes>
  );
}

export default App;