import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { Transition } from "@headlessui/react";

const OptionsButton = ({ jobId, userId, loggedInUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div class="relative inline-block text-left">
      <Transition
        show={showMenu}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="opacity-0 scale-x-0 -translate-x-1/2"
        enterTo="opacity-100 scale-x-100 translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="opacity-100 scale-x-100 translate-x-0"
        leaveTo="opacity-0 scale-x-0 -translate-x-1/2"
      >
        <div
          class="absolute right-32 z-0 inline-flex rounded-md shadow-sm -space-x-px -mr-1"
          aria-label="Options"
        >
          <Link
            class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none "
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            to={`/jobs/${jobId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class=" ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </Link>
          {loggedInUser.uid === userId && (
            <>
              <button
                type="button"
                class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Remove
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <Link
                class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none "
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
                to={`/apps/${jobId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Status
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>
      </Transition>
      <button
        onClick={toggleMenu}
        type="button"
        class={`${
          showMenu ? "rounded-r-md" : "rounded-md"
        } z-10  relative inline-flex justify-center w-32  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none `}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Options
        {!showMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="-mr-1 ml-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="-mr-1 ml-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default OptionsButton;
