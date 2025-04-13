"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer";
import CircularText from "./CircularText";
import Chatbot from "./Chatbot";
import ElectrodeSelector from "./ElectrodeSelector";
import ElectrodeAnimation from "./ElectrodeAnimation";
import NeuroBrainBackground from "./NeuroBrainBackground";
import ProfessionalElements from "./ProfessionalElements";
import "../css/neurostyles.css"; // Import the new styles

// Main UploadPage component with enhanced professional background
export default function UploadPage({ addToHistory }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showElectrodeSelector, setShowElectrodeSelector] = useState(false);
  const [showElectrodeAnimation, setShowElectrodeAnimation] = useState(false);
  const [selectedElectrodes, setSelectedElectrodes] = useState([]);
  const [sendElectrodesToBackend, setSendElectrodesToBackend] = useState(true);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    const validExtension =
      uploadedFile?.name?.split(".").pop().toLowerCase() === "edf";

    if (uploadedFile && validExtension) {
      setFile(uploadedFile);
      setUploadStatus("");
      setPrediction(null);
      // Reset electrode selection when new file is uploaded
      setSelectedElectrodes([]);

      // Show animation before electrode selector
      setShowElectrodeAnimation(true);
      setTimeout(() => {
        setShowElectrodeAnimation(false);
        setShowElectrodeSelector(true);
      }, 4500);
    } else {
      setUploadStatus("Please upload a .edf file");
      setFile(null);
      setPrediction(null);
    }
  };

  const handleElectrodeSelection = (electrodes, sendToBackend = true) => {
    setSelectedElectrodes(electrodes);
    setSendElectrodesToBackend(sendToBackend);
    setShowElectrodeSelector(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    try {
      setUploadStatus("Uploading and analyzing...");
      setProgress(50);

      const formData = new FormData();
      formData.append("file", file);

      // Include electrode selection in the request if needed
      if (sendElectrodesToBackend && selectedElectrodes.length > 0) {
        formData.append("electrodes", JSON.stringify(selectedElectrodes));
      }

      const api_url =
        localStorage.getItem("VITE_API_URL_OVERRIDE") ||
        import.meta.env.VITE_API_URL;
      const response = await fetch(`${api_url}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const result = await response.json();

      // Update progress and status
      setProgress(100);
      setUploadStatus("Analysis complete! Displaying result...");
      setPrediction(result.prediction);

      // Add to history with electrode information
      addToHistory({
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        filename: file.name,
        results: result.prediction,
        status: result.prediction.some((p) => p > 0.5) ? "Depressed" : "Normal",
        modelVersion: "1.0.0",
        electrodes:
          selectedElectrodes.length > 0 ? selectedElectrodes.join(", ") : "All",
      });

      // Show the pop-up message and navigate after 10 seconds
      setShowPopup(true);
      setTimeout(() => {
        navigate("/results");
      }, 15000);
    } catch (error) {
      setProgress(0);
      setUploadStatus(
        error.name === "AbortError"
          ? "Request timed out. Please try again."
          : error.message || "Error processing file"
      );
      setPrediction(null);
      console.error("Upload Error:", error);
    }
  };

  // Check if any prediction value indicates depression.
  const isDepressed =
    prediction &&
    (Array.isArray(prediction)
      ? prediction.some((p) => p > 0.5)
      : Object.values(prediction).some(
          (val) => typeof val === "number" && val > 0.5
        ));

  const popupMessage = isDepressed
    ? {
        title: "We Understand Your Struggle",
        text: "Our analysis indicates signs of depression. Please know that you're not alone and we encourage you to seek help and support.",
      }
    : {
        title: "You're Doing Great",
        text: "Our analysis shows normal mental health patterns. Keep up with your positive habits and take care of yourself!",
      };

  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* New background components */}
      <NeuroBrainBackground />
      <ProfessionalElements />

      <NavbarDrawer />
      <Chatbot />
      <CircularText
        text="NEURO*CARE*"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
        Top="4"
        Left="-30px"
      />

      <div className="min-h-screen flex items-center justify-center py-8 px-4 md:flex-row flex-col z-10 relative">
        <motion.div
          className="text-center mb-8 md:mb-0 md:mr-10 md:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-300">
            EEG Analysis
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto">
            Upload your EDF file for our AI-powered mental health pattern
            analysis
          </p>
          <div className="hidden md:block">
            <div className="p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg mb-4">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
                <h3 className="text-gray-200 font-medium">Accurate</h3>
              </div>
              <p className="text-gray-400 text-sm text-left">
                Our advanced neural networks provide precise analysis of brain
                activity patterns.
              </p>
            </div>
            <div className="p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                <h3 className="text-gray-200 font-medium">Confidential</h3>
              </div>
              <p className="text-gray-400 text-sm text-left">
                Your data is encrypted and securely processed with strict
                privacy protocols.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 max-w-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:border-indigo-600/50 transition-all duration-500">
            <div className="p-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-t-xl">
                <h2 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                  Upload EEG Data
                </h2>
                <p className="text-gray-400 text-sm">
                  Select your EDF file to begin analysis
                </p>
              </div>
            </div>

            <div className="p-6">
              <div
                className="border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:border-indigo-500 hover:bg-gray-800/50 cursor-pointer group backdrop-blur-md"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".edf"
                  onChange={handleFileChange}
                />
                <div className="w-20 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900/40 transition-all">
                  <svg
                    className="h-10 w-10 text-gray-400 group-hover:text-indigo-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <span className="text-gray-300 font-medium group-hover:text-indigo-300 transition-colors">
                  {file ? "Change file" : "Drop your EDF file here"}
                </span>
                <span className="mt-2 text-xs text-gray-500">
                  or click to browse
                </span>
              </div>

              {file && (
                <motion.div
                  className="mt-6 bg-gray-800/40 backdrop-blur-md p-4 rounded-lg border border-gray-700 hover:border-indigo-600/70 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-2">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-green-400 font-medium text-sm">
                      File Selected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        className="h-8 w-8 text-blue-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <div>
                        <p className="text-gray-300 font-medium text-sm truncate max-w-[150px]">
                          {file.name}
                        </p>
                        <p className="text-gray-500 text-xs">EDF File</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-800 px-2 py-1 rounded hover:bg-indigo-900/50 hover:shadow-indigo-900/30 hover:shadow-md transition-all"
                    >
                      Replace
                    </button>
                  </div>

                  {/* Electrode Selection information */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">
                        <span className="text-gray-500 mr-2">Electrodes:</span>
                        {selectedElectrodes.length > 0
                          ? `${selectedElectrodes.length} selected`
                          : "None selected"}
                      </span>
                      <button
                        onClick={() => setShowElectrodeSelector(true)}
                        className="text-indigo-400 hover:text-indigo-300 text-xs border border-indigo-800 px-2 py-1 rounded hover:bg-indigo-900/50 hover:shadow-indigo-900/30 hover:shadow-md transition-all flex items-center"
                      >
                        <svg
                          className="h-3 w-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          ></path>
                        </svg>
                        {selectedElectrodes.length > 0 ? "Change" : "Select"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {uploadStatus && (
                <motion.div
                  className={`mt-4 px-4 py-3 rounded-lg backdrop-blur-md ${
                    uploadStatus.includes("complete")
                      ? "bg-green-900/20 text-green-400 border border-green-900 shadow-green-900/20 shadow-md"
                      : uploadStatus.includes("failed") ||
                        uploadStatus.includes("Error")
                      ? "bg-red-900/20 text-red-400 border border-red-900 shadow-red-900/20 shadow-md"
                      : "bg-blue-900/20 text-blue-400 border border-blue-900 shadow-blue-900/20 shadow-md"
                  } flex items-center`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {uploadStatus.includes("complete") ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    ) : uploadStatus.includes("failed") ||
                      uploadStatus.includes("Error") ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    )}
                  </svg>
                  <span className="text-sm">{uploadStatus}</span>
                </motion.div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file}
                className={`mt-6 w-full py-3 rounded-lg text-white font-medium relative overflow-hidden group ${
                  !file
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg hover:shadow-indigo-900/50 transition-all duration-300"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {!file ? (
                    "Select a file to continue"
                  ) : progress < 100 ? (
                    <>
                      Analyze EEG Data
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                      View Results
                    </>
                  )}
                </span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </button>

              {progress > 0 && (
                <div className="w-full h-1 bg-gray-700/50 backdrop-blur-sm rounded-full mt-4 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: progress === 100 ? 0.3 : 1.5,
                      ease: progress === 100 ? "easeOut" : "anticipate",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Electrode Animation Modal */}
      <AnimatePresence>
        {showElectrodeAnimation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ElectrodeAnimation
              onComplete={() => {
                setShowElectrodeAnimation(false);
                setShowElectrodeSelector(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Electrode Selector Modal */}
      <AnimatePresence>
        {showElectrodeSelector && (
          <ElectrodeSelector
            onElectrodeSelection={(electrodes, sendToBackend) => {
              setSelectedElectrodes(electrodes);
              setSendElectrodesToBackend(sendToBackend);
              setShowElectrodeSelector(false);
            }}
            onClose={() => setShowElectrodeSelector(false)}
          />
        )}
      </AnimatePresence>

      {/* Results Pop-Up Overlay */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 w-11/12 md:w-1/2 max-w-xl border border-gray-700 shadow-2xl shadow-indigo-900/20 relative overflow-hidden"
              initial={{ scale: 0.9, y: -30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-blue-600/20"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500"></div>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center border-2 border-indigo-500">
                  <svg
                    className="h-8 w-8 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isDepressed ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    )}
                  </svg>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                  {popupMessage.title}
                </h2>
                <p className="text-lg text-gray-300 mb-8 text-center">
                  {popupMessage.text}
                </p>

                <div className="flex items-center justify-center">
                  <div className="animate-pulse text-gray-500 flex items-center text-sm">
                    <svg
                      className="h-4 w-4 mr-2 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Redirecting to detailed results...
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}