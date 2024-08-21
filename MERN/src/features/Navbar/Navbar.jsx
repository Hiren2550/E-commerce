import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
useSelector;
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { fetchCartByUserIdAsync, selectCart } from "../cart/cartSlice";
import { fetchUserInfoAsync } from "../user/userSlice";
import { selectLoggedInUser } from "../auth/authSlice";

const navigation = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
];
const userNavigation = [
  { name: "Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/log-out" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = ({ children }) => {
  const items = useSelector(selectCart);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchCartByUserIdAsync(user.id));
      dispatch(fetchUserInfoAsync(user.id));
    }
  }, [dispatch, user.id]);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <img
                      alt="Your Company"
                      src={logo}
                      className="h-8 w-8 border rounded"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((section) => (
                      <Link
                        key={section.name}
                        to={section.link}
                        aria-current={section.current ? "page" : undefined}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {section.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link to={"/cart"}>
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                    >
                      <span className="absolute -inset-1.5" />
                      <ShoppingCartIcon
                        aria-hidden="true"
                        className="h-8 w-8 mb-0"
                      />
                    </button>
                  </Link>
                  {items.length > 0 && (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs  relative mb-5 -ml-4 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {items.length}
                    </span>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt={user.firstname}
                          src={profile}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((section) => (
                        <MenuItem key={section.name}>
                          <Link
                            to={section.link}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {section.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((section) => (
                <Link to={section.link} key={section.name}>
                  <DisclosureButton
                    aria-current={section.current ? "page" : undefined}
                    className={classNames(
                      section.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {section.name}
                  </DisclosureButton>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt={user.firstname}
                    src={profile}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.firstname + "" + user.lastname}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <Link to={"/cart"} className="">
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />

                    <ShoppingCartIcon
                      aria-hidden="true"
                      className="h-8 w-8 mb-0"
                    />
                  </button>
                </Link>
                {items.length > 0 && (
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs  relative mb-5 -ml-4 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {items.length}
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((section) => (
                  <Link to={section.link} key={section.name}>
                    <DisclosureButton className="w-full text-start block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      {section.name}
                    </DisclosureButton>
                  </Link>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-commerce
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
