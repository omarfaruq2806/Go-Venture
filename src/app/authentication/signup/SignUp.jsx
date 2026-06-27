"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { googleSignIn } from "@/lib/session/client-session";
import {
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Shield,
  Loader2,
} from "lucide-react";
import Link from "next/link";

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
    // FIX: Full screen wrapper elements automatic dark mode adjustment balance korbe
    <div className="w-full min-h-screen bg-base-200 flex items-center justify-center p-4 transition-colors duration-200">
      {/* Container Box */}
      <div className="w-full max-w-md bg-base-100 border border-base-200 p-6 md:p-8 rounded-2xl shadow-xl transition-all">
        {/* Title Group */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-base-content">
            Create Account
          </h2>
          <p className="text-sm font-medium text-base-content/60 mt-1.5">
            Join TicketBari and start booking tickets
          </p>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input: Name */}
          <div className="form-control w-full">
            <div className="relative flex items-center group">
              <User className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-error text-xs font-semibold mt-1 pl-1">
                ⚠️ {errors.name.message}
              </p>
            )}
          </div>

          {/* Input: Email */}
          <div className="form-control w-full">
            <div className="relative flex items-center group">
              <Mail className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-error text-xs font-semibold mt-1 pl-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Input: Photo URL */}
          <div className="form-control w-full">
            <div className="relative flex items-center group">
              <ImageIcon className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
              <input
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
                {...register("photo", { required: "Photo URL is required" })}
              />
            </div>
            {errors.photo && (
              <p className="text-error text-xs font-semibold mt-1 pl-1">
                ⚠️ {errors.photo.message}
              </p>
            )}
          </div>

          {/* Input: Password */}
          <div className="form-control w-full">
            <div className="relative flex items-center group">
              <Lock className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-error text-xs font-semibold mt-1 pl-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Input: Role Select */}
          {/* <div className="form-control w-full">
            <div className="relative flex items-center group">
              <Shield className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
              >
                <option value="user">Passenger / User</option>
                <option value="vendor">Operator / Vendor</option>
              </select>
            </div>
            <p className="text-[11px] font-medium text-base-content/40 mt-1.5 pl-1">
              💡 User = Book tickets | Vendor = Sell transport seats
            </p>
          </div> */}

          {/* Action Button: Submit Signup */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block rounded-xl font-bold text-sm tracking-wide text-primary-content shadow-sm hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider Layer */}
        <div className="divider my-5 text-[11px] font-bold uppercase tracking-wider text-base-content/30">
          Or Register With
        </div>

        {/* OAuth Button: Google Provider */}
        <button
          onClick={googleSignIn}
          className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 btn-block rounded-xl font-bold text-sm text-base-content transition-all"
        >
          {/* Custom SVG Icon integration */}
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12 4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Auth Route Redirect Option */}
        <p className="text-center text-sm font-medium text-base-content/70 mt-5">
          Already have an account?{" "}
          <Link
            href="/authentication/signin"
            className="text-primary font-bold hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
