import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

export default function LoginSection() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful! Data:", data);

        Cookies.set("token", data.token, { expires: 1, path: "/" });
        setUser(data.user);
        navigate("/Dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // if (!data) return <Loader />;
  // else if (data) navigate("/home");

  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-white">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sky-100 p-3 rounded-full mb-3">
            <span className="text-2xl">🔑</span>
          </div>
          <h2 className="text-xl text-black font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">
            Login to access your industry dashboard
          </p>
          {error && <span className="text-red-500">{error}</span>}
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-sky-600 font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
