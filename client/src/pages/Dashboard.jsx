import React from "react";
import MessageDisplay from "../components/MessageDisplay.jsx";
import Navbar from "../components/NavBar.jsx";
import AdminDashboard from "../components/AdminDashboardSection.jsx";

const Dashboard = () => {
  return (
    <div>
      {/* <Navbar />
      <h1>MERN Starter Frontend</h1>
      <MessageDisplay /> */}
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;
