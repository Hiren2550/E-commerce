import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { SparklesIcon, HeartIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";

const Aboupage = () => {
  return (
    <div>
      <Navbar>
        <div className="w-full max-w-6xl mx-auto py-8">
          {/* Hero Intro */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <SparklesIcon className="h-3.5 w-3.5" /> Our Story & Mission
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Redefining Online Shopping
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Welcome to AuraStore, your premier destination for high-quality electronics,
                fashion, home essentials, and lifestyle accessories. We combine modern design,
                transparent pricing, and unmatched customer care.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Customer Centric</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Every item in our store is thoroughly inspected and curated to ensure only the highest quality products reach your doorstep.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TruckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Lightning Fast Shipping</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We partner with reliable logistics providers to ensure quick, trackable, and safe delivery of all orders within 2 business days.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Secure Checkout</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                With integrated Stripe encryption and flexible Cash on Delivery, your financial data and purchase transactions are always safe.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="rounded-3xl bg-indigo-600 p-8 sm:p-10 text-white text-center shadow-xl shadow-indigo-600/30 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-black">Ready to discover your next favorite item?</h2>
            <p className="mt-2 text-xs sm:text-sm text-indigo-100 max-w-md">
              Explore our complete collection of handpicked electronics, accessories, and home goods today.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white text-indigo-600 font-bold px-6 py-3 text-sm shadow-md hover:bg-indigo-50 transition"
            >
              Explore the Catalog &rarr;
            </Link>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Aboupage;
