import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectOrderCheck,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { Link, Navigate } from "react-router-dom";
import { selectCheck } from "../../auth/authSlice";
import {
  ShoppingBagIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Myorder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  let userOrders = useSelector(selectUserOrders);
  const userCheck = useSelector(selectCheck);
  userOrders = [...userOrders].reverse();
  const orderCheck = useSelector(selectOrderCheck);

  useEffect(() => {
    if (user?.id) dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircleIcon,
        };
      case "dispatched":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: TruckIcon,
        };
      case "cancelled":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: XCircleIcon,
        };
      default:
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: ClockIcon,
        };
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      {userCheck && orderCheck && userOrders.length < 1 ? (
        <div className="rounded-3xl bg-white border border-dashed border-slate-300 p-12 text-center my-8">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-slate-300" />
          <h2 className="mt-4 text-lg font-bold text-slate-800">No Orders Found</h2>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            You haven't placed any orders yet. Browse our catalog and start shopping!
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order, index) => {
            const badge = getStatusBadge(order.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={order.id || index}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Order ID
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      #{order.id}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border capitalize ${badge.bg}`}
                    >
                      <BadgeIcon className="h-4 w-4" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Delivery & Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Customer</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {order.selectedAddress?.firstname} {order.selectedAddress?.lastname}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Payment Method</span>
                    <span className="font-bold text-slate-800 text-sm uppercase">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Shipping Address</span>
                    <span className="font-medium text-slate-700 block truncate">
                      {order.selectedAddress?.street}, {order.selectedAddress?.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Total Amount</span>
                    <span className="font-black text-indigo-600 text-base">
                      ${Math.ceil(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Order Item Thumbnails */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Items in this order ({order.items?.length || 0})
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product?.thumbnail}
                            alt={item.product?.title}
                            className="h-14 w-14 rounded-2xl object-cover border border-slate-200"
                          />
                          <div>
                            <Link
                              to={`/productdetails/${item.product?.id}`}
                              className="text-sm font-bold text-slate-900 hover:text-indigo-600 line-clamp-1"
                            >
                              {item.product?.title}
                            </Link>
                            <p className="text-xs text-slate-500">
                              Qty: {item.quantity} × ${item.product?.price}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-extrabold text-slate-900">
                          ${(item.product?.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Myorder;
