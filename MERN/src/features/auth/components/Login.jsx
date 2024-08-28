import React, { useState } from "react";
import logo from "../../../assets/logo.jpg";
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
      {userCheck && user && <Navigate to="/" replace={true}></Navigate>}
      {!open && (
        <div className=" h-screen flex min-h-full flex-1 flex-col justify-center items-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={logo} className="mx-auto h-20 w-20" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit(handleForm)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: { value: true, message: "email is required" },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "invalid email",
                      },
                    })}
                    type="email"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-xs text-red-600">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      onClick={() => {
                        setOpen(!open);
                        reset();
                      }}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message: `- at least 8 characters\n
                   - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                   - Can contain special characters`,
                      },
                    })}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-xs text-red-600">
                  {errors.password?.message}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
              {error && <p className="text-xs text-red-600">{error.message}</p>}
            </form>

            <p className="mt-2 text-center text-sm text-gray-500">
              Not have account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      )}
      {open && (
        <div className=" h-screen flex min-h-full flex-1 flex-col justify-center items-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={logo} className="mx-auto h-20 w-20" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter Email to reset password
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit(handleEmail)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: { value: true, message: "email is required" },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "invalid email",
                      },
                    })}
                    type="email"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-xs text-red-600">
                  {errors.email?.message}
                </p>
                {mailSent && (
                  <p className="mt-1 text-xs text-green-600">Mail Sent</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Email
                </button>
              </div>
            </form>

            <p className="mt-2 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                onClick={() => {
                  setOpen(!open);
                  reset();
                }}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
