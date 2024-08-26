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
import { deleteUserAsync, signOutAsync } from "../../auth/authSlice";
import { Link } from "react-router-dom";

function Userprofile() {
  const [open, setOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
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
  };
  const handleSignout = () => {
    dispatch(signOutAsync());
  };
  const handleDelete = () => {
    dispatch(deleteUserAsync(user.id));
  };
  let userOrders = useSelector(selectUserOrders);
  userOrders = [...userOrders].reverse();
  const handleShowOrders = () => {
    setOrders(userOrders);
    setOpen(!open);
  };
  const handleRemoveAddress = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user.id]);
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-3xl text-center font-semibold my-4">Profile</h1>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        noValidate
        method="POST"
        className="flex flex-col gap-4"
      >
        <img
          className="rounded-full border-gray-300 h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={profile}
          alt="Profile"
        />

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              {...register("name", {
                required: { value: true, message: "name is required" },
              })}
              type="text"
              defaultValue={user.name}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="mt-1 text-xs text-red-600">{errors.name?.message}</p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-1">
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
              defaultValue={user.email}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="mt-1 text-xs text-red-600">{errors.email?.message}</p>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign out
        </span>
      </div>
      {updateSuccess && (
        <p className="text-green-500 mt-2">User is updated successfully</p>
      )}
      <div className="my-2 ">
        <h1 className="text-center mt-1 text-xl font-semibold">Addresses</h1>
        {user.addresses.map((address, index) => (
          <div
            key={address.phone}
            className="border border-gray-300 rounded-lg p-3 my-2"
          >
            <li className="flex justify-between gap-x-4  ">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.firstname}
                  </p>
                  <p className="text-sm  leading-6 text-gray-500">
                    {address.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <span>Phone : </span>
                    {address.phone}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {address.city}
                </p>
                <p className="text-sm leading-6 text-gray-500">
                  <span>Pincode : </span>
                  {address.pincode}
                </p>
              </div>
            </li>
            <div className="flex justify-end gap-4">
              <span
                className="text-red-700 cursor-pointer"
                onClick={(e) => handleRemoveAddress(e, index)}
              >
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleShowOrders}
        className="p-2 text-green-700 w-full"
      >
        Show orders
      </button>

      {open && orders && orders.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-center mt-2 text-xl font-semibold">
            Your Previous Orders
          </h1>
          {orders.map((order) => (
            <div
              key={order.id}
              className="hover:opacity-75 cursor-pointer border border-gray-300 rounded-lg p-3 flex  items-center gap-2"
            >
              <Link to={`/my-orders`}>
                <img
                  src={order.items[0].product.thumbnail}
                  alt={order.items[0].product.title}
                  className="w-20 h-20 object-contain"
                />
              </Link>
              <Link
                to={`/my-orders`}
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
              >
                <p># {order.id}</p>
              </Link>
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-700 ">
                  {order.totalQuantity} Items
                </div>
                <div className="text-slate-700 ">
                  $ {Math.ceil(order.totalAmount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Userprofile;
