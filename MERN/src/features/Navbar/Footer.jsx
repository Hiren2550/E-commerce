import React from "react";
import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              AuraStore
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home Catalog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/tracking" className="hover:text-white transition">
                Track Shipment
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQ & Help
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-white transition">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-slate-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            &copy; {new Date().getFullYear()} AuraStore. All rights reserved. Built with MERN Stack.
          </span>
          <div className="flex items-center gap-4">
            <Link to="/terms-privacy" className="hover:text-slate-400 cursor-pointer">
              Privacy Policy & Terms
            </Link>
            <span>&bull;</span>
            <Link to="/faq" className="hover:text-slate-400 cursor-pointer">
              Support
            </Link>
            <span>&bull;</span>
            <span className="hover:text-slate-400">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
