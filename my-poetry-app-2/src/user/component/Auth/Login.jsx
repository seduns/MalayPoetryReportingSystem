import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { loginUser } from "../../../store/thunk/AuthThunk";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password,
      };

      console.log("Data Auth", data);

      const result = await dispatch(loginUser(data));
      const payload = result.payload;

      console.log("payload", payload);

      if (payload?.status === "login_success") {
        // ✅ SUCCESS: No alert, just set storage and redirect
        console.log("Account details:", payload);
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("accountId", payload.accountId);

        if (payload.role === "USER_AUTHOR") {
          navigate("/contributor/dashboard");
        } else if (payload.role === "USER_PUBLIC") {
          navigate("/poetry-discovery");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        // ❌ FAILURE: Show SweetAlert
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials. Please try again.",
          confirmButtonColor: "#DC2A54", // Matches your Coral theme
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // ❌ UNEXPECTED ERROR: Show SweetAlert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred. Please try again later.",
        confirmButtonColor: "#DC2A54",
      });
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