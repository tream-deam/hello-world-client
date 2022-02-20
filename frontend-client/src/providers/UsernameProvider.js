import React, { createContext, useState, useContext } from "react";

const NameContext = createContext();
const NameUpdateContext = createContext();

export function useName() {
  return useContext(NameContext);
}

export function useNameUpdate() {
  return useContext(NameUpdateContext);
}
const interimNameContext = createContext();
const interimNameUpdateContext = createContext();

export function useInterimName() {
  return useContext(interimNameContext);
}

export function useInterimNameUpdate() {
  return useContext(interimNameUpdateContext);
}

// We will need this for <Label> for videos as well as <AppointmentHeader>

export function UserNameProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [interimName, setInterimName] = useState("");

  function assignName(newName) {
    setUserName(newName);
  }
  function assignInterimName(newInterimName) {
    setInterimName(newInterimName);
  }

  return (
    <interimNameContext.Provider value={interimName}>
      <interimNameUpdateContext.Provider value={assignInterimName}>
        <NameContext.Provider value={userName}>
          <NameUpdateContext.Provider value={assignName}>
            {children}
          </NameUpdateContext.Provider>
        </NameContext.Provider>
      </interimNameUpdateContext.Provider>
    </interimNameContext.Provider>
  );
}
