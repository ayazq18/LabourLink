import { useNavigate } from "react-router-dom";

export default function RegisterSection() {
    const navigate = useNavigate()
  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-white">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sky-100 p-3 rounded-full mb-3">
            <span className="text-2xl">👷</span>
          </div>
          <h2 className="text-xl text-black font-semibold">Register your Industry</h2>
          <p className="text-sm text-gray-500">
            Create an account to request labour pairs
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Industry Name */}
          <input
            type="text"
            placeholder="Industry Name"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Address */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="State"
              className="px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Tehsil"
              className="px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="px-4 py-2 bg-gray-600 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
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
