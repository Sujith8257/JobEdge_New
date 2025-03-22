import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/Login/Login";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { Desktop } from "./screens/Desktop/Desktop";
import { Analysis } from "./screens/Analysis/Analysis";


createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/desktop" element={<Desktop />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  </StrictMode>,
);