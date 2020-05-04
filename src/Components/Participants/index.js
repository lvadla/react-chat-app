import React from "react";

import "./Participants.css";

const participants = [
  'John Lennon',
  'John Watson',
  'Sherlock Holmes',
  'Mary Poppins'
]

function Participants() {
  return (
    <div className="participants">
      {participants.map(participant => (
        <div className="participant">
          <p className="participant-name">{participant}</p>
        </div>
      ))}
    </div>
  )
}

export default Participants;
