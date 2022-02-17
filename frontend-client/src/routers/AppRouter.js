import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Call from '../components/CallView/Call';
import AppointmentView from '../components/AppointmentView/AppointmentView';

const AppRouter = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/appointments" />} />
        <Route path="/appointments" element={<AppointmentView />} />
        <Route path="/video-call" element={<Call />} />
      </Routes>
  </BrowserRouter>
);

export default AppRouter;