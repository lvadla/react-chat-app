import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";

import MessageButtonGroup from "../MessageButtonGroup";

import "./Message.css";

export default function Message({ canBeChanged, username }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [messageStatus, setMessageStatus] = useState({
    isEditing: false,
    hasChanged: false
  });
  const [messageContent, setMessageContent] = useState(
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis minima amet vero nemo, in dolorum voluptates modi recusandae, ducimus ipsum nisi iste corrupti? Ducimus repellat, ea iusto aut voluptate hic?`
  );
  const [proposedText, setProposedText] = useState(messageContent);

  const contentClasses = clsx(
    "message-content",
    username === "Meetingbot" && " ambient"
  );

  const handleMessageDelete = () => {
    setIsDeleted(true);
  };

  const handleMessageEdit = () => {
    setMessageStatus(prev => ({ ...prev, isEditing: true }));
  };

  const handleMessageChange = e => {
    setProposedText(e.target.value);
  };

  const handleMessageConfirm = () => {
    if (messageContent.trim() !== proposedText.trim()) {
      setMessageContent(proposedText.trim());
      setMessageStatus({ hasChanged: true, isEditing: false });
    } else {
      setProposedText(prev => prev.trim());
      setMessageStatus({ hasChanged: false, isEditing: false });
    }
  };

  const handleMessageCancel = () => {
    setMessageStatus(prev => ({ ...prev, isEditing: false }));
    setProposedText(messageContent);
  };

  const handleEnterKeyOnEdit = e => {
    if (e.keyCode === 13) {
      handleMessageConfirm();
    }
  };

  const contentSection = messageStatus.isEditing ? (
    <TextareaAutosize
      id="edit-message-text-area"
      type="text"
      className="message-content-edit"
      onChange={handleMessageChange}
      onKeyDown={(e) => handleEnterKeyOnEdit(e)}
      spellCheck={false}
      value={proposedText}
    />
  ) : (
      <p className={contentClasses}>
        {messageContent}
        {messageStatus.hasChanged && <span className="message-edited">(edited)</span>}
      </p>
    );

  useEffect(function listenToEscapeKey() {
    function listenToEscapeKey(e) {
      if (messageStatus.isEditing && e.keyCode === 27) {
        setMessageStatus(prev => ({ ...prev, isEditing: false }));
        setProposedText(messageContent);
      }
    };
    document.addEventListener("keydown", listenToEscapeKey);

    return () => {
      document.removeEventListener("keydown", listenToEscapeKey);
    };
  });

  return (
    <div className="message-container">
      <div className="message-header-container">
        <p className="message-title">{username}</p>

        <span className="message-time">15:24</span>

        {canBeChanged && <MessageButtonGroup
          isDeleted={isDeleted}
          messageStatus={messageStatus}
          confirmHandler={handleMessageConfirm}
          cancelHandler={handleMessageCancel}
          editHandler={handleMessageEdit}
          deleteHandler={handleMessageDelete}
        />}
      </div>

      {isDeleted ? (
        <p className="message-content ambient">
          This message has been deleted. <span role="img" aria-label="trash emoji">🗑️</span>
        </p>
      ) : (
          contentSection
        )}
    </div>
  );
}
