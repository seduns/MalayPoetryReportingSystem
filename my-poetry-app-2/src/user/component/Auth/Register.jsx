import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/thunk/AuthThunk"; // Ensure this thunk exists

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form fields
  const [formData, setFormData] = useState({
    role: "USER_AUTHOR", // Default to Author
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agreeToTerms) {
    alert("Please agree to the Terms & Conditions");
    return;
  }

  try {
    // 1. Generate a temporary username (e.g., "user_8231" or "rashdan_17123123")
    // This allows the backend to accept the request.
    const tempUsername = formData.email.split('@')[0] + "_" + Math.floor(Math.random() * 10000);

    const data = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role, 
      username: tempUsername, // Backend needs this!
    };

    console.log("Registering with auto-generated username:", data);

    const result = await dispatch(registerUser(data));
    const payload = result.payload;

    if (result.meta.requestStatus === "fulfilled") {
      alert("Registration Successful!");
      navigate("/login");
    } else {
      alert(payload?.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};

  return (
    <div className="flex min-h-screen w-screen flex-col md:flex-row font-sans">
      {/* Left Side: Branding & Illustration */}
      <div className="flex w-full flex-col items-center justify-center bg-coral p-10 text-white md:w-1/2">
        <div className="relative mb-8 h-80 w-80 overflow-hidden rounded-3xl bg-white/20 p-4 shadow-xl">
          <div className="absolute inset-0 z-0">
            <div className="login-register-bg w-full h-full" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Poetry Space</h1>
        <p className="mt-4 max-w-sm text-center text-sm font-light leading-relaxed opacity-90">
          Join our community of poets. Discover, read, and appreciate poetry from diverse voices.
        </p>

        <div className="mt-12 flex gap-8">
          <FeatureIcon label="Analytics" icon="📈" />
          <FeatureIcon label="Collaboration" icon="👥" />
          <FeatureIcon label="Learning" icon="🎓" />
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-400">Join us to start your poetic journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Register As Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Register as</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral transition-all outline-none"
              >
                <option value="USER_AUTHOR">Author</option>
                <option value="USER_PUBLIC">Reader</option>
              </select>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">👤</span>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">📧</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">🔒</span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="rounded border-gray-300 text-coral focus:ring-coral"
              />
              <span>I agree to the <a href="#" className="text-coral font-bold">Terms & Conditions</a></span>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-bold text-white shadow-lg shadow-coral/30 hover:opacity-90 transition transform active:scale-95"
            >
              <span>🚀</span> Sign Up
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-coral hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureIcon({ label, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-widest opacity-80">{label}</span>
    </div>
  );
}