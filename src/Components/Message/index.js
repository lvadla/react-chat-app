import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";

import MessageButtonGroup from "../MessageButtonGroup";

import "./Message.css";

export default function Message({
  canBeChanged,
  deleted,
  edited,
  index,
  message,
  updateMessage,
  time,
  userName
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(message);
  const [proposedText, setProposedText] = useState(messageContent);

  const timeFormat = new Intl.DateTimeFormat("en", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  });
  const formattedTime = timeFormat.format(time);

  const contentClasses = clsx(
    "message-content",
    userName === "Meetingbot" && "ambient"
  );

  const handleMessageDelete = () => {
    const deletedMsg = ''
    updateMessage('delete', deletedMsg, index)
  };

  const handleMessageEdit = () => {
    setIsEditing(true);
  };

  const handleMessageChange = e => {
    setProposedText(e.target.value);
  };

  const handleMessageConfirm = () => {
    const trimmedText = proposedText.trim();
    if (messageContent.trim() !== trimmedText) {
      setMessageContent(trimmedText);
      updateMessage('edit', trimmedText, index)
      setIsEditing(false);
    } else {
      setProposedText(prev => prev.trim());
      setIsEditing(false);
    }
  };

  const handleMessageCancel = () => {
    setIsEditing(false);
    setProposedText(messageContent);
  };

  const handleEnterKeyOnEdit = e => {
    if (e.keyCode === 13) {
      handleMessageConfirm();
    }
  };

  const contentSection = isEditing ? (
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
        {message}
        {edited && <span className="message-edited">(edited)</span>}
      </p>
    );

  useEffect(function listenToEscapeKey() {
    function listenToEscapeKey(e) {
      if (isEditing && e.keyCode === 27) {
        handleMessageCancel();
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
        <p className="message-title">{userName}</p>

        <span className="message-time">{formattedTime}</span>

        {canBeChanged && <MessageButtonGroup
          isDeleted={deleted}
          isEditing={isEditing}
          confirmHandler={handleMessageConfirm}
          cancelHandler={handleMessageCancel}
          editHandler={handleMessageEdit}
          deleteHandler={handleMessageDelete}
        />}
      </div>

      {deleted ? (
        <p className="message-content ambient">
          This message has been deleted. <span role="img" aria-label="trash emoji">🗑️</span>
        </p>
      ) : (
          contentSection
        )}
    </div>
  );
}
