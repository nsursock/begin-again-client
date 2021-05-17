import React, { useCallback } from "react";

const TableBar = ({ numJobs, config, requestPage }) => {
  // const [numPages, setNumPages] = useState(0);
  // const [activePage, setActivePage] = useState(0);

  const calcNumPages = useCallback(() => {
    return (
      Math.floor(numJobs / config.pageSize) +
      (numJobs % config.pageSize === 0 ? 0 : 1)
    );
  }, [numJobs, config]);

  const renderPageBar = useCallback(() => {
    const pages = [];
    for (let index = 0; index < calcNumPages(); index++)
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
    return pages;
  }, [calcNumPages]);

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
            <span> results</span>
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() =>
                requestPage(config.selectedPage - 1, config.pageSize)
              }
              {...(config.selectedPage === 0 && { disabled: true })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
              onClick={() =>
                requestPage(config.selectedPage + 1, config.pageSize)
              }
              {...(config.selectedPage === calcNumPages() - 1 && {
                disabled: true,
              })}
              class="focus:outline-none relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
          </nav>
        </div>
        <label for="size" class="hidden text-sm font-medium text-gray-700">
          Size
        </label>
        <select
          onChange={(event) => requestPage(0, event.target.value.split(" ")[0])}
          id="size"
          name="size"
          class="mt-1 block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option>1 job per page</option>
          <option>2 jobs per page</option>
          <option>3 jobs per page</option>
          <option>5 jobs per page</option>
          <option selected>10 jobs per page</option>
        </select>
      </div>
    </div>
  );
};

export default TableBar;
