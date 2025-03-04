import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import UploadPage from "./components/UploadPage";
import AboutPage from "./components/AboutPage";
import TrippyScroll from "./components/TrippyScroll";
import NeuroCardRotatingStatements from "./components/NeuroCardRotatingStatements";
import NeuroCareInteractive from "./components/NeuroCareInteractive";
import { NeuroScrollExperience } from "./components/NeuroScrollExperience";
import Main from "./components/Main";
import NavbarDrawer from "./components/NavbarDrawer";
import ApiUrlSetter from "./components/ApiUrlSetter";

// Helper function to load/save history
const usePersistedHistory = () => {
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    const saved = localStorage.getItem('eeg-analysis-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('eeg-analysis-history', JSON.stringify(analysisHistory));
  }, [analysisHistory]);

  return [analysisHistory, setAnalysisHistory];
};

function App() {
  const [analysisHistory, setAnalysisHistory] = usePersistedHistory();

  const addToHistory = (newResult) => {
    setAnalysisHistory(prev => [
      {
        ...newResult,
        id: Date.now(), // Add unique ID
        timestamp: new Date().toISOString()
      }, 
      ...prev
    ]);
  };

  return (
    <Router>
      {/* if path is not === / then show navbar */}
      {/* get current path */}
      {/* <NavbarDrawer /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setserverurl" element={<ApiUrlSetter />} />
        <Route 
          path="/results" 
          element={<Results history={analysisHistory} />} 
        />
        <Route 
          path="/uploadeeg" 
          element={<UploadPage addToHistory={addToHistory} />} 
        />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/relieve" element={<NeuroCardRotatingStatements />} /> */}
        <Route path="/wecare" element={<NeuroCareInteractive />} />
        {/* <Route path="/wecare" element={<NeuroCardRotatingStatements />} /> */}
        {/* <Route path="/wecare" element={<TrippyScroll />} /> */}
        </Routes>
    </Router>
  );
}

export default App;