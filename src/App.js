import React, { useState } from 'react';
import ChatLayout from "./Components/ChatLayout";
import Lobby from "./Components/Lobby";

function App() {
  const [userName, setUserName] = useState('');
  return !!userName
    ? (<ChatLayout userName={userName} />)
    : (<Lobby setUserName={setUserName} />)
}

export default App;
