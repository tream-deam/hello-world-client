import React, { useContext, useState } from "react";

const InterimContext = React.createContext();
const InterimUpdateContext = React.createContext();

export function useInterim() {
  return useContext(InterimContext);
}

export function useInterimUpdate() {
  return useContext(InterimUpdateContext)
}

export function InterimProvider({ children }) {
  const [interim, setInterim] = useState([]);
  
  function updateInterim(result) {
    setInterim(result);
  }

  return (
    <InterimContext.Provider value={interim}>
      <InterimUpdateContext.Provider value={updateInterim}>
        {children}
      </InterimUpdateContext.Provider>
    </InterimContext.Provider>
  )
}