import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import AIEnginePage from "./pages/AIEnginePage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import Subscription from "./pages/Subscription";

const App = () => {
  return (
    <Routes>
      {/* 1. Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* 2. Dashboard Protected Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="customers" element={<CustomersPage />} />

        <Route path="ai-engine" element={<AIEnginePage />} />
        <Route path="contactus" element={<ContactPage />} />

        <Route path="settings" element={<SettingsPage />} />

        {/* Catches broken links INSIDE dashboard (e.g. /dashboard/test) */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/subscription" element={<Subscription />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
