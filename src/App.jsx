import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import MainPage from "./components/MainPage";
import Calculator from "./components/Calculator";
import FourRs from "./components/FourRs";
import Recommendations from "./components/Recommendations";
import Actions from "./components/Actions";
import Layout from "./components/Layout";
import Goals from "./components/Goals";
import Renewable from "./components/Renewable";
import Dashboard from "./components/Dashboard";
import ViewImpact from "./components/ViewImpact";
import Profile from "./components/Profile";
import SmartMonitor from "./components/SmartMonitor";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/tracker" element={<Layout><MainPage /></Layout>} />
      <Route path="/calculator" element={<Layout><Calculator /></Layout>} />
      <Route path="/4rs" element={<Layout><FourRs /></Layout>} />
      <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
      <Route path="/actions" element={<Layout><Actions /></Layout>} />
      <Route path="/goals" element={<Layout><Goals /></Layout>} />
      <Route path="/renewable" element={<Layout><Renewable /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/impact" element={<Layout><ViewImpact /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/monitor" element={<Layout><SmartMonitor /></Layout>} />
      <Route path="*" element={<Body />} />
    </Routes>
  </BrowserRouter>
);
export default App;
