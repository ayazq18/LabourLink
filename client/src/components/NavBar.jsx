// src/components/Navbar.js
import React from "react";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";

const Navbar = () => {
   const { logout } = useAuth(); // Access user and logout function

  return (
    <nav>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
