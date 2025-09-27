import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// PublicRoute component
const PublicRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return Component ? <Component {...rest} /> : null;
};

export default PublicRoute;
