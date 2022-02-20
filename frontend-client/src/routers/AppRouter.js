import React from "react";
import { TranslationProvider } from "../providers/TranslationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Call from "../components/CallView/Call";
import AppointmentView from "../components/AppointmentView/AppointmentView";
import HomePage from "../components/HomePage/HomePage";
import { UserNameProvider } from "../providers/UsernameProvider";

const AppRouter = () => (
  <BrowserRouter>
    <UserNameProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<AppointmentView />} />
        <Route
          path="/video-call"
          element={
            <TranslationProvider>
              <Call />
            </TranslationProvider>
          }
        />
      </Routes>
    </UserNameProvider>
  </BrowserRouter>
);

export default AppRouter;
