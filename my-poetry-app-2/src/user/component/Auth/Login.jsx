import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../store/thunk/AuthThunk";
import { useDispatch } from "react-redux";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("Datataa", e);
    // e.preventDefault();

    // try {
    //   const data = {
    //     email: email, // backend uses email as username
    //     password,
    //   };

      
    //   console.log("Data Auth")

    //   const result = await dispatch(loginUser(data));
    //   const payload = result.payload;

    //   if (payload?.status === "login_success") {
    //     alert("Login Successful!");
    //     console.log("Account details:", payload);
    //     localStorage.setItem("accessToken", payload.data.accessToken);

    //     // Example:
    //     // localStorage.setItem("accessToken", payload.accessToken);
    //     // navigate("/admin/dashboard");
    //   } else {
    //     alert(payload?.message || "Login failed");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   alert("An unexpected error occurred.");
    // }
  };

  useEffect(() => {
    console.log("Component mounted!");
  }, []);

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
        <p className="mt-4 max-w-sm text-center text-sm opacity-90">
          Discover, read, and appreciate poetry from diverse voices.
        </p>

        <div className="mt-12 flex gap-8">
          <FeatureIcon label="Analytics" icon="📈" />
          <FeatureIcon label="Collaboration" icon="👥" />
          <FeatureIcon label="Learning" icon="🎓" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-400">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-100 p-4 text-sm focus:ring-2 focus:ring-coral outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-100 p-4 text-sm focus:ring-2 focus:ring-coral outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-coral py-4 font-bold text-white shadow-lg hover:opacity-90"
            >
              Sign In
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-coral">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureIcon({ label, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
