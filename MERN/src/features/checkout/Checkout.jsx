import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import {
  deleteItemAsync,
  selectCart,
  updateCartAsync,
} from "../cart/cartSlice";
import { useForm } from "react-hook-form";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../user/userSlice";

const Checkout = () => {
  const user = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(user.addresses[0]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  let items = useSelector(selectCart);
  items = [...items].reverse();
  const handleQtyChange = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleDelete = (e, itemId) => {
    dispatch(deleteItemAsync(itemId));
  };
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalQuantity = items.reduce((total, item) => item.quantity + total, 0);
  const handleForm = (data) => {
    dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };
  const handleOrder = () => {
    dispatch(
      createOrderAsync({
        items,
        user,
        totalAmount,
        totalQuantity,
        paymentMethod,
        selectedAddress,
      })
    );
  };
  return (
    <>
      {!items.length && <Navigate to={"/"} replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}

      <div className="mx-auto max-w-6xl px-4  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className=" mt-6 lg:col-span-3 p-3 ">
            <form
              noValidate
              className="bg-white px-5 py-3"
              onSubmit={handleSubmit(handleForm)}
            >
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-3">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstname"
                        type="text"
                        {...register("firstname", {
                          required: {
                            value: true,
                            message: "firstname is required",
                          },
                        })}
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstname?.message}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastname"
                        type="text"
                        {...register("lastname", {
                          required: {
                            value: true,
                            message: "lastname is required",
                          },
                        })}
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastname?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
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
                          required: {
                            value: true,
                            message: "email is required",
                          },
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "invalid email",
                          },
                        })}
                        type="email"
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "phone number is required",
                          },
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Invalid phone number!",
                          },
                        })}
                        type="text"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone?.message}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        {...register("street", {
                          required: {
                            value: true,
                            message: "street-name is required",
                          },
                        })}
                        type="text"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.street?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        {...register("city", {
                          required: {
                            value: true,
                            message: "city-name is required",
                          },
                        })}
                        type="text"
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.city?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="state"
                        {...register("state", {
                          required: {
                            value: true,
                            message: "state-name is required",
                          },
                        })}
                        type="text"
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.state?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="pincode"
                        {...register("pincode", {
                          required: {
                            value: true,
                            message: "pincode is required",
                          },
                        })}
                        type="text"
                        autoComplete="on"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="mt-1 text-sm text-red-500">
                        {errors.pincode?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-end gap-x-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className=" mt-3 border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose From Existing addresses
                  </p>
                  <ul
                    role="list"
                    className="divide-y mt-2 divide-gray-500  border-gray-300"
                  >
                    {user.addresses.map((address) => (
                      <li
                        key={address.phone}
                        className="flex justify-between gap-x-6 py-5 px-3 "
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            id="address"
                            name="address"
                            type="radio"
                            value={selectedAddress}
                            onChange={() => setSelectedAddress(address)}
                            checked={selectedAddress == address ? true : false}
                            className="h-4 w-4 mt-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
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
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One Method for Payment
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            value={"cash"}
                            onChange={() => setPaymentMethod("cash")}
                            checked={paymentMethod == "cash" ? true : false}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="online"
                            name="payments"
                            value={"online"}
                            onChange={() => setPaymentMethod("online")}
                            checked={paymentMethod == "online" ? true : false}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="online"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* For Cart Ui */}
          <div className="lg:col-span-2">
            <div className="my-8 mx-auto max-w-6xl px-2 py-2 sm:px-4 lg:px-4 bg-white border border-gray-200">
              <h1 className="text-2xl mt-2  font-semibold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="mt-2">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-200">
                    {items.length > 0 &&
                      items.map((item) => (
                        <li key={item.id} className="flex py-5">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={item.title}
                              src={item.thumbnail}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className=" flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <p>{item.title}</p>
                                </h3>
                                <p className="ml-4 text-nowrap">
                                  {" "}
                                  $ {item.price}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <span>Qty</span>
                                <select
                                  name="Qty"
                                  className="mx-2 rounded my-2"
                                  onChange={(e) => handleQtyChange(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={(e) => handleDelete(e, item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    {items.length == 0 && (
                      <div>
                        <h3>No Product</h3>
                      </div>
                    )}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {Math.ceil(totalAmount)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalQuantity} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    disabled={user.addresses.length ? false : true}
                    onClick={handleOrder}
                    className=" w-full cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </button>
                </div>
                <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to={"/"}>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
