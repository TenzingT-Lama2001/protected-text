'use client';

import React, { ChangeEvent, useState } from 'react';
import generateUuid from '../utils/generateUuid';

interface Tab {
  id: string;
  content: string;
}
function TextTabs() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: generateUuid(), content: '' }]);
  const [activeTab, setActiveTab] = useState<string | null>(tabs[0]?.id);

  const addTab = () => {
    const newTabId = generateUuid();
    const newTab: Tab = { id: newTabId, content: '' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) {
      return;
    }
    const updatedTabs: Tab[] = tabs.filter((tab) => tab.id !== tabId);
    const newActiveTab: Tab | undefined = updatedTabs[updatedTabs.length - 1];
    setTabs(updatedTabs);

    if (activeTab === tabId) {
      setActiveTab(newActiveTab ? newActiveTab.id : null);
    }
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTabs: Tab[] = tabs.map((tab) =>
      tab.id === activeTab ? { ...tab, content: event.target.value } : tab,
    );
    setTabs(updatedTabs);
  };

  const renderTabs = () =>
    tabs.map((tab) => (
      <div key={tab.id} className="flex space-x-1 mr-1 text-xs">
        <div className={`relative flex  px-1 mr-1  ${tab.id === activeTab ? 'text-gray bg-white' : 'bg-gray-200'}`}>
          <button type="button" onClick={() => setActiveTab(tab.id)} className="text-xs p-1 rounded-md h-full mr-1">
            Empty tab
          </button>
          <button
            type="button"
            onClick={() => closeTab(tab.id)}
            className="font-semibold absolute top-0 right-0 text-gray-700"
          >
            X
          </button>
        </div>
      </div>
    ));

  return (
    <div className="w-[calc(100% - 2rem)] max-w-screen-xl mx-auto bg-[#F4F4F5]">
      <div className="flex flex-wrap items-center mb-1">
        {renderTabs()}
        <button
          type="button"
          onClick={addTab}
          className="bg-[#4F46E5] text-white rounded-sm hover:bg-[#6057ff] flex items-center h-4 w-4 text-center justify-center"
        >
          +
        </button>
      </div>

      <textarea
        value={tabs.find((tab) => tab.id === activeTab)?.content}
        onChange={handleTextAreaChange}
        className="w-full min-h-[28rem] p-2 border border-gray-300 rounded resize-vertical"
      />
    </div>
  );
}

export default TextTabs;
