"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer";
import CircularText from "./CircularText";
import Chatbot from "./Chatbot";

export default function UploadPage({ addToHistory }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    const validExtension =
      uploadedFile?.name?.split(".").pop().toLowerCase() === "edf";

    if (uploadedFile && validExtension) {
      setFile(uploadedFile);
      setUploadStatus("");
      setPrediction(null);
    } else {
      setUploadStatus("Please upload a .edf file");
      setFile(null);
      setPrediction(null);
    }
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

      // const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
      //   method: 'POST',
      //   body: formData
      // })

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="bg-fyp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      <div className="min-h-screen bg-gray-900 bg-opacity-80 flex items-center justify-center py-8 px-4 md:flex-row flex-col">
        <motion.div
          className="text-center mb-8 md:mr-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-indigo-400">
            EEG Signal Analysis
          </h1>
          <p className="text-gray-300 mt-2">
            Upload your EDF file for mental health pattern analysis
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".edf"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center text-gray-300 hover:text-gray-100 transition-colors"
            >
              <svg
                className="h-12 w-12 text-gray-400"
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
                />
              </svg>
              <span className="mt-2 text-sm font-medium">
                Click to upload EDF file
              </span>
            </label>
          </div>

          {file && (
            <div className="mt-4 text-center text-green-400">
              Selected: {file.name}
            </div>
          )}

          {uploadStatus && (
            <div
              className={`mt-4 text-center ${
                uploadStatus.includes("complete")
                  ? "text-green-400"
                  : uploadStatus.includes("failed")
                  ? "text-red-400"
                  : "text-blue-400"
              }`}
            >
              {uploadStatus}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file}
            className="mt-6 w-full bg-indigo-600 text-gray-100 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:hover:bg-indigo-600"
          >
            {progress < 100 ? "Analyze EEG Data" : "View Results"}
          </button>

          {progress > 0 && (
            <motion.div
              className="w-full h-2 bg-gray-700 rounded-full mt-4 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-full bg-indigo-500" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Big Animated Pop-Up Overlay */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-xl p-8 w-11/12 md:w-1/2 h-1/2 flex flex-col items-center justify-center text-center shadow-2xl"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-extrabold text-gray-100 mb-6">
                {popupMessage.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">{popupMessage.text}</p>
              <p className="text-lg text-gray-500">
                Redirecting in few moments...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
