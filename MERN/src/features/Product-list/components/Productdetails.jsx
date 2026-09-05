import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProduct,
  selectProductListStatus,
} from "../productSlice";
import { Link, useParams } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { addToCartAsync, selectCart } from "../../cart/cartSlice";
import { selectUserInfo } from "../../user/userSlice";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  ShoppingCartIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const colors = [
  { name: "Slate White", class: "bg-white", selectedClass: "ring-slate-400" },
  { name: "Cool Gray", class: "bg-slate-300", selectedClass: "ring-slate-500" },
  { name: "Midnight Black", class: "bg-slate-900", selectedClass: "ring-slate-900" },
];

const sizes = [
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Productdetails = () => {
  const [openReview, setOpenReview] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const product = useSelector(selectProduct);
  const items = useSelector(selectCart);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectUserInfo);

  const handlecart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product?.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
        user: user?.id,
      };
      dispatch(addToCartAsync(newItem));
      toast.success("Added to your shopping cart!", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
      toast.info("Item is already in your cart", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RotatingLines
          visible={true}
          height="64"
          width="64"
          strokeColor="#4f46e5"
          strokeWidth="4"
          animationDuration="0.75"
        />
        <p className="mt-4 text-sm font-semibold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const galleryImages = product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <li>
            <Link to="/" className="hover:text-indigo-600">Home</Link>
          </li>
          <li>/</li>
          <li className="capitalize">{product.category}</li>
          <li>/</li>
          <li className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-md">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Viewer */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail selector */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[480px]">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 bg-slate-100 transition-all ${
                    activeImage === idx
                      ? "border-indigo-600 ring-2 ring-indigo-600/20 scale-105"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${idx}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Featured Image */}
            <div className="flex-1 aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/80 relative flex items-center justify-center">
              <img
                src={galleryImages[activeImage] || product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain p-4 transition-all duration-300"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Action */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="border-b border-slate-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {product.brand && product.brand !== "No" ? product.brand : "Curated Brand"}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.title}
              </h1>

              {/* Reviews & Ratings */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        (product.rating || 4) > rating
                          ? "text-amber-400"
                          : "text-slate-200",
                        "h-4 w-4 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {product.rating || 4.5}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenReview(!openReview)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 underline"
                >
                  {product.reviews?.length || 0} reviews
                </button>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ${Math.round(product.price * (1 + product.discountPercentage / 100))}
                  </span>
                )}
              </div>
            </div>

            {/* Color & Size Selectors */}
            <div className="py-6 space-y-5 border-b border-slate-100">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                  Select Color: <span className="text-slate-900 font-semibold">{selectedColor.name}</span>
                </h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex gap-3">
                  {colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color}
                      className={({ checked }) =>
                        classNames(
                          color.selectedClass,
                          checked ? "ring-2 ring-indigo-600 ring-offset-2 scale-110" : "opacity-80",
                          "relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none transition-all"
                        )
                      }
                    >
                      <span className={classNames(color.class, "h-7 w-7 rounded-full border border-slate-300 shadow-inner")} />
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                  Select Size: <span className="text-slate-900 font-semibold">{selectedSize.name}</span>
                </h3>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      className={({ checked }) =>
                        classNames(
                          checked
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200",
                          "flex items-center justify-center rounded-xl py-2.5 text-xs font-bold uppercase cursor-pointer transition-all"
                        )
                      }
                    >
                      {size.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="py-6 space-y-4">
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={handlecart}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-4 px-6 text-base font-bold text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <TruckIcon className="h-5 w-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">Free Express</span>
                  <span className="text-[10px] text-slate-400">On all orders</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">1 Year Warranty</span>
                  <span className="text-[10px] text-slate-400">100% Genuine</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <ArrowPathIcon className="h-5 w-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">30-Day Return</span>
                  <span className="text-[10px] text-slate-400">Hassle free</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2 text-sm text-slate-600 leading-relaxed">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-2">
                Description
              </h3>
              <p>{product.description}</p>
            </div>

            {/* Reviews Collapsible Drawer */}
            {openReview && product.reviews && (
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Customer Feedback</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {product.reviews.map((rev, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{rev.reviewerName}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating || 5 }).map((_, r) => (
                            <StarIcon key={r} className="h-3 w-3" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
