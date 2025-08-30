// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectDetail from "./pages/ProjectDetail";
import "./App.css";
import LineTrail from "./components/LineTrail";
import ClickSparkles from "./components/ClickSparkles";
import AboutPage from "./pages/AboutPage";
import QuantumParticleCursor from "./components/QuantumParticleCursor";

function App() {
  return (
    <BrowserRouter>
      <LineTrail />
      <ClickSparkles />
      <QuantumParticleCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
