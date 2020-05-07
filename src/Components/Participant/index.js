import React from "react";

import "./Participant.css";

function Participant({ participant }) {
  return (
    <div className="participant">
      <p className="participant-name">{participant}</p>
    </div>
  )
}

export default Participant;
