import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import ReactDOM, { createPortal } from "react-dom";

const Toast = ({ type, title, descr }) => {
  const [showToast, setShowToast] = useState(true);
  const [domReady, setDomReady] = useState(false);

  const remove = () => {
    setShowToast(false);
  };

  if (!descr)
    descr =
      "The website encountered an unknown error. Try again later or send a report";
  return (
    <Transition
      appear={true}
      show={showToast}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div class="bg-white mx-5 mt-3 border border-gray-200 shadow-lg rounded-lg flex items-start py-5 max-w-sm">
        <div class="mx-3">
          {type === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {type === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
        </div>
        <div class="flex flex-col items-start justify-center">
          <p class=" text-sm leading-6 font-medium text-gray-900">{title}</p>
          <p class="mt-2  text-sm text-gray-500">{descr}</p>
        </div>
        <button onClick={remove} class="text-gray-500 mx-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Transition>
  );
};
export default Toast;
