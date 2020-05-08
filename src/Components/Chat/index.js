import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Message from "../../Components/Message";

import "./Chat.css";

function Chat({ history, sendUpdatedWSMessage, sendWSMessage }) {
  const endOfMessages = useRef();
  const [messageText, setMessageText] = useState('');
  const userName = useContext(UserContext);

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  }

  const handleInputKeys = (e) => {
    if (e.keyCode === 13) {
      sendWSMessage(messageText)
      setMessageText('')
    }
  }

  useEffect(() => {
    // scroll the most recent chat messages into view
    endOfMessages.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [])

  return (
    <div className="chat">
      <div className="chat-body">
        <div className="messages-container">
          {history.map((msg, key) => (
            <Message
              canBeChanged={userName === msg.userName}
              deleted={msg.deleted}
              edited={msg.edited}
              index={msg.index}
              key={key}
              message={msg.message}
              updateMessage={sendUpdatedWSMessage}
              time={msg.time}
              userName={msg.userName}
            />
          ))}
          <div className="end-of-messages" ref={endOfMessages}></div>
        </div>

      </div>
      <div className="chat-footer">
        <input
          className="chat-input"
          placeholder="Message"
          name="message"
          onChange={handleInputChange}
          onKeyDown={handleInputKeys}
          type="text"
          value={messageText}
        />
      </div>
    </div>
  );
}

export default Chat;
