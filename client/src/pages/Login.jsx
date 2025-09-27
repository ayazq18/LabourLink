import { useEffect } from "react";
import LoginSection from "../components/LoginSection";
import Cookies from "js-cookie";

export const Login = () => {

  useEffect(() => {
    Cookies.remove("token")
  }, [])
  return (
    <div className="flex justify-center items-center">
      <LoginSection />
    </div>
  );
};
