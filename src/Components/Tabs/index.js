import React, { useState } from "react";
import clsx from "clsx";

import "./Tabs.css";

const tabs = {
  chat: 'chat',
  participants: 'participants'
}

function Tabs({ children }) {
  const [currentTab, setCurrentTab] = useState(tabs.chat);

  const handleChatSelection = () => {
    setCurrentTab(tabs.chat)
  }

  const handleParticiantsSelection = () => {
    setCurrentTab(tabs.participants)
  }

  return (
    <>
      <div className="tabs-container">
        <div
          className={clsx("tab", currentTab === tabs.participants && "active")}
          onClick={handleParticiantsSelection}
        >
          <p className="tab-name">Participants</p>
        </div>
        <div
          className={clsx("tab", currentTab === tabs.chat && "active")}
          onClick={handleChatSelection}
        >
          <p className="tab-name">Chat</p>
        </div>
      </div>
      {currentTab === tabs.chat ? children[0] : children[1]}
    </>
  );
}

export default Tabs;
