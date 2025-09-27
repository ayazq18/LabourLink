import React, { useState } from "react";
import { ChevronDown, CircleUser } from "lucide-react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import SideBar from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";

export default function PrivateLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-2xl font-semibold text-black">
            {params?.page?.toUpperCase()}
          </h1>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <CircleUser color="black" />
              <span className="font-medium text-black">{user?.name}</span>
              <ChevronDown
                color="black"
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Render the actual page content */}
        <Outlet />
      </main>
    </div>
  );
}
