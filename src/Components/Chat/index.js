import React, { useEffect, useRef, useContext, useState, useReducer } from "react";
import { UserContext } from "../../Context/UserContext.js";
import Message from "../../Components/Message";

import "./Chat.css";

const wsURL = process.env.REACT_APP_SOCKET_URL;

const initialHistory = [];
function historyReducer(state, action) {
  switch (action.type) {
    case 'history':
      return action.data
    case 'message':
      return [...state, action.data]
    case 'edit':
    case 'delete':
      const index = action.data.index;
      const newState = state.map(msg => msg.index === index
        ? {
          ...msg,
          deleted: action.data.deleted,
          edited: action.data.edited,
          message: action.data.message
        }
        : msg
      )
      return newState
    default:
      throw new Error();
  }
}

function Chat() {
  const wsRef = useRef();
  const endOfMessages = useRef();
  const [messageText, setMessageText] = useState('');
  const [history, dispatch] = useReducer(historyReducer, initialHistory)
  const userName = useContext(UserContext);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(wsURL);
    }
    wsRef.current.onopen = function open(e) {
      // identify this client with the server
      wsRef.current.send(JSON.stringify({
        time: Date.now(),
        type: 'identification',
        userName
      }))
    }

    wsRef.current.onmessage = function incoming(e) {
      const event = JSON.parse(e.data);
      dispatch(event);
    }
  }, [userName, wsRef])

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
      setMessageText('')
    }
  }

  const wsUpdateMessage = (updateType, newMessage, index) => {
    const data = {
      time: Date.now(),
      type: updateType,
      message: newMessage,
      index,
      userName
    }
    wsRef.current.send(JSON.stringify(data))
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
              updateMessage={wsUpdateMessage}
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
