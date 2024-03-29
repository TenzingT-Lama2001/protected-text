'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import generateUuid from '../utils/generateUuid';
import { getTitleFromContent } from '../utils/helper';
import { useBoundStore } from '../store/store';

interface Tab {
  id: string;
  name: string;
  content: string;
}
function TextTabs() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: generateUuid(), content: '', name: 'Empty Tab' }]);
  const [activeTab, setActiveTab] = useState<string | null>(tabs[0]?.id);
  const setContent = useBoundStore((state) => state.setContent);
  const [closedTab, setClosedTab] = useState<Tab | undefined>();
  const [undoTimer, setUndoTimer] = useState<number | null>(null);
  const addTab = () => {
    const newTabId = generateUuid();
    const newTab: Tab = { id: newTabId, content: '', name: 'Empty Tab' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
  };

  useEffect(() => {
    const separator = CryptoJS.SHA512('-- tab separator --').toString();
    let allTabsContent = '';

    tabs.forEach((tab, index) => {
      allTabsContent += tab.content;
      if (index < tabs.length - 1) {
        allTabsContent += separator;
      }
    });
    setContent(allTabsContent);
  }, [tabs, setContent]);

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) {
      return;
    }
    const tabClosed = tabs.find((tab) => tab.id === tabId);
    const updatedTabs: Tab[] = tabs.filter((tab) => tab.id !== tabId);
    const newActiveTab: Tab | undefined = updatedTabs[updatedTabs.length - 1];
    setTabs(updatedTabs);
    setClosedTab(tabClosed);
    setUndoTimer(5);

    if (activeTab === tabId) {
      setActiveTab(newActiveTab ? newActiveTab.id : null);
    }
    // Start a countdown to clear the closedTab and undoTimer states after 5 seconds
    const countdownInterval = setInterval(() => {
      setUndoTimer((prevTimer) => (prevTimer ? prevTimer - 1 : null));
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setClosedTab(undefined);
      setUndoTimer(null);
    }, 5000);
  };

  const undoCloseTab = () => {
    if (closedTab) {
      setTabs((prevTabs) => [...prevTabs, closedTab]);
      setActiveTab(closedTab.id);
      setClosedTab(undefined);
    }
  };
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const title = getTitleFromContent(event.target.value);

    setTabs((prevState) => {
      const updatedTabs: Tab[] = prevState.map((tab) =>
        tab.id === activeTab ? { ...tab, content: event.target.value, name: title } : tab,
      );

      return updatedTabs;
    });
  };

  const renderTabs = () =>
    tabs.map((tab) => (
      <div key={tab.id} className="flex space-x-1 mr-1 text-xs">
        <div
          className={`flex items-center px-2 rounded-md border border-gray-200 ${
            tab.id === activeTab ? 'bg-white' : 'bg-gray-100'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs p-1  ${tab.id === activeTab ? 'text-gray-700' : 'text-gray-500'}`}
          >
            {tab.name}
          </button>
          <button
            type="button"
            onClick={() => closeTab(tab.id)}
            className="text-gray-500 hover:text-gray-700 ml-2 font-bold"
          >
            X
          </button>
        </div>
      </div>
    ));

  return (
    <div className="w-[calc(100% - 2rem)] max-w-screen-xl mx-auto bg-[#222222] border rounded-md border-gray-700">
      <div className="flex flex-wrap items-center mb-1">
        {renderTabs()}
        <button
          type="button"
          onClick={() => addTab()}
          className="bg-[#33996B] text-white rounded-full hover:bg-[#70b395] w-5 h-5 flex justify-center items-center border-2 border-[#33996B] shadow-md p-2"
        >
          <span className="text-sm">+</span>
        </button>
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-2">
        {closedTab && (
          <span className="p-1">
            Tab &ldquo;{closedTab.name}&rdquo; closed.{' '}
            {undoTimer !== null && (
              <>
                <button type="button" onClick={() => undoCloseTab()} className="underline cursor-pointer">
                  Undo
                </button>{' '}
                in {undoTimer} seconds.{' '}
              </>
            )}
          </span>
        )}
      </div>

      <textarea
        value={tabs.find((tab) => tab.id === activeTab)?.content}
        placeholder="your text goes here..."
        onChange={(e) => handleTextAreaChange(e)}
        className="w-full min-h-[32rem] p-2 border-1  rounded resize-vertical bg-[#222222] text-[#D6D6D6]
        focus:outline-none
        "
      />
    </div>
  );
}

export default TextTabs;
