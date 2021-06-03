import React, { Fragment, Component, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./features/Signup";
import Login from "./features/Login";
import Jobs from "./pages/Jobs";
import Form from "./pages/Form";
import Details from "./pages/Details";
import Applications from "./pages/Applications";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";
import { auth } from "./services/firebase";
import { setLoggedInUser } from "./slices/user";
import { useDispatch } from "react-redux";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        dispatch(setLoggedInUser(user));
        user
          .getIdToken(/* forceRefresh */ true)
          .then((idToken) => {
            localStorage.setItem("token", idToken);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  class="h-6 w-6 text-red-600"
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  One moment please
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Did you know you can filter jobs in the main search area?
                    Enter the keyword on the right and the jobs that match will
                    appear.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              disabled
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <svg
                class="h-5 w-5 animate-spin-slow mr-2"
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
              Loading
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <React.Fragment>
      <div
        class="absolute right-0 z-50 max-h-full overflow-y-auto"
        id="toast"
      ></div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            exact
            path="/jobs"
            authenticated={authenticated}
            component={Jobs}
          ></PrivateRoute>
          <PrivateRoute
            path="/jobs/:jobId"
            authenticated={authenticated}
            component={Details}
          ></PrivateRoute>
          <PrivateRoute
            path="/apps/:jobId"
            authenticated={authenticated}
            component={Applications}
          ></PrivateRoute>
          <PrivateRoute
            path="/form"
            authenticated={authenticated}
            component={Form}
          ></PrivateRoute>
          <PublicRoute
            path="/signup"
            exact
            authenticated={authenticated}
            component={Signup}
          ></PublicRoute>
          <PublicRoute
            path="/login"
            exact
            authenticated={authenticated}
            component={Login}
          ></PublicRoute>
        </Switch>
      </Router>
      <div id="modal" />
    </React.Fragment>
  );
};

export default App;
