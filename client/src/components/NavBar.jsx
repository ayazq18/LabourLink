// src/components/Navbar.js
import React from "react";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth(); // Access user and logout function
  const navigate = useNavigate();

  const logout = () => {
    // Remove the token from cookies
    Cookies.remove("token");

    navigate("/login");
  };

  return (
    <nav>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
