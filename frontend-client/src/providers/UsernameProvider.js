import React, { createContext, useState, useContext } from "react";

const NameContext = createContext();
const NameUpdateContext = createContext();

export function useName() {
  return useContext(NameContext);
}

export function useNameUpdate() {
  return useContext(NameUpdateContext);
}

// We will need this for <Label> for videos as well as <AppointmentHeader>

export function UserNameProvider({ children }) {
  const [userName, setUserName] = useState("");

  function assignName(newName) {
    setUserName(newName);
  }

  return (
    <NameContext.Provider value={userName}>
      <NameUpdateContext.Provider value={assignName}>
        {children}
      </NameUpdateContext.Provider>
    </NameContext.Provider>
  );
}
