import React, { useState } from "react";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { Link } from "react-router-dom";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const faqsData = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard delivery typically takes 2-5 business days. Express delivery options are available at checkout for next-day or 2-day delivery.",
      },
      {
        q: "How do I track my order status?",
        a: "You can track your order by navigating to your 'Order History' page via the user profile menu. Each order displays its current status (Pending, Dispatched, Delivered).",
      },
      {
        q: "Do you offer international shipping?",
        a: "Currently, we ship across all primary domestic states. International shipping options will be available in future store expansions.",
      },
    ],
  },
  {
    category: "Payments & Pricing",
    items: [
      {
        q: "What payment methods are supported?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) powered by Stripe, as well as Cash on Delivery (COD) for eligible regions.",
      },
      {
        q: "Is payment information secure?",
        a: "Yes, 100%. All transactions are tokenized and encrypted with bank-level security through Stripe. We never store credit card numbers on our servers.",
      },
      {
        q: "Are there any hidden fees or extra taxes?",
        a: "No hidden charges. Taxes and standard shipping are calculated clearly on the checkout review screen before you place your order.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day hassle-free return policy for unused items in original packaging with intact tags.",
      },
      {
        q: "How quickly are refunds processed?",
        a: "Once our return facility receives and inspects the item, refunds are credited to the original payment method within 3-5 business days.",
      },
    ],
  },
];

const Faqpage = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const filteredCategories = faqsData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div>
      <Navbar>
        <div className="w-full max-w-5xl mx-auto py-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                Help & Information
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                Frequently Asked Questions
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Find quick answers to common questions about orders, payments, shipping, and returns.
              </p>

              {/* Search Bar */}
              <div className="mt-6 relative max-w-md">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions (e.g., shipping, returns, payment)..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 text-xs focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
                />
              </div>
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <TruckIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Fast 2-Day Shipping</h4>
                <p className="text-[11px] text-slate-500">Trackable door-to-door delivery</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <ArrowPathIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">30-Day Returns</h4>
                <p className="text-[11px] text-slate-500">Simple money-back guarantee</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Encrypted Payments</h4>
                <p className="text-[11px] text-slate-500">Stripe & COD checkout</p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Lists */}
          <div className="space-y-8">
            {filteredCategories.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                <QuestionMarkCircleIcon className="h-12 w-12 mx-auto text-slate-300" />
                <h3 className="mt-3 text-base font-bold text-slate-800">No matching questions found</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try searching for another keyword or reach out directly to our support team.
                </p>
              </div>
            ) : (
              filteredCategories.map((cat, catIdx) => (
                <div key={catIdx} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
                  <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                    {cat.category}
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {cat.items.map((item, itemIdx) => {
                      const itemKey = `${catIdx}-${itemIdx}`;
                      const isOpen = openIndex === itemKey;
                      return (
                        <div key={itemIdx} className="py-4">
                          <button
                            type="button"
                            onClick={() => toggle(itemKey)}
                            className="w-full flex items-center justify-between text-left gap-4 group"
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
                              {item.q}
                            </span>
                            <ChevronDownIcon
                              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                                isOpen ? "rotate-180 text-indigo-600" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed pr-6">
                              {item.a}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Need More Help Box */}
          <div className="mt-12 rounded-3xl bg-indigo-50 border border-indigo-100 p-8 text-center flex flex-col items-center">
            <ChatBubbleLeftRightIcon className="h-10 w-10 text-indigo-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900">Still have questions?</h3>
            <p className="mt-1 text-xs text-slate-600 max-w-md">
              Can't find the answer you're looking for? Our friendly customer team is ready to assist.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-6 shadow-md shadow-indigo-600/30 transition"
            >
              Contact Support Team
            </Link>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Faqpage;
