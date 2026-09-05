import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Paymentcancel = () => {
  return (
    <div>
      <Navbar>
        <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-rose-100 p-8 sm:p-10 text-center shadow-xl">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-rose-50 text-rose-600 mb-6 shadow-inner">
              <XCircleIcon className="h-12 w-12 text-rose-600" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
              Payment Cancelled
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              Transaction Incomplete
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Your payment session was cancelled or timed out. No charges were made to your account. Your items remain in your cart.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cart"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 shadow-md shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
              >
                Return to Cart
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 px-6 transition"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Paymentcancel;
