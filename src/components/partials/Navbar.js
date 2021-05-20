import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import NavLink from "../NavLink";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
      showMobileMenu: false,
      showProfileMenu: false,
    };
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
  }

  toggleMobileMenu() {
    this.setState({ showMobileMenu: !this.state.showMobileMenu });
  }

  toggleProfileMenu() {
    this.setState({ showProfileMenu: !this.state.showProfileMenu });
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
        });
      }
    });
  }

  async handleLogout() {
    this.setState({ error: "" });
    try {
      await auth().signOut();
      this.setState({ user: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={this.toggleMobileMenu}
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="block h-6 w-6"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="hidden h-6 w-6"
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
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              {/* <div class="flex-shrink-0 flex items-center">
              //   <img
              //     class="block lg:hidden h-8 w-auto"
              //     src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              //     alt="Workflow"
              //   />
              //   <img
              //     class="hidden lg:block h-8 w-auto"
              //     src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              //     alt="Workflow"
              //   />
              // </div>*/}
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <NavLink caption={"Jobs"} address={"/jobs"} />
                  <NavLink caption={"Post"} address={"/form"} />
                </div>
              </div>
            </div>
            {this.state.user ? (
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span class="sr-only">View notifications</span>
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div class="ml-3 relative z-10">
                  <div>
                    <button
                      onClick={this.toggleProfileMenu}
                      type="button"
                      class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {this.state.user.photoURL ? (
                        <div>
                          <span class="sr-only">Open user menu</span>
                          <img
                            class="h-8 w-8 rounded-full"
                            src={this.state.user.photoURL}
                            alt=""
                          />
                        </div>
                      ) : (
                        <span class="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <svg
                            class="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>

                  {this.state.showProfileMenu && (
                    <div
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabindex="-1"
                    >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <button
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-2"
                        onClick={() => {
                          this.handleLogout();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div class="flex items-end">
                <Link
                  class="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                  to="/login"
                >
                  <svg
                    class="block md:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="md:block hidden">Log In</span>
                </Link>
                <Link
                  class="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                  to="/signup"
                >
                  <svg
                    class="block md:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  <span class="md:block hidden">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {this.state.showMobileMenu && (
          <div class="sm:hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                Dashboard
              </a>

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Team
              </a>

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Projects
              </a>

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Calendar
              </a>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
