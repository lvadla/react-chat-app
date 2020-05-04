import React from "react";
import Tabs from '../Tabs';

import "./ChatLayout.css";

function ChatLayout() {
  return (
    <div className="chat-layout">
      <h1 className="chat-title">Status Meeting Standup</h1>
      <Tabs />
    </div>
  )
}

export default ChatLayout;
