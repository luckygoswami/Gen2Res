import React from 'react';
import { useState } from 'react';

export function TabbedLayout({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="space-y-stack_sm lg:space-y-0 lg:bg-surface-container-lowest lg:border lg:border-outline-variant lg:rounded-xl lg:overflow-hidden">
      {/* Desktop Tabs */}
      <div className="hidden lg:flex border-b border-outline-variant bg-surface-container-low">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`px-8 py-4 text-label-md font-semibold ${activeTab === tab.name ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-on-surface transition-colors'}`}
            onClick={() => setActiveTab(tab.name)}>
            {tab.name}
          </button>
        ))}
      </div>
      {/* Section Content */}
      <div className="lg:px-stack_lg">
        {/* Technical Assessment Section */}
        <div className="bg-surface-container-lowest lg:bg-transparent lg:border-0 border-outline-variant rounded-xl lg:rounded-none overflow-hidden">
          {/* Technical Content */}
          {tabs.map((tab, i) => (
            <div
              key={i}
              className={`${activeTab === tab.name && ' lg:block'} hidden`}>
              {tab.element}
            </div>
          ))}
        </div>
        {/* Collapsed Sections (Mobile only accordions) */}
        {tabs.map((tab, i) => (
          <div
            key={i}
            className="lg:hidden mb-stack_md"
            onClick={() => setActiveTab(tab.name)}>
            <div className="bg-surface-container-lowest lg:bg-transparent border lg:border-0 border-outline-variant rounded-xl lg:rounded-none overflow-hidden">
              {/* Mobile Accordion Header */}
              <div className="lg:hidden p-stack_md border-b border-outline-variant bg-secondary-container/20 flex justify-between items-center">
                <h2 className="text-body-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    {tab.icon}
                  </span>
                  {tab.name}
                </h2>
                <span className="material-symbols-outlined">
                  {activeTab === tab.name ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              {/* Content */}
              <div className={`${activeTab !== tab.name && 'hidden'}`}>
                {tab.element}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
