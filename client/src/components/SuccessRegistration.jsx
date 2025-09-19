

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an attractive check icon from react-icons
import { Link } from 'react-router-dom'; // Link to navigate back to login or home

const SuccessRegistration = () => {
  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Registration Successful!
        </h1>

        {/* Message */}
        <p className="text-lg text-center text-gray-600 mb-6">
          Please check your email to verify your account and activate your profile.
        </p>

      </div>
    </div>
  );
};

export default SuccessRegistration;
