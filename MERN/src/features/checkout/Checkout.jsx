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
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
  TrashIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const user = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.[0] || null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Sync selected address when user profile loads asynchronously
  useEffect(() => {
    if (user?.addresses?.length > 0) {
      if (!selectedAddress) {
        setSelectedAddress(user.addresses[0]);
      }
    } else if (user && (!user.addresses || user.addresses.length === 0)) {
      setShowAddressForm(true);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  let items = useSelector(selectCart);
  items = [...items].reverse();

  const handleQtyChange = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (e, itemId) => {
    dispatch(deleteItemAsync(itemId));
  };

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalQuantity = items.reduce((total, item) => item.quantity + total, 0);

  const handleForm = (data) => {
    const updatedAddresses = [...(user.addresses || []), data];
    dispatch(updateUserAsync({ ...user, addresses: updatedAddresses }));
    setSelectedAddress(data);
    setShowAddressForm(false);
    reset();
    toast.success("New address added successfully!");
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    dispatch(
      createOrderAsync({
        items,
        user: user.id,
        totalAmount,
        totalQuantity,
        paymentMethod,
        selectedAddress,
        status: "pending",
      })
    );
  };

  const makepayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    if (paymentMethod === "online") {
      handleOrder();
      try {
        const stripe = await loadStripe(
          "pk_test_51PuIfZ05kO4vvSCr5vtSSp8RMhe8XzzbYLzbOpOFvkXqU2LrYakSpSm8gJMAxce7kASfk3IKMCoZT8FUt44GgVfR00u8Ld0kCa"
        );
        const body = {
          order: {
            items,
            user: user.id,
            totalAmount: Math.ceil(totalAmount),
            totalQuantity,
            paymentMethod,
            selectedAddress,
            status: "pending",
          },
        };
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (err) {
        toast.error("Payment initialization failed");
      }
    } else {
      handleOrder();
    }
  };

  const currentOrder = useSelector(selectCurrentOrder);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true} />}
      {paymentMethod === "cash" && currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">
          Checkout & Complete Order
        </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Address & Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Addresses */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-indigo-600" />
                Delivery Address
              </h2>
              <button
                type="button"
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-xl transition"
              >
                <PlusIcon className="h-4 w-4" />
                {showAddressForm ? "Cancel" : "Add New Address"}
              </button>
            </div>

            {/* If no addresses yet, show informational alert */}
            {(!user?.addresses || user.addresses.length === 0) && !showAddressForm && (
              <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                <p className="font-bold">No saved addresses found</p>
                <p className="mt-1 text-amber-700">Please click "Add New Address" above to enter your delivery destination.</p>
              </div>
            )}

            {/* Existing Address Radio Options */}
            {user?.addresses && user.addresses.length > 0 && !showAddressForm && (
              <div className="mt-5 grid grid-cols-1 gap-3">
                {user.addresses.map((address, index) => {
                  const isSelected =
                    selectedAddress &&
                    (selectedAddress === address ||
                      (selectedAddress.street === address.street &&
                        selectedAddress.pincode === address.pincode &&
                        selectedAddress.phone === address.phone));

                  return (
                    <label
                      key={index}
                      onClick={() => setSelectedAddress(address)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selected-address"
                        checked={Boolean(isSelected)}
                        onChange={() => setSelectedAddress(address)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 mt-1 border-slate-300"
                      />
                      <div className="flex-1 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900">
                            {address.firstname} {address.lastname}
                          </p>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-0.5">{address.street}</p>
                        <p className="text-slate-500 mt-0.5">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-slate-500 font-semibold mt-1">
                          Phone: +91 {address.phone}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Add Address Form */}
            {showAddressForm && (
              <form
                onSubmit={handleSubmit(handleForm)}
                noValidate
                className="mt-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                    <input
                      {...register("firstname", { required: "First name is required" })}
                      type="text"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3.5 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                    {errors.firstname && <p className="text-xs text-rose-500 mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                    <input
                      {...register("lastname", { required: "Last name is required" })}
                      type="text"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3.5 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                    {errors.lastname && <p className="text-xs text-rose-500 mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3.5 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      type="tel"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3.5 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    {...register("street", { required: "Street is required" })}
                    type="text"
                    className="w-full rounded-xl border-slate-200 py-2.5 px-3.5 text-xs text-slate-900 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                    <input
                      {...register("state", { required: "State is required" })}
                      type="text"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      {...register("pincode", { required: "Pincode is required" })}
                      type="text"
                      className="w-full rounded-xl border-slate-200 py-2.5 px-3 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow hover:bg-indigo-500"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
              <CreditCardIcon className="h-5 w-5 text-indigo-600" />
              Payment Method
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === "cash"
                    ? "border-indigo-600 bg-indigo-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <BanknotesIcon className="h-4 w-4 text-emerald-600" />
                    Cash on Delivery
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Pay when your order arrives</p>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod("online")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === "online"
                    ? "border-indigo-600 bg-indigo-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CreditCardIcon className="h-4 w-4 text-indigo-600" />
                    Pay with Card (Stripe)
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Safe & encrypted card payment</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
            Order Review ({totalQuantity} items)
          </h2>

          <ul className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.title}</p>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-slate-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-100">
              <span>Total Payable</span>
              <span className="text-xl text-indigo-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={paymentMethod === "online" ? makepayment : handleOrder}
            className={`w-full rounded-2xl py-4 px-4 text-sm font-bold text-white shadow-lg transition-all ${
              selectedAddress
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 hover:-translate-y-0.5 cursor-pointer"
                : "bg-slate-400 shadow-none cursor-not-allowed opacity-80"
            }`}
          >
            {selectedAddress
              ? paymentMethod === "online"
                ? "Proceed to Stripe Payment"
                : "Confirm Order"
              : "Select Delivery Address First"}
          </button>

          {!selectedAddress && (
            <p className="text-center text-[11px] text-rose-500 font-medium">
              * Please choose or add a delivery address to complete your order
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheckIcon className="h-4 w-4 text-indigo-500" />
            <span>Guaranteed secure payment experience</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
