import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetOrder, selectCurrentOrder } from "./orderSlice";
import { resetCartAsync } from "../cart/cartSlice";
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentOrder, setCurrentOrder] = useState(null);
  const myCurrentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    if (myCurrentOrder) {
      setCurrentOrder(myCurrentOrder);
      const userId = myCurrentOrder.user?.id || myCurrentOrder.user;
      if (userId) {
        dispatch(resetCartAsync(userId));
      }
    }
  }, [dispatch, myCurrentOrder]);

  useEffect(() => {
    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch]);

  const displayOrderId = currentOrder?.id || currentOrder?._id || params?.id;

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">
      {currentOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-8 text-center">
          {/* Success Checkmark */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircleIcon className="h-10 w-10 animate-bounce" />
            </div>
            <span className="mt-4 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Payment Confirmed
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              Thank you for your order!
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md">
              Your order <span className="font-bold text-slate-900">#{displayOrderId}</span> is confirmed and will be delivered to your address within 2 business days.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-left space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <CalendarDaysIcon className="h-4 w-4 text-indigo-600" /> Date
              </span>
              <span className="font-bold text-slate-800">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-500 font-medium">Payment Method</span>
              <span className="font-bold uppercase text-slate-800">{currentOrder.paymentMethod}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-500 font-medium">Total Items</span>
              <span className="font-bold text-slate-800">{currentOrder.totalQuantity} item(s)</span>
            </div>

            <div className="flex justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-500 font-medium">Recipient Name</span>
              <span className="font-bold text-slate-800">
                {currentOrder.selectedAddress?.firstname} {currentOrder.selectedAddress?.lastname}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-500 font-medium">Shipping Address</span>
              <span className="font-semibold text-slate-800 text-right max-w-xs truncate">
                {currentOrder.selectedAddress?.street}, {currentOrder.selectedAddress?.city}
              </span>
            </div>

            <div className="flex justify-between pt-1 text-base">
              <span className="font-bold text-slate-900">Amount Charged</span>
              <span className="font-black text-indigo-600">${Math.ceil(currentOrder.totalAmount)}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/my-orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
            >
              <TruckIcon className="h-4 w-4" />
              <span>Track in My Orders</span>
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 px-6 transition"
            >
              <span>Continue Shopping</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner mx-auto">
            <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Order Processed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Your order reference <span className="font-bold text-slate-900">#{displayOrderId}</span> has been saved to your account.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/my-orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 shadow-md transition"
            >
              <TruckIcon className="h-4 w-4" />
              <span>View In My Orders</span>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 px-6 transition"
            >
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
