// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// 1. Create the context
const AuthContext = createContext();

// 2. Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userFromCookie = Cookies.get("user");
  const userData = userFromCookie ? JSON.parse(userFromCookie) : null;

  useEffect(() => {
    if (userData) setUser(userData);
  }, []);

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
