import React from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-blue-600 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <ul className="space-y-4">
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/users")}>Users</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/labour-requests")}>Labour Requests</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/labours")}>Labours</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/payments")}>Payments</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/reports")}>Reports</li>
        <li className="hover:bg-blue-500 p-2 rounded" onClick={() => navigate("/settings")}>Settings</li>
      </ul>
    </aside>
  );
}

export default SideBar;
