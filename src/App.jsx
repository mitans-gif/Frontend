import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Body />} />

        {/* Energy Tracker */}
        <Route path="/tracker" element={<MainPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;