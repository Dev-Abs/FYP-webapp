import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import UploadPage from "./components/UploadPage";
import AboutPage from "./components/AboutPage";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/results" 
          element={<Results history={analysisHistory} />} 
        />
        <Route 
          path="/uploadeeg" 
          element={<UploadPage addToHistory={addToHistory} />} 
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;