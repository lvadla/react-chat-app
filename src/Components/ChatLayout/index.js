import React from "react";
import Tabs from '../Tabs';
import { UserContextProvider } from '../../Context/UserContext.js'

import "./ChatLayout.css";

function ChatLayout({ userName }) {
  return (
    <UserContextProvider value={userName}>
      <div className="chat-layout">
        <h1 className="chat-title">Status Meeting Standup</h1>
        <Tabs />
      </div>
    </UserContextProvider>
  )
}

export default ChatLayout;
