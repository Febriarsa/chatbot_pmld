import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import halaman-halaman dari src/pages
import PocScreening from "./pages/pocScreening";
import PocKnowledge from "./pages/pocKnowledge";
import ExpoScoring from "./pages/expoScoring";
import ExpoLiveAgent from "./pages/expoLiveAgent";
import ScoringReport from "./pages/scoringReport";
import FormCV from "./pages/FormCV";
import CVResults from "./pages/CVResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/poc-screening" element={<PocScreening />} />
        <Route path="/poc-knowledge" element={<PocKnowledge />} />
        <Route path="/expo-scoring" element={<ExpoScoring />} />
        <Route path="/expo-live-agent" element={<ExpoLiveAgent />} />
        <Route path="/scoring-report" element={<ScoringReport />} />
        <Route path="/form-cv/:formId" element={<FormCV />} />
        <Route path="/cv-results/:formId" element={<CVResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
