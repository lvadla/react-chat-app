import React from "react";

import "./MessageButton.css";

export const buttonTypes = {
  delete: 'delete',
  edit: 'edit',
  confirm: 'confirm',
  cancel: 'cancel',
}

const deleteGlyph = (
  <div className="message-button-glyph">
    &times;
  </div>
)
const editGlyph = (
  <div className="message-button-glyph">
    &#8230;
  </div>
)
const confirmGlyph = (
  <div className="message-button-glyph">
    &#10003;
  </div>
)
const cancelGlyph = (
  <div className="message-button-glyph">
    &times;
  </div>
)

const buttonGlyphs = {
  [buttonTypes.delete]: deleteGlyph,
  [buttonTypes.edit]: editGlyph,
  [buttonTypes.confirm]: confirmGlyph,
  [buttonTypes.cancel]: cancelGlyph,
}

function MessageButton({ type, handler }) {
  return (
    <button
      aria-label={type}
      className="message-button"
      onClick={handler}
      title={buttonTypes[type]}
      type="button"
    >
      {buttonGlyphs[type]}
    </button>
  )
}

export default MessageButton;
