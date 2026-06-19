"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      console.log("Login Data:", formData);

      // 🔐 Auth API call (example)
      const res = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (res?.error) {
        alert(res.error.message || "Login failed");
        return;
      }

      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[420px] bg-white p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to continue booking tickets
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Google */}
        <button className="w-full border p-3 rounded-xl mt-4 hover:bg-gray-100">
          Continue with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            href="/authentication/signup"
            className="text-blue-600 hover:underline"
          >
            <span className="text-blue-600 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
