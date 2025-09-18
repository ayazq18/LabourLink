// src/context/useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// 3. Export the useAuth hook
export const useAuth = () => useContext(AuthContext);
