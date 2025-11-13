import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full my-2">
      <div className="flex flex-wrap p-1 bg-violet-50 rounded-2xl border border-violet-100">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex-1 sm:flex-none relative px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all
              ${
                activeTab === tab.label
                  ? "bg-white text-violet-700 shadow-lg"
                  : "text-slate-500 hover:text-violet-700 hover:bg-white/50"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <span className="relative z-10 ">
              {tab.label}
              {activeTab === tab.label && (
                <div className="absolute inset-0 bg-gr bg-violet-500/10 to-fuchsia-500/10 rounded-xl"></div>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
