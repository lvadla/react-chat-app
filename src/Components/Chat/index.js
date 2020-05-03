import React, { useEffect, useRef } from "react";
import Message from "../../Components/Message";

import "./Chat.css";

export default function Chat() {
  const endOfMessages = useRef();

  useEffect(() => {
    endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
  }, [])

  return (
    <div className="chat">
      <h1 className="chat-title">Status Meeting Standup</h1>

      <div className="chat-container">
        <Message username="Michel Sagen" canBeChanged={true} />
        <Message username="Meetingbot" canBeChanged={false} />
        <Message username="Meetingbot" canBeChanged={false} />
        <Message username="Lars Bergendahl" canBeChanged={false} />
        <Message username="Tom Erik Lia" canBeChanged={false} />
        <Message username="Meetingbot" canBeChanged={false} />
        <Message username="Krzysztof Grzeslo" canBeChanged={false} />
        <Message username="Michel Sagen" canBeChanged={true} />
        <div ref={endOfMessages}></div>
      </div>

      <div className="chat-input">
        <input></input>
      </div>
    </div>
  );
}
