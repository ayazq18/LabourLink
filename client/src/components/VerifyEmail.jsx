import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function VerifyEmail() {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSuccess(true);
          setMessage(data.message);
          setLoading(false);
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setSuccess(false);
          setMessage(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log('error: ', error);
        setSuccess(false);
        setMessage("Error verifying email. Please try again.");
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  // Function to resend verification email
  const resendVerificationEmail = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/resend-verification-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "ayazq18@gmail.com" }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log('error: ', error);
      setMessage("Error sending the verification email. Please try again.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-xl text-center">
        {/* Success UI */}
        {success ? (
          <div className="text-green-500">
            <h2 className="text-3xl font-semibold mb-4">Success!</h2>
            <p className="text-lg mb-6">{message}</p>
            <div className="animate-pulse text-xl">Redirecting to login...</div>
          </div>
        ) : (
          <div className="text-red-500">
            <h2 className="text-3xl font-semibold mb-4">Verification Failed!</h2>
            <p className="text-lg mb-6">{message}</p>
            <button
              onClick={resendVerificationEmail}
              className="bg-blue-500 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
