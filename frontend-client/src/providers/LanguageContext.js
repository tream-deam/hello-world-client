import React, { useContext, useState } from "react";

const LanguageContext = React.createContext();
const LanguageUpdateContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext)
};

export function useLanguageUpdate() {
  return useContext(LanguageUpdateContext)
}

export function ThemeProvider({ children }) {
  const [language, setLanguage] = useState('en-CA');

  function updateLanguage(newLanguage) {
    setLanguage(newLanguage);
  }

  return (
    <LanguageContext.Provider value={language}>
      <LanguageUpdateContext.Provider value={updateLanguage}>
        {children}
      </LanguageUpdateContext.Provider>
    </LanguageContext.Provider>
  );
}
