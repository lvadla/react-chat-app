import React, { useState } from 'react';

import "./Lobby.css";

function Lobby({ setUserName }) {
  const [nameInput, setNameInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(nameInput);
  }
  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  }
  return (
    <div className="lobby-container">
      <h3 className="lobby-title">Please choose a name before joining the room</h3>
      <form onSubmit={handleSubmit}>
        <div className="lobby-field">
          <label className="lobby-label" htmlFor="userName">
            Display name:
          </label>
          <input
            className="lobby-input"
            type="text"
            id="userName"
            name="userName"
            onChange={handleInputChange}
            value={nameInput}
            required
          />
        </div>
        <button className="lobby-submit-button" type="submit">Join Chat Room</button>
      </form>
    </div>
  );
}

export default Lobby;
