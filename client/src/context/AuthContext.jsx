// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";

// 1. Create the context
const AuthContext = createContext();

// 2. Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/auth/fetchUsers"
  );

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
