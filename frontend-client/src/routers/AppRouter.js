import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Call from '../components/CallView/Call';
import AppointmentView from '../components/AppointmentView/AppointmentView';
import HomePage from '../components/HomePage/HomePage';

const AppRouter = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<AppointmentView />} />
        <Route path="/video-call" element={<Call />} />
      </Routes>
  </BrowserRouter>
);

export default AppRouter;