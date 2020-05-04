import React from "react";
import Chat from '../Chat';

import "./ChatLayout.css";

function ChatLayout() {
  return (
    <div className="chat-layout">
      <h1 className="chat-title">Status Meeting Standup</h1>
      <Chat />
    </div>
  )
}

export default ChatLayout;
