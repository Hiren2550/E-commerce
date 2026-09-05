import React, { useEffect, useState } from "react";
import profile from "../../../assets/profile.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
  updateUserAsync,
} from "../userSlice";
import {
  deleteUserAsync,
  selectCheck,
  signOutAsync,
} from "../../auth/authSlice";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  EnvelopeIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

function Userprofile() {
  const [open, setOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleUpdate = (data) => {
    dispatch(updateUserAsync({ ...user, name: data.name, email: data.email }));
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 4000);
  };

  const handleSignout = () => {
    dispatch(signOutAsync());
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      dispatch(deleteUserAsync(user.id));
    }
  };

  let userOrders = useSelector(selectUserOrders);
  const userCheck = useSelector(selectCheck);
  userOrders = [...userOrders].reverse();

  const handleRemoveAddress = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchLoggedInUserOrdersAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      {userCheck && user && (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Header & Avatar */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              <div className="relative">
                <img
                  className="rounded-3xl border-4 border-indigo-100 h-24 w-24 object-cover shadow-md"
                  src={profile}
                  alt="Profile"
                />
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h1 className="text-2xl font-black text-slate-900">{user.name || "User Profile"}</h1>
                <p className="text-sm font-medium text-slate-500">{user.email}</p>
                <span className="inline-block px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                  {user.role || "Member"}
                </span>
              </div>
            </div>

            {/* Profile Update Form */}
            <form
              onSubmit={handleSubmit(handleUpdate)}
              noValidate
              className="space-y-5"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                    Display Name
                  </label>
                  <input
                    id="name"
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                    })}
                    type="text"
                    defaultValue={user.name}
                    className="w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                    })}
                    type="email"
                    defaultValue={user.email}
                    className="w-full rounded-2xl border-slate-200 py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {updateSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <CheckBadgeIcon className="h-4 w-4" />
                  Profile updated successfully!
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3 px-6 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

            {/* Saved Addresses Section */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Saved Delivery Addresses ({user.addresses?.length || 0})
              </h2>

              {(!user.addresses || user.addresses.length === 0) ? (
                <p className="text-xs text-slate-400">No saved addresses yet. You can add one during checkout.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((address, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 relative flex flex-col justify-between"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 text-sm">
                            {address.firstname} {address.lastname}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveAddress(e, index)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove address"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-slate-600">{address.street}</p>
                        <p className="text-slate-500">
                          {address.city} - {address.pincode}
                        </p>
                        <p className="text-slate-500 font-semibold">Phone: +91 {address.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions / Account Danger Zone */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/my-orders"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                View All My Orders
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleSignout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Sign out
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Userprofile;
