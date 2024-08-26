import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { Navigate } from "react-router-dom";

const Myorder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  let userOrders = useSelector(selectUserOrders);
  // console.log(userOrders);
  userOrders = [...userOrders].reverse();
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user.id]);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "text-purple-600";
      case "dispatched":
        return "text-blue-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };
  return (
    <>
      {userOrders.length < 1 && <Navigate to="/" replace={true}></Navigate>}
      {userOrders.length < 1 && (
        <p className="text-xl mt-10 text-center text-slate-700">
          No more Orders
        </p>
      )}
      {userOrders &&
        userOrders.map((order, index) => (
          <section
            key={index}
            className="py-4 m-5 relative bg-white border rounded"
          >
            <div className="w-full mt-2 max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <h2 className="font-manrope font-bold text-xl sm:text-2xl leading-10 text-black mb-2">
                Order #{order.id}{" "}
                <p
                  className={` ${chooseColor(order.status)} font-bold text-xl`}
                >
                  Order Status : {order.status}
                </p>
              </h2>
              <h6 className="font-medium text-xl leading-8 text-black ">
                Hello, {order.selectedAddress.firstname}
              </h6>
              <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                Your order has been completed and be delivery in only two days .
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 py-2 my-2 border-y border-gray-300">
                <div className="box group">
                  <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                    Order
                  </p>
                  <h6 className="font-semibold font-manrope  leading-9 text-black">
                    # {order.id}
                  </h6>
                </div>
                <div className="box group">
                  <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                    Phone No.
                  </p>
                  <h6 className="font-semibold font-manrope  leading-9 text-black">
                    +91 {order.selectedAddress.phone}
                  </h6>
                </div>
                <div className="box group">
                  <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                    Payment Method
                  </p>
                  <h6 className="font-semibold font-manrope  leading-9 text-black">
                    {order.paymentMethod}
                  </h6>
                </div>
                <div className="box group">
                  <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                    City
                  </p>
                  <h6 className="font-semibold font-manrope  leading-9 text-black">
                    {order.selectedAddress.city} -{" "}
                    {order.selectedAddress.pincode}
                  </h6>
                </div>
                <div className="box group">
                  <p className="font-normal text-base leading-7 text-gray-500  transition-all duration-500 group-hover:text-gray-700">
                    Shipping Address
                  </p>
                  <h6 className="font-semibold font-manrope text-nowrap leading-9 text-black">
                    {order.selectedAddress.street}
                  </h6>
                </div>
              </div>

              <div className="border-b border-gray-300">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 w-full  py-2 border-gray-100 "
                  >
                    <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full rounded-xl mb-2"
                      />
                    </div>
                    <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                        <div className="flex flex-col justify-center ">
                          <h5 className="font-manrope font-semibold leading-9 text-black">
                            {item.product.title}
                          </h5>
                          <p className="font-normal leading-8 text-gray-500">
                            {item.product.brand}
                          </p>
                          <p className="font-normal leading-8 text-gray-500">
                            Quantity : {item.quantity}
                          </p>
                        </div>

                        <h5 className="font-manrope font-semibold text-xl leading-10 text-black sm:text-right flex   sm:justify-center">
                          $ {item.product.price}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center sm:justify-end w-full mb-2 mt-2">
                <div className=" w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-normal  leading-8 text-gray-500">
                      Total Quantity
                    </p>
                    <p className="font-semibold  leading-8 text-gray-900">
                      {order.totalQuantity} Items
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal leading-8 text-gray-500">
                      Subtotal
                    </p>
                    <p className="font-semibold leading-8 text-gray-900">
                      $ {Math.ceil(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="data ">
                <p className="font-normal text-lg leading-8 text-gray-500 ">
                  We'll be sending a shipping confirmation email when the items
                  shipped successfully.
                </p>
                <h6 className="font-manrope font-bold text-xl leading-9 text-black mb-2">
                  Thank you for shopping with us!
                </h6>
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default Myorder;
