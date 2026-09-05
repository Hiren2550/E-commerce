import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectCheck, selectLoggedInUser } from "../authSlice";
import { SparklesIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userCheck = useSelector(selectCheck);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleForm = (data) => {
    dispatch(
      createUserAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        addresses: [],
        role: "Normal User",
      })
    );
  };

  return (
    <>
      {userCheck && user && <Navigate to="/" replace={true} />}

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950">
        <div className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl">
          {/* Brand header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30 text-white mb-4">
              <SparklesIcon className="h-7 w-7" />
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create an Account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Join AuraStore to unlock exclusive deals and personalized recommendations
            </p>
          </div>

          <form
            noValidate
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(handleForm)}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "At least 8 chars with 1 uppercase, 1 lowercase & 1 number",
                  },
                })}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: { value: true, message: "Confirm password is required" },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <UserPlusIcon className="h-4 w-4" />
              <span>Create Account</span>
            </button>

            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-indigo-600 hover:text-indigo-500 underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
