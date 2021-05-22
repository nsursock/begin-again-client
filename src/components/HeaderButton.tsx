import React from "react";

type Config = {
  key: string;
  direction: string;
};

interface Props {
  caption: string;
  keys: string;
  config: Config;
  requestSort: (keys: string) => void;
}

function HeaderButton({ caption, keys, config, requestSort }: Props) {
  const getSortDirection = (name: string) => {
    if (!config) {
      return;
    }
    return config.key === name ? config.direction : undefined;
  };

  return (
    <th scope="col">
      <button
        className="focus:outline-none flex items-center justify-between w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        type="button"
        onClick={() => requestSort(keys)}
      >
        {caption}
        {getSortDirection(keys) === "descending" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        {getSortDirection(keys) === "ascending" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>
    </th>
  );
}

export default HeaderButton;
