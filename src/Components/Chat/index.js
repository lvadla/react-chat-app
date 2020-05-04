import React, { useEffect, useRef } from "react";
import Message from "../../Components/Message";

import "./Chat.css";

export default function Chat() {
  const endOfMessages = useRef();

  useEffect(() => {
    endOfMessages.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [])

  return (
    <div className="chat">
      <div className="chat-body">
        <div className="messages-container">
          <Message username="Michel Sagen" canBeChanged={true} />
          <Message username="Meetingbot" canBeChanged={false} />
          <Message username="Meetingbot" canBeChanged={false} />
          <Message username="Lars Bergendahl" canBeChanged={false} />
          <Message username="Tom Erik Lia" canBeChanged={false} />
          <Message username="Meetingbot" canBeChanged={false} />
          <Message username="Krzysztof Grzeslo" canBeChanged={false} />
          <Message username="Michel Sagen" canBeChanged={true} />
          <div className="end-of-messages" ref={endOfMessages}></div>
        </div>

      </div>
      <div className="chat-footer">
        <input className="chat-input" placeholder="Message"></input>
      </div>
    </div>
  );
}
