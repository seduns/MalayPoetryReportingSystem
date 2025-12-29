import React from "react";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row font-sans">
      {/* Left Side: Branding & Illustration */}
      <div className="flex w-full flex-col items-center justify-center bg-coral p-10 text-white md:w-1/2">
        <div className="relative mb-8 h-80 w-80 overflow-hidden rounded-3xl bg-white/20 p-4 shadow-xl">
          {/* Placeholder for the illustration of people working */}
          <img 
            src="https://placehold.co/600x600/png?text=Illustration+Here" 
            alt="Poetry Space" 
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">Poetry Space</h1>
        <p className="mt-4 max-w-sm text-center text-sm font-light leading-relaxed opacity-90">
          Discover, read, and appreciate poetry from diverse voices, explore full poems with detailed insights.
        </p>
        
        {/* Features Icons */}
        <div className="mt-12 flex gap-8">
          <FeatureIcon label="Analytics" icon="📈" />
          <FeatureIcon label="Collaboration" icon="👥" />
          <FeatureIcon label="Learning" icon="🎓" />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to access your dashboard</p>
          </div>

          <form className="space-y-6">
            {/* Login As Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Login as</label>
              <select className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral">
                <option>Author</option>
                <option>Reader</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">📧</span>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral"
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
                  placeholder="Enter your password" 
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-coral focus:ring-coral" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-coral hover:underline">Forgot Password?</a>
            </div>

            {/* Sign In Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-bold text-white shadow-lg shadow-coral/30 hover:bg-coral/90 transition">
              <span>📲</span> Sign In
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-gray-400">
            Don't have an account? <a href="/register" className="font-bold text-coral hover:underline">Sign up</a>
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