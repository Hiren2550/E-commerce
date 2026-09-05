import React, { useState } from "react";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { toast } from "react-toastify";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Contactpage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Your message has been sent.");
  };

  return (
    <div>
      <Navbar>
        <div className="w-full max-w-6xl mx-auto py-8">
          {/* Header */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                Support & Inquiries
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                We'd love to hear from you
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Have questions about an order, our products, or looking for partnership opportunities? Our support team is available 24/7.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Get in Touch Directly
                </h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
                      <EnvelopeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Email Us</p>
                      <p className="font-bold text-slate-800">support@aurastore.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Phone Support</p>
                      <p className="font-bold text-slate-800">+1 (800) 234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Headquarters</p>
                      <p className="font-bold text-slate-800">100 Market St, San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                    Operating Hours
                  </h3>
                  <p className="text-xs text-slate-600">Monday &ndash; Friday: 9:00 AM &ndash; 8:00 PM EST</p>
                  <p className="text-xs text-slate-600">Saturday &ndash; Sunday: 10:00 AM &ndash; 6:00 PM EST</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-indigo-600" />
                Send a Message
              </h2>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3">
                  <CheckCircleIcon className="h-12 w-12 mx-auto text-emerald-600" />
                  <h3 className="text-base font-bold">Message Dispatched!</h3>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out, {form.name}. A customer specialist will reply to {form.email} within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full rounded-2xl border-slate-200 py-3 px-4 text-xs text-slate-900 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full rounded-2xl border-slate-200 py-3 px-4 text-xs text-slate-900 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Order question / General feedback"
                      className="w-full rounded-2xl border-slate-200 py-3 px-4 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your question or request here..."
                      className="w-full rounded-2xl border-slate-200 py-3 px-4 text-xs text-slate-900 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Contactpage;
