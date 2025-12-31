import React, { useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed: npm install axios

export default function Register() {
    const navigate = useNavigate();

    // 1. State to hold form data
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "Author"
    });

    // 2. Function to handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This hits your @PostMapping("/signup") in AuthController
            const response = await axios.post("http://localhost:8080/auth/signup", formData);
            console.log("Registered:", response.data);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            alert("Registration failed. Please check your details.");
        }
    };

    return (

        <div className="flex min-h-screen w-screen flex-col md:flex-row font-sans">

            {/* Left Side: Branding & Illustration */}

            <div
                className="flex w-full flex-col items-center justify-center bg-coral p-10 text-white md:w-1/2">

                {/* The Illustration Box */}

                <div
                    className="relative mb-8 h-80 w-80 overflow-hidden rounded-3xl bg-white/20 p-4 shadow-xl">

                    {/* INSERTED IMAGE CONTAINER HERE */}

                    <div className="absolute inset-0 z-0">

                        {/* This class uses the image from your CSS file */}

                        <div className="login-register-bg w-full h-full"/>

                    </div>

                </div>

                <h1 className="text-3xl font-bold">Poetry Space</h1>

                <p
                    className="mt-4 max-w-sm text-center text-sm font-light leading-relaxed opacity-90">

                    Join our community of poets. Discover, read, and appreciate poetry from diverse
                    voices.

                </p>

                <div className="mt-12 flex gap-8">

                    <FeatureIcon label="Analytics" icon="📈"/>

                    <FeatureIcon label="Collaboration" icon="👥"/>

                    <FeatureIcon label="Learning" icon="🎓"/>

                </div>

            </div>

            {/* Right Side: Register Form */}

            <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">

                <div className="w-full max-w-md">

                    <div className="mb-10 text-center">

                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>

                        <p className="text-sm text-gray-400">Join us to start your poetic journey</p>

                    </div>

                    {/* 4. Added onSubmit handler */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Register As Dropdown */}

                        <div>

                            <label className="block text-xs font-semibold text-gray-500 mb-1">Register as</label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-gray-100 border-none p-4 text-sm focus:ring-2 focus:ring-coral transition-all outline-none">

                                <option value="Author">Author</option>

                                <option value="Reader">Reader</option>

                                <option value="Admin">Admin</option>

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
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                                    required />

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                                    required />

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
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full rounded-xl bg-gray-100 border-none p-4 pl-12 text-sm focus:ring-2 focus:ring-coral outline-none"
                                    required />

                            </div>

                        </div>

                        {/* Terms and Conditions */}

                        <div className="flex items-center gap-2 text-xs text-gray-500 py-2">

                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-coral focus:ring-coral"
                                required />

                            <span>I agree to the
                                <a href="#" className="text-coral font-bold">Terms & Conditions</a>
                            </span>

                        </div>

                        {/* Sign Up Button */}

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-bold text-white shadow-lg shadow-coral/30 hover:opacity-90 transition transform active:scale-95">

                            <span>🚀</span>
                            Sign Up

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

// Reusable FeatureIcon Component

function FeatureIcon({label, icon}) {

    return (

        <div className="flex flex-col items-center gap-2">

            <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">

                {icon}

            </div>

            <span className="text-[10px] uppercase tracking-widest opacity-80">{label}</span>

        </div>

    );

}