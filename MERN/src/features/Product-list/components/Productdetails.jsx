import React from "react";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProduct } from "../productSlice";
import { Link, useParams } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { addToCartAsync } from "../../cart/cartSlice";
import { selectUserInfo } from "../../user/userSlice";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Productdetails = () => {
  const [openReview, setOpenReview] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProduct);
  //console.log(product);
  const dispatch = useDispatch();
  const params = useParams();
  //console.log(params.id);
  const user = useSelector(selectUserInfo);

  const handlecart = (e) => {
    e.preventDefault();
    const newItem = { ...product, quantity: 1, user: user.id };
    delete newItem["id"];
    dispatch(addToCartAsync(newItem));
  };
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <>
      {product && (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {/* {product.breadcrumbs &&
              product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))} */}
                <li className="text-sm">
                  <div
                    aria-current="page"
                    className="font-medium text-2xl text-gray-500 hover:text-gray-600"
                  >
                    {product.category} / {product.title}
                  </div>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            {product.images && (
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    alt={product.title}
                    src={product.images[0]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.title}
                      src={product.images[1]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.title}
                      src={product.images[2]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <img
                    alt={product.title}
                    src={product.images[3]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            )}

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl mb-2 font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
                {product.tags &&
                  product.tags.map((tag) => (
                    <span
                      key={tag.length}
                      className="bg-blue-100 text-gray-700 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg--500  border border-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  $ {product.price}
                </p>

                {/* Reviews */}
                {product.reviews && (
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              product.reviews[0].rating > rating
                                ? "text-gray-900"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {product.reviews[0].rating} out of 5 stars
                      </p>
                      <div
                        onClick={(e) => setOpenReview(!openReview)}
                        className=" cursor-pointer ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {product.reviews.length} reviews
                      </div>
                    </div>
                  </div>
                )}

                {openReview && (
                  <div className="mt-4">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <article className="p-6 m-1 text-base bg-white border-t rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src={profile}
                                  alt={review.reviewerName}
                                />
                                {review.reviewerName}
                              </p>
                            </div>
                          </footer>
                          <p className="text-gray-500 dark:text-gray-400">
                            {review.comment}
                          </p>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time
                              pubdate=""
                              dateTime="2022-06-23"
                              title="June 23rd, 2022"
                            >
                              Date : {review.date}
                            </time>
                          </p>
                        </article>
                      ))}
                  </div>
                )}

                <p
                  className={`mt-3 ${
                    product.stock > 10 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock} available in stock
                </p>

                <form className="mt-5">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="flex items-center space-x-3"
                      >
                        {colors &&
                          colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={classNames(
                                color.selectedClass,
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </Radio>
                          ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {sizes &&
                          sizes.map((size) => (
                            <Radio
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    stroke="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  >
                                    <line
                                      x1={0}
                                      x2={100}
                                      y1={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </Radio>
                          ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  <button
                    type="button"
                    onClick={handlecart}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                  <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to={"/"}>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights &&
                        product.highlights.map((highlight) => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className=" mt-3 relative overflow-x-auto">
                    <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Product Details
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Category
                          </th>
                          <td className="px-6 py-4">{product.category}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Brand
                          </th>
                          <td className="px-6 py-4">{product.brand}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            SKU
                          </th>
                          <td className="px-6 py-4">{product.sku}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Warranty Information
                          </th>
                          <td className="px-6 py-4">
                            {product.warrantyInformation}
                          </td>
                        </tr>

                        <tr className="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Shipping Information
                          </th>
                          <td className="px-6 py-4">
                            {product.shippingInformation}
                          </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Return Policy
                          </th>
                          <td className="px-6 py-4">{product.returnPolicy}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productdetails;
