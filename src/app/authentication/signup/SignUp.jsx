"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Signup = () => {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const userData = {
        name: formData.name,
        email: formData.email,
        photo: formData.photo,
        // role: role,
        password: formData.password,
      };


      // ✅ Better Auth API call (FIXED)
      const { data, error } = await authClient.signUp.email({
        ...userData,
        plan: "free",
      });

      if (error) {
        console.error("Signup Error:", error);
        alert(error.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
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
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Join NexTrip and start booking tickets
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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

          {/* photo */}
          <div>
            <input
              placeholder="Photo URL"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              {...register("photo", {
                required: "Photo URL is required",
              })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
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

          {/* Role Select */}
          {/* <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>

            <p className="text-xs text-gray-400 mt-1">
              User = Book tickets | Vendor = Sell tickets
            </p>
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Google */}
        <button className="w-full border p-3 rounded-xl mt-4 hover:bg-gray-100">
          Continue with Google
        </button>

        {/* Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
