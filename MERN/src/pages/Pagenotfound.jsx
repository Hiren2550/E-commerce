import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { ExclamationTriangleIcon, HomeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Pagenotfound = () => {
  return (
    <div>
      <Navbar>
        <main className="min-h-[70vh] grid place-items-center bg-slate-50 px-6 py-16 sm:py-24 lg:px-8">
          <div className="max-w-md text-center bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl space-y-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
              <ExclamationTriangleIcon className="h-8 w-8 text-indigo-600" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">404 Error</span>
              <h1 className="mt-2 text-3xl font-black text-slate-900 tracking-tight">
                Page Not Found
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Sorry, we couldn’t locate the page you were looking for. It may have been moved, deleted, or the URL might be incorrect.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 shadow-md shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Go Back Home</span>
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 px-6 transition"
              >
                <EnvelopeIcon className="h-4 w-4" />
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Pagenotfound;
