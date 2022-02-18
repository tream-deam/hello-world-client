import React, { useContext, useState } from "react";

const TranslationContext = React.createContext();
const TranslationUpdateContext = React.createContext();

export function useTranslation() {
  return useContext(TranslationContext);
}

export function useTranslationUpdate() {
  return useContext(TranslationUpdateContext)
}

export function TranslationProvider({ children }) {
  const [translation, setTranslation] = useState("");
  
  function updateTranslation(result) {
    setTranslation(result);
  }

  return (
    <TranslationContext.Provider value={translation}>
      <TranslationUpdateContext.Provider value={updateTranslation}>
        {children}
      </TranslationUpdateContext.Provider>
    </TranslationContext.Provider>
  )
}