import React from "react";
import Participant from "../Participant";

import "./Participants.css";

function Participants({ clients }) {
  return (
    <div className="participants">
      {clients.map((client, key) => (
        <Participant key={key} participant={client} />
      ))}
    </div>
  )
}

export default Participants;
