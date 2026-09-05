import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemAsync,
  selectCart,
  selectCartLoad,
  updateCartAsync,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  TrashIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const Cart = () => {
  const dispatch = useDispatch();

  let items = useSelector(selectCart);
  const cartLoad = useSelector(selectCartLoad);
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

  if (!items.length && cartLoad) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You have <span className="font-bold text-indigo-600">{totalQuantity}</span> item(s) in your cart
          </p>
        </div>
        <Link
          to="/"
          className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
        >
          Continue Shopping &rarr;
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white border border-dashed border-slate-300 p-12 text-center my-8">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-slate-300" />
          <h2 className="mt-4 text-lg font-bold text-slate-800">Your cart is currently empty</h2>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            Looks like you haven't added any items to your shopping cart yet.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <ul role="list" className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row py-6 gap-5 sm:items-center">
                  {/* Item Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                    <img
                      alt={item.product.title}
                      src={item.product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        {item.product.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="text-sm font-semibold text-slate-500">
                        ${item.product.price} each
                      </p>
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`qty-${item.id}`} className="text-xs font-semibold text-slate-500">
                          Qty:
                        </label>
                        <select
                          id={`qty-${item.id}`}
                          name="Qty"
                          className="rounded-xl border-slate-200 py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                          onChange={(e) => handleQtyChange(e, item)}
                          value={item.quantity}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="text-base font-extrabold text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, item.id)}
                        className="rounded-xl p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Remove item"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({totalQuantity} items)</span>
                <span className="font-semibold text-slate-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Taxes</span>
                <span className="font-semibold text-slate-700">Included</span>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-slate-900">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            {/* Trust Badges */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ShieldCheckIcon className="h-4 w-4 text-indigo-600" />
                <span>Encrypted 256-bit secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <TruckIcon className="h-4 w-4 text-indigo-600" />
                <span>Fast 2-day delivery guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
