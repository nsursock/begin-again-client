import React from "react";
import { Transition } from "@headlessui/react";

const TabsButton = ({ name, setActiveTab, activeTabId, currentTabId }) => {
  return (
    <button
      onClick={() => setActiveTab(currentTabId)}
      class="text-gray-600 px-3 py-2 text-sm font-medium focus:outline-none"
      aria-current="tab"
    >
      {name}
      <Transition
        show={activeTabId === currentTabId}
        enter="transition duration-500 ease-in-out transform"
        enterFrom="scale-x-0"
        enterTo="scale-x-100"
        leave="transition duration-500 ease-in-out transform"
        leaveFrom="scale-x-100"
        leaveTo="scale-x-0"
      >
        <hr class="transform translate-y-2 border-b-2 border-indigo-600" />
      </Transition>
    </button>
  );
};

export default TabsButton;
