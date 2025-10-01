import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import halaman-halaman dari src/pages
import PocScreening from "./pages/pocScreening";
import PocKnowledge from "./pages/pocKnowledge";
import ExpoScoring from "./pages/expoScoring";
import ExpoLiveAgent from "./pages/expoliveAgent";
import ScoringReport from "./pages/scoringReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/poc-screening" element={<PocScreening />} />
        <Route path="/poc-knowledge" element={<PocKnowledge />} />
        <Route path="/expo-scoring" element={<ExpoScoring />} />
        <Route path="/expo-live-agent" element={<ExpoLiveAgent />} />
        <Route path="/scoring-report" element={<ScoringReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
