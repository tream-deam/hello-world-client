import React, { useContext, useState } from "react";

const CoparticipantContext = React.createContext();
const CoparticipantUpdateContext = React.createContext();

export function useCoparticipant() {
  return useContext(CoparticipantContext);
}

export function useCoparticipantUpdate() {
  return useContext(CoparticipantUpdateContext)
}

export function CoparticipantProvider({ children }) {
  const [coparticipant, setCoparticipant] = useState("");
  
  function updateCoparticipant(result) {
    setCoparticipant(result);
  }

  return (
    <CoparticipantContext.Provider value={coparticipant}>
      <CoparticipantUpdateContext.Provider value={updateCoparticipant}>
        {children}
      </CoparticipantUpdateContext.Provider>
    </CoparticipantContext.Provider>
  )
}