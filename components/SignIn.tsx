"use client";
import React, { useState } from "react";
import { LogIn } from "lucide-react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Mock sign-in process
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would redirect to admin or set auth state
      window.location.href = "/admin";
    }, 1000);
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
    >
      <LogIn size={20} />
      <span className="hidden sm:inline">
        {isLoading ? "Signing In..." : "Sign In"}
      </span>
    </button>
  );
};

export default SignIn;
