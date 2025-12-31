import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/thunk/AuthThunk";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("You must agree to the Terms & Conditions");
      return;
    }

    if(role === "Reader") {
      setRole("USER_PUBLIC");
    }
    
    const data = {
      fullName: "Naimmm",
      role,
      username: name,
      email,
      password,
    };
    console.log("Register data", data);

    try {
      const result = await dispatch(registerUser(data));
      const payload = result.payload;

      if (payload?.status === "success") {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(payload?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col md:flex-row font-sans">
      {/* Left Side */}
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

      {/* Right Side: Form */}
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral transition-all outline-none"
              >
                <option>Author</option>
                <option>Reader</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral outline-none"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral outline-none"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="rounded border-gray-300 text-coral focus:ring-coral"
              />
              <span>I agree to the <a href="#" className="text-coral font-bold">Terms & Conditions</a></span>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-bold text-white shadow-lg hover:opacity-90 transition transform active:scale-95"
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
