import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetOrder, selectCurrentOrder } from "./orderSlice";
import { resetCartAsync } from "../cart/cartSlice";

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentOrder, setCurrentOrder] = useState(null);
  const myCurrentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    setCurrentOrder(myCurrentOrder);
    dispatch(resetCartAsync(myCurrentOrder.user.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <>
      {currentOrder && (
        <section className=" h-screen bg-gray-100 py-8 antialiased md:py-16">
          <div className="mx-auto max-w-2xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-2">
              Thanks for your order!
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8">
              Your order{" "}
              <a href="#" className="font-semibold text-black hover:underline">
                {currentOrder.id}
              </a>{" "}
              will be processed within 24 hours during working days. We will
              notify you by email once your order has been shipped.
            </p>
            <div className="space-y-4 sm:space-y-2 rounded-lg border bg-gray-50 p-6  mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Date
                </dt>
                <dd className="font-medium sm:text-end">
                  {new Date().toLocaleDateString()}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500">
                  Payment Method
                </dt>
                <dd className="font-medium sm:text-end">
                  {currentOrder.paymentMethod}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500">
                  Total Quantity
                </dt>
                <dd className="font-medium sm:text-end">
                  {currentOrder.totalQuantity}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500">
                  Total Amount
                </dt>
                <dd className="font-medium sm:text-end">
                  $ {Math.ceil(currentOrder.totalAmount)}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Name
                </dt>
                <dd className="font-medium  sm:text-end">
                  {currentOrder.selectedAddress.firstname +
                    " " +
                    currentOrder.selectedAddress.lastname}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Address
                </dt>
                <dd className="font-medium  sm:text-end">
                  {currentOrder.selectedAddress.street}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Phone
                </dt>
                <dd className="font-medium sm:text-end">
                  +91 {currentOrder.selectedAddress.phone}
                </dd>
              </dl>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={"/my-orders"}
                className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Track your order
              </Link>
              <Link
                to={"/"}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Return to shopping
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Order;
