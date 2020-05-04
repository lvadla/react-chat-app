import React from "react";
import MessageButton, { buttonTypes } from "../MessageButton";

import "./MessageButtonGroup.css";

function MessageButtons({
  isDeleted,
  messageStatus,
  confirmHandler,
  cancelHandler,
  editHandler,
  deleteHandler
}) {
  return (
    <div className="message-buttons">
      {!isDeleted && (messageStatus.isEditing ? (
        <>
          <MessageButton
            type={buttonTypes.confirm}
            handler={confirmHandler}
          />
          <MessageButton
            type={buttonTypes.cancel}
            handler={cancelHandler}
          />
        </>
      ) : (
          <>
            <MessageButton
              type={buttonTypes.edit}
              handler={editHandler}
            />
            <MessageButton
              type={buttonTypes.delete}
              handler={deleteHandler}
            />
          </>
        ))}
    </div>
  )
}

export default MessageButtons;
