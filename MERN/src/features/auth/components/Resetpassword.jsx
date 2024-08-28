import React from "react";
import logo from "../../../assets/logo.jpg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync, selectResetCheck } from "../authSlice";

const Resetpassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const resetCheck = useSelector(selectResetCheck);
  const handleForm = (data) => {
    console.log(data);
    dispatch(resetPasswordAsync({ email, token, password: data.password }));
  };
  return (
    <>
      {token && email ? (
        <div className="flex h-screen  min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={logo} className="mx-auto h-20 w-20" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter New Password
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit(handleForm)}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium  text-gray-900"
                  >
                    Password
                  </label>
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
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-xs text-red-600">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Confirm-password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "confirm password is required",
                      },
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
              {resetCheck && (
                <p className="mt-1 text-xs text-green-600">
                  password rest successful
                </p>
              )}
            </form>
            <p className="mt-2 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>Incorrect link</p>
      )}
    </>
  );
};

export default Resetpassword;
