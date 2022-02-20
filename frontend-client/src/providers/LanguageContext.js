import React, { useContext, useState } from "react";
import getSourceLanguages from "../components/LanguageDropDown/helpers/getSourceLanguages";

const LanguageContext = React.createContext();
const LanguageUpdateContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext)
};

export function useLanguageUpdate() {
  return useContext(LanguageUpdateContext)
}

export function LanguageProvider({ children }) {
  const firstLanguageCode = getSourceLanguages()[0]['language-code'];
  const [language, setLanguage] = useState(firstLanguageCode);

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
