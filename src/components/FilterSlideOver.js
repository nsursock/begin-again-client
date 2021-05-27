import React, { useState, useEffect } from "react";

const FilterSlideOver = ({
  isShowing,
  hide,
  requestFilter,
  requestPage,
  pageConfig,
}) => {
  if (!isShowing) {
    return null;
  }
  return (
    <div
      class="fixed inset-0 overflow-hidden z-50"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          class={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity `}
          aria-hidden="true"
        ></div>

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="relative w-screen max-w-md">
            <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button
                onClick={hide}
                class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div class="px-4 sm:px-6">
                <h2
                  class="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Parameters
                </h2>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <div>
                  <label for="filter" class="text-sm font-medium text-gray-700">
                    Search
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      onInput={(event) => {
                        requestFilter(event.target.value);
                        requestPage(0, pageConfig.pageSize);
                      }}
                      type="text"
                      name="search"
                      id="search"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Filter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSlideOver;
