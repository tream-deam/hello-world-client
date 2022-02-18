import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";

const TranslationContext = React.createContext();
const TranslationUpdateContext = React.createContext();

export function useTranslation() {
  return useContext(TranslationContext);
}

export function useTranslationUpdate() {
  return useContext(TranslationUpdateContext)
}

export function TranslationProvider({ children }) {
  const [translationContext, setTranslation] = useState("");
  
  function updateTranslation(result) {
    setTranslation(result);
  }

  return (
    <TranslationContext.Provider value={translationContext}>
      <TranslationUpdateContext.Provider value={updateTranslation}>
        {children}
      </TranslationUpdateContext.Provider>
    </TranslationContext.Provider>
  )
}