import React, { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { selectCart } from "./cartSlice";
import { useSelector } from "react-redux";

const Cart = () => {
  const [open, setOpen] = useState(true);

  let items = useSelector(selectCart);
  items = [...items].reverse();
  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );
  const totalQuantity = items.reduce((total, item) => item.quantity + total, 0);

  return (
    <>
      <div className="my-8 mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 bg-white border border-gray-200">
        <h1 className="text-4xl my-2  font-semibold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="mt-6">
          <div className="flow-root">
            <ul role="list" className=" divide-y divide-gray-200">
              {items.length > 0 &&
                items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={item.title}
                        src={item.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <div>{item.title}</div>
                          </h3>
                          <p className="ml-4"> $ {item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <span>Qty</span>
                          <select name="" id="" className="mx-2 rounded">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              {items.length == 0 && (
                <div>
                  <h3>No Product</h3>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalQuantity} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to={"/"}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
