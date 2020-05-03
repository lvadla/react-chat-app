import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";

import "./Message.css";

export default function Message({ canBeChanged, username }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editing, setEditing] = useState({
    isEditing: false,
    hasChanged: false
  });
  const [messageContent, setMessageContent] = useState(
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis minima amet vero nemo, in dolorum voluptates modi recusandae, ducimus ipsum nisi iste corrupti? Ducimus repellat, ea iusto aut voluptate hic?`
  );
  const [currentText, setCurrentText] = useState(messageContent);

  const contentClasses = clsx(
    "message-content",
    username === "Meetingbot" && " ambient"
  );

  const handleMessageDelete = () => {
    setIsDeleted(true);
  };
  const handleMessageEdit = () => {
    setEditing(prev => ({ ...prev, isEditing: true }));
  };
  const handleMessageChange = e => {
    setCurrentText(e.target.value);
  };
  const handleMessageConfirm = () => {
    setMessageContent(currentText);
    setEditing({ hasChanged: true, isEditing: false });
  };
  const handleMessageCancel = () => {
    setEditing(prev => ({ ...prev, isEditing: false }));
    setCurrentText(messageContent);
  };
  const handleInputKeys = e => {
    if (e.keyCode === 27) {
      setEditing(prev => ({ ...prev, isEditing: false }));
    }
    if (e.keyCode === 13) {
      handleMessageConfirm();
    }
  };

  useEffect(() => {
    const editEl = document.getElementById('edit-message-text-area');
    if (editEl) {
      const escapeListener = editEl.addEventListener("keydown", event => {
        const { key } = event;
        if (key === "Escape") {
          handleMessageCancel();
        }
      });
      return () => {
        editEl.removeEventListener("keydown", escapeListener);
      };
    }
  });

  const deleteButton = (
    <button
      title="delete"
      className="message-button"
      onClick={handleMessageDelete}
    >
      &times;
    </button>
  );
  const editButton = (
    <button title="edit" className="message-button" onClick={handleMessageEdit}>
      &#8230;
    </button>
  );
  const confirmButton = (
    <button
      title="confirm changes"
      className="message-button"
      onClick={handleMessageConfirm}
    >
      &#10004;
    </button>
  );
  const cancelButton = (
    <button
      title="cancel changes"
      className="message-button"
      onClick={handleMessageCancel}
    >
      &times;
    </button>
  );

  const contentSection = editing.isEditing ? (
    <TextareaAutosize
      id="edit-message-text-area"
      type="text"
      className="message-content-edit"
      onChange={handleMessageChange}
      onKeyDown={handleInputKeys}
      spellCheck={false}
      value={currentText}
    />
  ) : (
      <p className={contentClasses}>
        {messageContent}
        {editing.hasChanged && <span className="message-edited">(edited)</span>}
      </p>
    );

  return (
    <div className="message-container">
      <div className="message-header-container">
        <p className="message-title">{username}</p>

        <span className="message-time">15:24</span>

        {canBeChanged && (
          <div className="message-buttons">
            {!isDeleted && editing.isEditing ? (
              <>
                {confirmButton}
                {cancelButton}
              </>
            ) : (
                <>
                  {editButton}
                  {deleteButton}
                </>
              )}
          </div>
        )}
      </div>

      {isDeleted ? (
        <p className="message-content ambient">
          This message has been deleted.
        </p>
      ) : (
          contentSection
        )}
    </div>
  );
}
