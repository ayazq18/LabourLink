import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// PublicRoute component
const PublicRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get("token");
  console.log('token: ', token);

  if (token) {
    return <Navigate to="/home" />;
  }

  return Component ? <Component {...rest} /> : null;
};

export default PublicRoute;
