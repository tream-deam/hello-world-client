import React, { useContext, useState, useEffect } from "react";

const TranscriptionContext = React.createContext();

export function useTranscription() {
  return useContext(TranscriptionContext);
}

export function TranscriptionProvider({ children }) {
  const [test, setTest] = useState('test string');
  const [test2, setTest2] = useState('test string');
  
  useEffect(() => {
    setTest2('test string change')
  }, [])
  

  return (
    <TranscriptionContext.Provider value={{value1: test, value2: test2}}>
      {children}
    </TranscriptionContext.Provider>
  )
}