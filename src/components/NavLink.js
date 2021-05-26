import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ caption, address }) {
  return (
    <Link
      to={address}
      class={`${
        useLocation().pathname === address
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      } px-3 py-2 rounded-md text-sm font-medium`}
      aria-current="page"
    >
      {caption}
    </Link>
  );
}

export default NavLink;
