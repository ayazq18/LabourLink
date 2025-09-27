import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function RegisterSection() {
  const navigate = useNavigate();
  const [data, setData] = useState(true);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  
  const getInputClasses = (field) =>
    `w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none ${
      invalidFields[field] ? "border-red-500 focus:outline-red-500" : ""
    }`;

  const getAddressInputClasses = (field) =>
    `px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none ${
      invalidFields[field] ? "border-red-500" : ""
    }`;

  const validateForm = () => {
    const newInvalidFields = {};

    // Top-level fields
    if (!formData.name.trim()) newInvalidFields.name = true;
    if (!formData.industryName.trim()) newInvalidFields.industryName = true;
    if (!formData.phone.trim()) newInvalidFields.phone = true;
    if (!formData.email.trim()) newInvalidFields.email = true;
    if (!formData.password.trim()) newInvalidFields.password = true;
    // if (!formData.confirmPassword.trim())
    //   newInvalidFields.confirmPassword = true;

    // Address fields
    const address = formData.address;
    if (!address.state.trim()) newInvalidFields.state = true;
    if (!address.city.trim()) newInvalidFields.city = true;
    if (!address.tehsil.trim()) newInvalidFields.tehsil = true;
    if (!address.zip.trim()) newInvalidFields.zip = true;

    setInvalidFields(newInvalidFields);

    return Object.keys(newInvalidFields).length === 0;
  };

  const [formData, setFormData] = useState({
    name: "Ayaz",
    industryName: "Sona bricks",
    phone: "7841827384",
    email: "ayazq18@gmail.com",
    password: "password123",
    // confirmPassword: "password123",
    address: {
      state: "State",
      city: "City",
      tehsil: "Tehsil",
      zip: "123456",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    setData(false);
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      // Handle form submission logic here
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("====>", data);
        setData(true);
        navigate("/registration-success");
      } else {
        console.error("Registration failed");
        const errorData = await response.json();
        setError(errorData.message);
        setData(true);
      }
    } catch (error) {
      console.log("error: ", error);
      setData(true);
      navigate("/register");
    }
  };

  if (!data) return <Loader />;

  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-white">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sky-100 p-3 rounded-full mb-3">
            <span className="text-2xl">👷</span>
          </div>
          <h2 className="text-xl text-black font-semibold">
            Register your Industry
          </h2>
          <p className="text-sm text-gray-500">
            Create an account to request labour pairs
          </p>
          {error && <span className="text-red-500">{error}</span>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className={getInputClasses("name")}
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Industry Name */}
          <input
            type="text"
            placeholder="Industry Name"
            className={getInputClasses("industryName")}
            required
            name="industryName"
            value={formData.industryName}
            onChange={handleChange}
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            className={getInputClasses("phone")}
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className={getInputClasses("email")}
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className={getInputClasses("password")}
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          {/* <input
            type="password"
            placeholder="Confirm Password"
            className={getInputClasses("confirmPassword")}
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          /> */}

          {/* Address */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="State"
              className={getAddressInputClasses("state")}
              required
              name="state"
              value={formData.address.state}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="City"
              className={getAddressInputClasses("city")}
              required
              name="city"
              value={formData.address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tehsil"
              className={getAddressInputClasses("tehsil")}
              required
              name="tehsil"
              value={formData.address.tehsil}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Zip Code"
              className={getAddressInputClasses("zip")}
              required
              name="zip"
              value={formData.address.zip}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-sky-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
