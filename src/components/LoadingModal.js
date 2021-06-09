import { Fragment, useState, useEffect, useCallback } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";

const LoadingModal = ({ isShowing, hide }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  });

  const createModal = () => {
    return (
      <Transition show={isShowing}>
        <div
          class="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              enter="transition-opacity ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                onClick={hide}
                class="fixed inset-0 bg-gray-500 bg-opacity-75"
                aria-hidden="true"
              ></div>
            </Transition.Child>

            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="transform transition duration-400"
              enterFrom="opacity-0 rotate-120 scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div class="z-50 relative inline-block align-bottom   overflow-hidden   sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <svg
                  class="h-40 w-40 animate-spin-slow text-indigo-600 m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    );
  };

  return !isReady
    ? null
    : createPortal(createModal(), document.querySelector("#modal"));
};

export default LoadingModal;
