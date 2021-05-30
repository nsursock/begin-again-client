import React, { useCallback, useState } from "react";

const TableBar = ({ numJobs, config, requestPage }) => {
  const [barSize, setBarSize] = useState(10);
  const [selectedBar, setSelectedBar] = useState(0);

  const calcNumPages = useCallback(() => {
    return (
      Math.floor(numJobs / config.pageSize) +
      (numJobs % config.pageSize === 0 ? 0 : 1)
    );
  }, [numJobs, config.pageSize]);

  const calcNumBars = useCallback(() => {
    return (
      Math.floor(calcNumPages() / barSize) +
      (calcNumPages() % barSize === 0 ? 0 : 1)
    );
  }, [calcNumPages, barSize]);

  const calcRelatedBar = useCallback(
    (page) => {
      for (let i = 0; i < calcNumBars(); i++) {
        let min = i * barSize,
          max = (i + 1) * barSize;
        if (page >= min && page < max) return i;
      }
    },
    [calcNumBars]
  );

  const renderPageBar = useCallback(() => {
    const pages = [];
    for (
      let index = selectedBar * barSize;
      index < Math.min(calcNumPages(), (selectedBar + 1) * barSize);
      index++
    ) {
      pages.push(
        <button
          onClick={() => requestPage(index, config.pageSize)}
          key={index}
          class={`${
            config.selectedPage === index
              ? "bg-indigo-600 text-white border-indigo-300"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
          } focus:outline-none relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
        >
          {index + 1}
        </button>
      );
    }
    return pages;
  }, [calcNumPages, selectedBar, config.selectedPage]);

  return (
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Previous
        </a>
        <a
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            <span>Showing </span>
            <span class="font-medium">
              {config.selectedPage * config.pageSize + 1}
            </span>
            <span> to </span>
            <span class="font-medium">
              {Math.min((config.selectedPage + 1) * config.pageSize, numJobs)}
            </span>
            <span> of </span>
            <span class="font-medium">{numJobs}</span>
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setSelectedBar(selectedBar - 1)}
              {...(selectedBar === 0 && { disabled: true })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                let p = config.selectedPage - 1;
                setSelectedBar(calcRelatedBar(p));
                requestPage(p, config.pageSize);
              }}
              {...(config.selectedPage === 0 && { disabled: true })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {renderPageBar()}
            <button
              onClick={() => {
                let p = config.selectedPage + 1;
                setSelectedBar(calcRelatedBar(p));
                requestPage(p, config.pageSize);
              }}
              {...(config.selectedPage === calcNumPages() - 1 && {
                disabled: true,
              })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => setSelectedBar(selectedBar + 1)}
              {...(selectedBar === calcNumBars() - 1 && {
                disabled: true,
              })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
        <label for="size" class="hidden text-sm font-medium text-gray-700">
          Size
        </label>
        <select
          onChange={(event) => {
            setSelectedBar(0);
            requestPage(0, event.target.value.split(" ")[0]);
          }}
          id="size"
          name="size"
          class="block w-32 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option>1 per page</option>
          <option>2 per page</option>
          <option>3 per page</option>
          <option>5 per page</option>
          <option selected>10 per page</option>
        </select>
      </div>
    </div>
  );
};

export default TableBar;
