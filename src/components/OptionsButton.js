import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";

const OptionsButton = ({ jobId, userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [slideLeft, setSlideLeft] = useState(false);
  const [user, setUser] = useState(null);

  function toggleMenu() {
    if (!showMenu) {
      // show menu - nothing to do
      setShowMenu(!showMenu);
      setSlideLeft(true);
    } else {
      // hide menu - first transition then hide menu
      setSlideLeft(false);
      setTimeout(() => setShowMenu(!showMenu), 1000);
    }
  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div class="relative inline-block text-left">
      <div
        class={`${
          slideLeft ? "-translate-x-full" : "translate-x-0"
        } transition ease-in-out duration-1000 transform  ml-1`}
      >
        {showMenu && (
          <div
            class="absolute right-0 z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Options"
          >
            <Link
              class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
            {user.uid === userId && (
              <>
                <button
                  type="button"
                  class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                  class="inline-flex justify-center w-full first:rounded-l-md  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
              </>
            )}
          </div>
        )}
      </div>
      <button
        onClick={toggleMenu}
        type="button"
        class={`${
          showMenu ? "rounded-r-md" : "rounded-md"
        } z-10  relative inline-flex justify-center w-32  border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
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
