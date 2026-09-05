import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TagIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom";
import {
  fetchAllBrandsAsync,
  fetchAllCategoriesAsync,
  fetchAllProductsByFilterAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductListStatus,
  selectTotal,
} from "../productSlice";
import { ITEM_PER_PAGE } from "../../../../constant";
import { Grid } from "react-loader-spinner";

const sortOptions = [
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Productlist = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotal);
  const dispatch = useDispatch();

  const filters = [
    {
      id: "category",
      name: "Categories",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex((i) => i === option.value);
      if (index !== -1) {
        newFilter[section.id].splice(index, 1);
      }
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-6 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FunnelIcon className="h-5 w-5 text-indigo-600" />
                Filter Catalog
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filters */}
            <form className="mt-4 px-6 space-y-4">
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  defaultOpen={true}
                  className="border-b border-slate-100 pb-4"
                >
                  <h3 className="flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between py-2 text-sm text-slate-700 font-bold hover:text-indigo-600">
                      <span>{section.name}</span>
                      <span className="ml-6 flex items-center text-slate-400 group-hover:text-indigo-600">
                        <PlusIcon aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden" />
                        <MinusIcon aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-3 max-h-56 overflow-y-auto space-y-2.5">
                    {section.options.map((option, optionIdx) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                      >
                        <input
                          defaultValue={option.value}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                          onChange={(e) => handleFilter(e, section, option)}
                        />
                        <span className="capitalize">{option.label}</span>
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Main Container */}
      <div className="w-full">
        {/* Hero Header & Filter Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 mb-8 text-white shadow-xl shadow-slate-900/10 relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <SparklesIcon className="h-3.5 w-3.5" /> Curated Collection
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Discover Premium Goods
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Explore handpicked quality items across all your favorite categories.
              </p>
            </div>

            {/* Sort & Mobile Filter Controls */}
            <div className="flex items-center gap-3 self-start md:self-auto relative z-30">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white border border-white/10 transition">
                  Sort by
                  <ChevronDownIcon className="h-4 w-4 text-slate-300" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5 focus:outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={(e) => handleSort(e, option)}
                        className="w-full text-left rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex lg:hidden items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition"
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout: Sticky Sidebar + Product Grid */}
        <section aria-labelledby="products-heading" className="pb-16">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Filters Sidebar */}
            <form className="hidden lg:block space-y-6 sticky top-24 self-start bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FunnelIcon className="h-4 w-4 text-indigo-600" />
                  Filter Products
                </h3>
              </div>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  defaultOpen={true}
                  className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0"
                >
                  <h4 className="flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between text-xs uppercase tracking-wider font-bold text-slate-500 hover:text-indigo-600">
                      <span>{section.name}</span>
                      <span className="flex items-center text-slate-400 group-hover:text-indigo-600">
                        <PlusIcon aria-hidden="true" className="h-3.5 w-3.5 group-data-[open]:hidden" />
                        <MinusIcon aria-hidden="true" className="h-3.5 w-3.5 [.group:not([data-open])_&]:hidden" />
                      </span>
                    </DisclosureButton>
                  </h4>
                  <DisclosurePanel className="pt-3.5 max-h-60 overflow-y-auto pr-1 space-y-2.5">
                    {section.options.map((option, optionIdx) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                      >
                        <input
                          defaultValue={option.value}
                          id={`filter-${section.id}-${optionIdx}`}
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                          onChange={(e) => handleFilter(e, section, option)}
                        />
                        <span className="capitalize text-xs font-medium text-slate-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>

            {/* Product Grid Area */}
            <div className="lg:col-span-3">
              <Productgrid />
              <div className="mt-8">
                <Pagination
                  handlePage={handlePage}
                  page={page}
                  setPage={setPage}
                  totalItems={totalItems}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

function Productgrid() {
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-24 min-h-[400px]">
        <Grid
          visible={true}
          height="64"
          width="64"
          color="#4f46e5"
          ariaLabel="grid-loading"
          radius="12.5"
        />
        <p className="mt-4 text-sm font-semibold text-slate-500">Loading catalog...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl bg-white border border-dashed border-slate-300 p-12 text-center">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-3 text-base font-bold text-slate-800">No products found</h3>
        <p className="mt-1 text-sm text-slate-500">
          Try adjusting your filter selection or clear filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const discountedPrice = Math.round(
          product.price * (1 - (product.discountPercentage || 0) / 100)
        );

        return (
          <Link
            to={`/productdetails/${product.id}`}
            key={product._id || product.id}
            className="group relative flex flex-col rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Thumbnail Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
              <img
                alt={product.title}
                src={product.thumbnail}
                loading="lazy"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Discount / Category Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.discountPercentage > 0 && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-extrabold shadow-sm">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold capitalize tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Rating Pill */}
              {product.rating && (
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-white/90 backdrop-blur-md shadow-sm text-xs font-bold text-slate-800">
                  <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              )}
            </div>

            {/* Product Meta Body */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                <span className="uppercase tracking-wider text-indigo-600 font-bold">
                  {product.brand && product.brand !== "No" ? product.brand : "Premium"}
                </span>
                <span className={product.stock > 0 ? "text-emerald-600" : "text-rose-500"}>
                  {product.stock > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                {product.description}
              </p>

              {/* Price & Action Footer */}
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-slate-900">
                      ${product.price}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        ${Math.round(product.price * 1.2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                  <span>View</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Productlist;
