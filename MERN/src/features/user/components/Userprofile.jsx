import React, { useState } from "react";
import profile from "../../../assets/profile.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";

function Userprofile() {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const handleUpdate = (data) => {
    dispatch(updateUserAsync({ ...user, name: data.name, email: data.email }));
  };
  const handleSignout = () => {};
  const handleDelete = () => {};
  const handleShowOrders = () => {};
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
      {/* {updateSuccess && (
        <p className="text-green-500 mt-2">User is updated successfully</p>
      )} */}
      <button
        type="button"
        onClick={handleShowOrders}
        className="p-2 text-green-700 w-full"
      >
        Show orders
      </button>

      {/* {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border border-gray-300 rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="w-18 h-16 object-contain"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase"
                  type="button"
                >
                  Delete
                </button>

                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase" type="button">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default Userprofile;
