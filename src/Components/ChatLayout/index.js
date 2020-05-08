import React from "react";
import useWebSocketChat from "../../Hooks/useWebSocketChat"

import Chat from "../Chat";
import Participants from "../Participants";
import Tabs from '../Tabs';
import { UserContextProvider } from '../../Context/UserContext.js'

import "./ChatLayout.css";

function ChatLayout({ userName }) {
  const { clients, history, sendUpdatedWSMessage, sendWSMessage } = useWebSocketChat(userName);
  return (
    <div className="chat-layout">
      <h1 className="chat-title">Status Meeting Standup</h1>
      <UserContextProvider value={userName}>
        <Tabs>
          <Chat
            history={history}
            sendUpdatedWSMessage={sendUpdatedWSMessage}
            sendWSMessage={sendWSMessage}
          />
          <Participants clients={clients} />
        </Tabs>
      </UserContextProvider>
    </div>
  )
}

export default ChatLayout;
