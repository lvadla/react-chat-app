import React, { useState } from "react";
import clsx from "clsx";

import Chat from "../Chat";
import Participants from "../Participants";

import "./Tabs.css";

const tabs = {
  chat: 'chat',
  participants: 'participants'
}

function Tabs() {
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
      {currentTab === tabs.chat ? (<Chat />) : (<Participants />)}
    </>
  );
}

export default Tabs;
