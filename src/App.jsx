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

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Body />}
        />

        {/* Tracker */}
        <Route
          path="/tracker"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />

        {/* Calculator */}
        <Route
          path="/calculator"
          element={
            <Layout>
              <Calculator />
            </Layout>
          }
        />

        {/* 4R's */}
        <Route
          path="/4rs"
          element={
            <Layout>
              <FourRs />
            </Layout>
          }
        />

        {/* Recommendations */}
        <Route
          path="/recommendations"
          element={
            <Layout>
              <Recommendations />
            </Layout>
          }
        />

        {/* Actions */}
        <Route
          path="/actions"
          element={
            <Layout>
              <Actions />
            </Layout>
          }
        />

        <Route
  path="/goals"
  element={
    <Layout>
      <Goals />
    </Layout>
  }
/>
    <Route
  path="/renewable"
  element={
    <Layout>
      <Renewable />
    </Layout>
  }
/>

  <Route
  path="/dashboard"
  element={
    <Layout>
      <Dashboard />
    </Layout>
  }
/>

    <Route
  path="/impact"
  element={
    <Layout>
      <ViewImpact />
    </Layout>
  }
/>

    <Route
  path="/profile"
  element={
    <Layout>
      <Profile />
    </Layout>
  }
/>

      </Routes>

    </BrowserRouter>
  );
};

export default App;