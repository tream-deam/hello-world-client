import React, { useContext, useState } from "react";

const TranscriptionContext = React.createContext();

export function useTranscription() {
  return useContext(TranscriptionContext);
}

export function TranscriptionProvider({ children }) {
  const [test, setTest] = useState('test string');

  // useEffect(() => {
  //   setTest('test string change')
  // }, [third])
  

  return (
    <TranscriptionContext.Provider value={test}>
      {children}
    </TranscriptionContext.Provider>
  )
}