import React from "react";

const UserContext = React.createContext();

const UserContextProvider = (props) => {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
