import React, { useState, useEffect, useMemo } from "react";
import { db } from "../services/firebase";
import TabsButton from "../components/TabsButton";

const Applications = ({ match }) => {
  const {
    params: { jobId },
  } = match;

  const tabs = [
    { id: 1, title: "Applied", content: "lorem ipsum" },
    { id: 2, title: "Screening", content: "deolores qui" },
    { id: 3, title: "Interview", content: "molare veo" },
    { id: 4, title: "Offer", content: "sed arma" },
    { id: 5, title: "Disqualified", content: "errare humanum" },
  ];

  const [activeTabId, setActiveTab] = useState(tabs[0].id);

  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeTabId), [
    activeTabId,
    tabs,
  ]);

  return (
    <>
      <nav class="border-b border-gray-300">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  {tabs.map((tab, index) => {
                    return (
                      <TabsButton
                        name={tab.title}
                        setActiveTab={setActiveTab}
                        activeTabId={activeTabId}
                        currentTabId={tab.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
      </nav>
      <span>{activeTab.content}</span>
    </>
  );
};

export default Applications;
