import React from "react";

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row font-sans">
      {/* Left Side: Branding & Illustration (Matches Login) */}
      <div className="flex w-full flex-col items-center justify-center bg-coral p-10 text-white md:w-1/2">
        <div className="relative mb-8 h-80 w-80 overflow-hidden rounded-3xl bg-white/20 p-4 shadow-xl">
          <img 
            src="https://placehold.co/600x600/png?text=Creative+Work" 
            alt="Poetry Space" 
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">Poetry Space</h1>
        <p className="mt-4 max-w-sm text-center text-sm font-light leading-relaxed opacity-90">
          Join our community of poets. Discover, read, and appreciate poetry from diverse voices.
        </p>
        
        <div className="mt-12 flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">📈</div>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Analytics</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">👥</div>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Collaboration</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">🎓</div>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Learning</span>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-400">Join us to start your poetic journey</p>
          </div>

          <form className="space-y-5">
            {/* Register As Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Register as</label>
              <select className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral transition-all">
                <option>Author</option>
                <option>Reader</option>
              </select>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">👤</span>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral"
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
                  placeholder="Create a password" 
                  className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
              <input type="checkbox" className="rounded border-gray-300 text-coral focus:ring-coral" />
              <span>I agree to the <a href="#" className="text-coral font-bold">Terms & Conditions</a></span>
            </div>

            {/* Sign Up Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-bold text-white shadow-lg shadow-coral/30 hover:bg-coral/90 transition transform active:scale-95">
              <span>🚀</span> Sign Up
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account? <a href="/login" className="font-bold text-coral hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}