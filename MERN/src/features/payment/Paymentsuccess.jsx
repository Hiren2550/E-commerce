import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { resetCartAsync } from "../cart/cartSlice";
import { resetOrder } from "../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCheck, selectLoggedInUser } from "../auth/authSlice";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Paymentsuccess = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userCheck = useSelector(selectCheck);
  useEffect(() => {
    if (userCheck && user?.id) {
      dispatch(resetCartAsync(user.id));
    }
  }, [dispatch, userCheck, user]);

  useEffect(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <div>
      <Navbar>
        <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 text-center shadow-xl">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 mb-6 shadow-inner">
              <CheckCircleIcon className="h-12 w-12 text-emerald-600" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Payment Successful
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              Thank you for your order!
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Your transaction has been securely processed. A confirmation email with receipt details has been sent to your inbox.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 shadow-md shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
              >
                Continue Shopping
              </Link>
              <Link
                to="/my-orders"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 px-6 transition"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default Paymentsuccess;
