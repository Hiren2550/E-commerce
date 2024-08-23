import React from "react";
import logo from "../../assets/logo.jpg";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white w-full  shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-8 border rounded-lg"
              alt="Ecommerce Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ecommerce
            </span>
          </Link>
          <ul className="flex flex-wrap gap-4 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to={"/about"} className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>Privacy Policy</li>
            <li>Licensing</li>
            <li>
              <Link to={"/about"} className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href="/" className="m-1 hover:underline">
            Ecommerce
          </Link>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
