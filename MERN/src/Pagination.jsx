import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEM_PER_PAGE } from "../constant";

const Pagination = ({ handlePage, page, setPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE) || 1;
  const startItem = (page - 1) * ITEM_PER_PAGE + 1;
  const endItem = Math.min(page * ITEM_PER_PAGE, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200/80 px-4 py-3.5 shadow-sm sm:px-6">
      {/* Mobile pager */}
      <div className="flex w-full justify-between sm:hidden">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => handlePage(page > 1 ? page - 1 : 1)}
          className={`px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 transition ${
            page <= 1
              ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-400"
              : "bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
          }`}
        >
          Previous
        </button>
        <span className="text-xs font-semibold text-slate-500 self-center">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => handlePage(page < totalPages ? page + 1 : totalPages)}
          className={`px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 transition ${
            page >= totalPages
              ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-400"
              : "bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop pagination summary */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-800">{totalItems > 0 ? startItem : 0}</span> to{" "}
            <span className="font-bold text-slate-800">{endItem}</span> of{" "}
            <span className="font-bold text-slate-800">{totalItems}</span> results
          </p>
        </div>

        {/* Desktop Page Numbers */}
        <div>
          <nav aria-label="Pagination" className="inline-flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => handlePage(page > 1 ? page - 1 : 1)}
              className={`p-2 rounded-xl border border-slate-200 text-slate-500 transition ${
                page <= 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isCurrent = pageNum === page;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePage(pageNum)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => handlePage(page < totalPages ? page + 1 : totalPages)}
              className={`p-2 rounded-xl border border-slate-200 text-slate-500 transition ${
                page >= totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
