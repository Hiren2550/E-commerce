import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserAsync,
  resetPasswordRequestAsync,
  selectCheck,
  selectError,
  selectLoggedInUser,
  selectMailSent,
} from "../authSlice";
import { SparklesIcon, LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userCheck = useSelector(selectCheck);
  const mailSent = useSelector(selectMailSent);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForm = (data) => {
    dispatch(checkUserAsync({ email: data.email, password: data.password }));
  };

  const handleEmail = (data) => {
    dispatch(resetPasswordRequestAsync({ email: data.email }));
  };

  return (
    <>
      {userCheck && user && <Navigate to="/" replace={true} />}

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950">
        <div className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30 text-white mb-4">
              <SparklesIcon className="h-7 w-7" />
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {open ? "Reset your password" : "Welcome back"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              {open
                ? "Enter your email address and we'll send you a recovery link"
                : "Enter your credentials to access your account"}
            </p>
          </div>

          {/* Normal Login Form */}
          {!open && (
            <form
              noValidate
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(handleForm)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
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
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(true);
                      reset();
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-500 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                  {error.message || "Invalid credentials. Please try again."}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <LockClosedIcon className="h-4 w-4" />
                <span>Sign in</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-indigo-600 hover:text-indigo-500 underline"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {open && (
            <form
              noValidate
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(handleEmail)}
            >
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  Your Registered Email
                </label>
                <input
                  id="reset-email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {mailSent && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  Password reset link sent! Check your inbox.
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200"
              >
                <EnvelopeIcon className="h-4 w-4" />
                <span>Send Reset Link</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                >
                  &larr; Back to sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
