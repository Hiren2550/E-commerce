import React, { useState } from "react";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  EyeSlashIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const termsSections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or shopping on AuraStore, you agree to adhere to and be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using the platform immediately.",
  },
  {
    id: "account",
    title: "2. User Accounts & Security",
    content:
      "You are responsible for maintaining the confidentiality of your account password and restricting unauthorized access to your computer or mobile device. You agree to notify us immediately of any suspected breach.",
  },
  {
    id: "orders",
    title: "3. Pricing, Orders & Fulfillment",
    content:
      "All product prices listed in the catalog are subject to change without prior notice. AuraStore reserves the right to cancel or refuse any order in the event of technical inventory discrepancies or pricing errors.",
  },
  {
    id: "returns",
    title: "4. Returns, Cancellations & Refunds",
    content:
      "Items eligible for return must be sent back within 30 days of receipt in unworn, unwashed condition with all original tags attached. Refunds are processed to the original payment source within 3-5 business days.",
  },
  {
    id: "privacy",
    title: "5. Privacy Policy & Data Handling",
    content:
      "We value your privacy. We encrypt sensitive personal information using industry-standard protocols. Financial transactions are processed via secure Stripe gateways; card credentials are never saved on our databases.",
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content:
      "AuraStore and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from product use or inability to access services.",
  },
];

const TermsAndPrivacypage = () => {
  const [activeTab, setActiveTab] = useState("acceptance");

  return (
    <div>
      <Navbar>
        <div className="w-full max-w-5xl mx-auto py-8">
          {/* Hero Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                Legal & Governance
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                Terms of Service & Privacy
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Learn how we protect your personal information, handle customer transactions, and ensure a transparent e-commerce experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table of contents sidebar */}
            <div className="lg:col-span-4 sticky top-24 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-3">
                Contents
              </h3>
              {termsSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveTab(sec.id);
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === sec.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>

            {/* Main terms text */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <ScaleIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Legal Agreement</h2>
                    <p className="text-xs text-slate-400">Effective Date: January 2026</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>

              {termsSections.map((sec) => (
                <div key={sec.id} id={sec.id} className="pt-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    {sec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <LockClosedIcon className="h-4 w-4 text-indigo-600" />
                  <span>256-Bit SSL Encrypted Platform</span>
                </div>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
                >
                  Have legal questions? Contact our Compliance Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default TermsAndPrivacypage;
