import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext.js";
import Message from "../../Components/Message";

import "./Chat.css";

const wsURL = "ws://localhost:443";

function Chat() {
  const wsRef = useRef();
  const endOfMessages = useRef();
  const [messageText, setMessageText] = useState('');
  const [history, setHistory] = useState([]);
  const userName = useContext(UserContext);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(wsURL);
    }

    wsRef.current.onmessage = function (e) {
      const event = JSON.parse(e.data);
      if (event.type === 'history') {
        setHistory(prev => [...prev, ...event.data])
      }
      if (event.type === 'message') {
        setHistory(prev => [...prev, event.data])
      }
    }
  }, [wsRef])

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  }

  const handleInputKeys = (e) => {
    if (e.keyCode === 13) {
      const data = {
        time: Date.now(),
        type: 'message',
        message: messageText,
        userName
      }
      wsRef.current.send(JSON.stringify(data))
      setHistory(prev => [...prev, data])
      setMessageText('')
    }
  }

  useEffect(() => {
    endOfMessages.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [])

  return (
    <div className="chat">
      <div className="chat-body">
        <div className="messages-container">
          {history.map(msg => (
            <Message
              canBeChanged={userName === msg.userName}
              key={`${msg.userName}-${msg.time}`}
              message={msg.message}
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
