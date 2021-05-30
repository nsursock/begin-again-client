import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ caption, address }) {
  return (
    <Link
      to={address}
      class={`${
        useLocation().pathname === address
          ? "text-white bg-indigo-600 hover:bg-indigo-700"
          : "text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
      } px-3 py-2 rounded-md text-sm font-medium`}
      aria-current="page"
    >
      {caption}
    </Link>
  );
}

export default NavLink;
