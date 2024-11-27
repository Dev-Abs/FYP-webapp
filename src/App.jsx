import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Results from './components/Results'
import UploadPage from "./components/UploadPage"
import AboutPage from "./components/AboutPage"
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/uploadeeg" element={<UploadPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
