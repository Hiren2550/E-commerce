import React, { useState } from "react";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserOrders } from "../features/user/userSlice";
import {
  TruckIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Trackingpage = () => {
  const orders = useSelector(selectUserOrders) || [];
  const [searchOrderId, setSearchOrderId] = useState("");
  const [activeOrder, setActiveOrder] = useState(orders[0] || null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const found = orders.find(
      (o) =>
        o.id?.toString().toLowerCase().includes(searchOrderId.trim().toLowerCase()) ||
        o._id?.toString().toLowerCase().includes(searchOrderId.trim().toLowerCase())
    );
    if (found) {
      setActiveOrder(found);
    } else {
      // Mock order preview for testing if ID doesn't match local orders
      setActiveOrder({
        id: searchOrderId.trim(),
        status: "shipped",
        createdAt: new Date().toISOString(),
        totalAmount: 149.99,
        items: [
          {
            product: {
              title: "Verified Package Item",
              thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60",
              price: 149.99,
            },
            quantity: 1,
          },
        ],
        selectedAddress: {
          name: "Recipient",
          street: "Express Transit Hub",
          city: "Metropolis",
          state: "CA",
          pinCode: "94016",
          phone: "+1 800-234-5678",
        },
      });
    }
  };

  const steps = [
    { name: "Order Placed", desc: "Your payment was confirmed", icon: CheckCircleIcon, completed: true },
    {
      name: "Processing & Quality Check",
      desc: "Items verified and boxed safely",
      icon: ClockIcon,
      completed: true,
    },
    {
      name: "Shipped & In Transit",
      desc: "Handed over to carrier network",
      icon: TruckIcon,
      completed: activeOrder?.status === "shipped" || activeOrder?.status === "delivered",
    },
    {
      name: "Delivered",
      desc: "Delivered to your doorstep",
      icon: MapPinIcon,
      completed: activeOrder?.status === "delivered",
    },
  ];

  return (
    <div>
      <Navbar>
        <div className="w-full max-w-5xl mx-auto py-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl mb-10 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                Live Shipment Tracking
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                Track Your Shipment
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Enter your order tracking reference ID below to monitor real-time delivery status and carrier checkpoints.
              </p>

              {/* Order Search Bar */}
              <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g. 64d1... or test reference)"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 text-xs focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition whitespace-nowrap"
                >
                  Track Status
                </button>
              </form>
            </div>
          </div>

          {activeOrder ? (
            <div className="space-y-8">
              {/* Order Status Timeline Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Tracking Reference
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      #{activeOrder.id || activeOrder._id || "AUR-89412-EXP"}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold self-start sm:self-auto border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Status: {activeOrder.status ? activeOrder.status.toUpperCase() : "DISPATCHED"}
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    {steps.map((step, idx) => {
                      const Icon = step.icon;
                      return (
                        <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 relative">
                          <div
                            className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                              step.completed
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                : "bg-slate-100 text-slate-400 border border-slate-200"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4
                              className={`text-xs font-bold ${
                                step.completed ? "text-slate-900" : "text-slate-400"
                              }`}
                            >
                              {step.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Address & Details */}
                {activeOrder.selectedAddress && (
                  <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-900">Destination Address:</p>
                      <p className="text-slate-600 font-semibold">{activeOrder.selectedAddress.name}</p>
                      <p className="text-slate-500">{activeOrder.selectedAddress.street}</p>
                      <p className="text-slate-500">
                        {activeOrder.selectedAddress.city}, {activeOrder.selectedAddress.state} -{" "}
                        {activeOrder.selectedAddress.pinCode}
                      </p>
                      <p className="text-slate-500">Phone: {activeOrder.selectedAddress.phone}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Carrier Network:</p>
                        <p className="text-slate-500">Aura Express Logistics & Priority Air Transit</p>
                        <p className="text-[11px] text-slate-400 mt-2">
                          Standard courier transit signature required on final delivery.
                        </p>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-indigo-600 font-bold">
                        <ShieldCheckIcon className="h-4 w-4" />
                        <span>Insured & Covered by Buyer Guarantee</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <TruckIcon className="h-14 w-14 mx-auto text-slate-300" />
              <h3 className="text-lg font-bold text-slate-900">No active tracking selected</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Check your recent orders list in your profile, or enter your Order Tracking ID above.
              </p>
              <Link
                to="/my-orders"
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-6 shadow-md transition"
              >
                View My Orders
              </Link>
            </div>
          )}
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Trackingpage;
