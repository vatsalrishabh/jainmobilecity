"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; // nice icons
import Link from "next/link";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple login - in a real app, you'd validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-shop_dark_green">
            Admin Dashboard Login
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Please sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-shop_orange focus:border-shop_orange transition-all outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-shop_orange focus:border-shop_orange transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-shop_orange focus:ring-shop_orange"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-shop_orange font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-shop_dark_green text-white py-2.5 rounded-lg font-semibold hover:bg-shop_orange transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Having issues?{" "}
          <Link href="#" className="text-shop_orange hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
