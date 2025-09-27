import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, CircleUser } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  // Example data
  const stats = [
    { title: "Total Industries", value: 120 },
    { title: "Active Requests", value: 45 },
    { title: "Confirmed Bookings", value: 32 },
    { title: "Total Commission", value: "₹58,500" },
  ];

  const chartData = {
    labels: ["24", "25", "26", "27", "28", "29", "30", "31"],
    datasets: [
      {
        label: "Requests",
        data: [10, 20, 15, 25, 28, 22, 30, 35],
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl text-black font-bold mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Labour Requests + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Labour Requests Table */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Labour Requests</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Industry</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Pairs</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    industry: "ABC Bricks",
                    date: "2024-05-15",
                    pairs: 2,
                    status: "Accepted",
                  },
                  {
                    industry: "XYZ Bricks",
                    date: "2024-05-14",
                    pairs: 3,
                    status: "Pending",
                  },
                  {
                    industry: "PQR Bricks",
                    date: "2024-05-13",
                    pairs: 1,
                    status: "Rejected",
                  },
                  {
                    industry: "LMN Bricks",
                    date: "2024-05-12",
                    pairs: 2,
                    status: "Completed",
                  },
                ].map((req, i) => (
                  <tr key={i} className="border-b ">
                    <td className="p-2 text-black">{req.industry}</td>
                    <td className="p-2 text-black">{req.date}</td>
                    <td className="p-2 text-black">{req.pairs}</td>
                    <td className="p-2 text-black">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          req.status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : req.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : req.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-2">Industry</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  industry: "ABC Bricks",
                  date: "2024-05-15",
                  amount: "₹3,000",
                  status: "Paid",
                },
                {
                  industry: "XYZ Bricks",
                  date: "2024-05-14",
                  amount: "₹4,500",
                  status: "Pending",
                },
              ].map((payment, i) => (
                <tr key={i} className="border-b ">
                  <td className="p-2 text-black">{payment.industry}</td>
                  <td className="p-2 text-black">{payment.date}</td>
                  <td className="p-2 text-black">{payment.amount}</td>
                  <td className="p-2 text-black">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
