import React from "react";
import { TranslationProvider } from "../providers/TranslationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Call from "../components/CallView/Call";
import AppointmentView from "../components/AppointmentView/AppointmentView";
import HomePage from "../components/HomePage/HomePage";
import { UserNameProvider } from "../providers/UsernameProvider";
import { CoparticipantProvider } from '../providers/CoparticipantContext';
import { LanguageProvider } from "../providers/LanguageContext";

const AppRouter = () => (
  <BrowserRouter>
    <UserNameProvider>
      <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<AppointmentView />} />
        <Route
          path="/video-call"
          element={
            <TranslationProvider>
              <CoparticipantProvider>
                <Call />
              </CoparticipantProvider>
            </TranslationProvider>
          }
        />
      </Routes>
      </LanguageProvider>
    </UserNameProvider>
  </BrowserRouter>
);

export default AppRouter;
