import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";

const TranscriptionContext = React.createContext();
const TranscriptionUpdateContext = React.createContext();

export function useTranscription() {
  return useContext(TranscriptionContext);
}

export function useTranscriptionUpdate() {
  return useContext(TranscriptionUpdateContext)
}

export function TranscriptionProvider({ children }) {
  
  

  return (
    <TranscriptionContext.Provider 
      value={{
        // transcriptionResults
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  )
}