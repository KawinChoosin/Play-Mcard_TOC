// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ARPage from "./Ar/AR";
import "./index.css";
import ARsummaryPage from "./Ar/ARsummary";
import StarsCollectionPage from "./Ar/StarsCollection";
import MainMenuPage from "./Ar/mainMenu";
import GamePage from "./Ar/ARgame";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MainMenuPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/ar" element={<ARPage />} />
        <Route path="/arsummary" element={<ARsummaryPage />} />
        <Route path="/starscollection" element={<StarsCollectionPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
