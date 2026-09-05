import React, { useEffect } from "react";
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
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { fetchCartByUserIdAsync, selectCart } from "../cart/cartSlice";
import { fetchUserInfoAsync } from "../user/userSlice";
import { selectCheck, selectLoggedInUser } from "../auth/authSlice";

const navigation = [
  { name: "Explore", link: "/" },
  { name: "About", link: "/about" },
  { name: "Track Order", link: "/tracking" },
  { name: "FAQ", link: "/faq" },
  { name: "Contact", link: "/contact" },
];

const userNavigation = [
  { name: "My Profile", link: "/profile", icon: UserCircleIcon },
  { name: "My Orders", link: "/my-orders", icon: ShoppingBagIcon },
  { name: "Sign out", link: "/log-out", icon: ArrowRightOnRectangleIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ children }) => {
  const items = useSelector(selectCart);
  const user = useSelector(selectLoggedInUser);
  const userCheck = useSelector(selectCheck);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartByUserIdAsync(user.id));
      dispatch(fetchUserInfoAsync(user.id));
    }
  }, [dispatch, user]);

  const totalCartCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <>
      {userCheck && user && (
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Disclosure as="nav" className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-md">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    {/* Left: Brand Logo & Links */}
                    <div className="flex items-center gap-8">
                      <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                          <SparklesIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                            AuraStore
                          </span>
                          <span className="text-[10px] tracking-wider uppercase font-semibold text-indigo-400 -mt-1">
                            Premium Shop
                          </span>
                        </div>
                      </Link>

                      <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((section) => {
                          const isActive = location.pathname === section.link;
                          return (
                            <Link
                              key={section.name}
                              to={section.link}
                              className={classNames(
                                isActive
                                  ? "bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30"
                                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
                                "rounded-lg px-3.5 py-2 text-sm transition-all duration-200"
                              )}
                            >
                              {section.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Cart & User Menu */}
                    <div className="hidden md:flex items-center gap-4">
                      {/* Cart Icon */}
                      <Link
                        to="/cart"
                        className="relative group p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
                        title="Shopping Cart"
                      >
                        <ShoppingCartIcon className="h-6 w-6 transition-transform group-hover:scale-110" />
                        {items.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white shadow-lg shadow-indigo-500/40 animate-pulse">
                            {totalCartCount}
                          </span>
                        )}
                      </Link>

                      {/* User Profile dropdown */}
                      <Menu as="div" className="relative ml-1">
                        <div>
                          <MenuButton className="relative flex items-center gap-3 rounded-full pl-2 pr-3 py-1 bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                            <img
                              alt={user.name || "Profile"}
                              src={profile}
                              className="h-8 w-8 rounded-full ring-2 ring-indigo-500/50 object-cover"
                            />
                            <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                              {user.name || "My Account"}
                            </span>
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 focus:outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <p className="text-xs text-slate-400">Signed in as</p>
                            <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                          </div>
                          {userNavigation.map((section) => {
                            const Icon = section.icon;
                            return (
                              <MenuItem key={section.name}>
                                <Link
                                  to={section.link}
                                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                  {Icon && <Icon className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />}
                                  {section.name}
                                </Link>
                              </MenuItem>
                            );
                          })}
                        </MenuItems>
                      </Menu>
                    </div>

                    {/* Mobile menu and cart button */}
                    <div className="flex md:hidden items-center gap-2">
                      <Link
                        to="/cart"
                        className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                        {items.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white shadow">
                            {totalCartCount}
                          </span>
                        )}
                      </Link>

                      <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </DisclosureButton>
                    </div>
                  </div>
                </div>

                {/* Mobile Dropdown Panel */}
                <DisclosurePanel className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-3">
                  <div className="space-y-1">
                    {navigation.map((section) => (
                      <Link to={section.link} key={section.name}>
                        <DisclosureButton
                          className={classNames(
                            location.pathname === section.link
                              ? "bg-indigo-600 text-white font-semibold"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white",
                            "block w-full text-left rounded-xl px-4 py-2.5 text-base font-medium transition"
                          )}
                        >
                          {section.name}
                        </DisclosureButton>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-4 mt-4">
                    <div className="flex items-center gap-3 px-2 mb-3">
                      <img
                        alt={user.name}
                        src={profile}
                        className="h-10 w-10 rounded-full ring-2 ring-indigo-500/50"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{user.name || "User"}</span>
                        <span className="text-xs text-slate-400 truncate">{user.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {userNavigation.map((section) => (
                        <Link to={section.link} key={section.name}>
                          <DisclosureButton className="block w-full text-left rounded-xl px-4 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">
                            {section.name}
                          </DisclosureButton>
                        </Link>
                      ))}
                    </div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          {/* Main content viewport */}
          <main className="flex-1 w-full">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Navbar;
