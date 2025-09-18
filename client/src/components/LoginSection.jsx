import { useNavigate } from "react-router-dom";

export default function LoginSection() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add login logic (e.g. API call)
    navigate("/home"); // redirect after login
  };

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
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
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
