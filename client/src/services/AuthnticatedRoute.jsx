import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get("token");
  console.log('token: ', token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return Component ? <Component {...rest} /> : null;
};

export default PrivateRoute;
