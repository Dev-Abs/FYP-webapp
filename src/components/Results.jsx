import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import NavbarDrawer from "./NavbarDrawer";
import Chatbot from "./Chatbot";
import SelectedElectrodesDisplay from "./SelectedElectrodesDisplay";
import NeuroResultsBackground from "./NeuroResultsBackground";
import ResultsOverlayElements from "./ResultsOverlayElements";
import { Link } from "react-router-dom";
import "../css//results-styles.css";

const Results = ({ history }) => {
  const [expandedSession, setExpandedSession] = useState(null);
  const [activeTab, setActiveTab] = useState("latest");

  const latestResult = history[0]?.results || [];
  const latestElectrodes = history[0]?.electrodes
    ? typeof history[0].electrodes === "string"
      ? history[0].electrodes.split(", ")
      : history[0].electrodes
    : [];

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy - HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  const getMetrics = () => {
    if (Array.isArray(latestResult)) {
      return latestResult.map((value, index) => ({
        id: index,
        value: value.toFixed(2),
        status: value > 0.5 ? "Depressed" : "Normal",
      }));
    }

    if (typeof latestResult === "object") {
      return Object.entries(latestResult).map(([key, value], index) => ({
        id: index,
        title: key,
        value: typeof value === "number" ? value.toFixed(2) : value,
        status:
          typeof value === "number"
            ? value > 0.5
              ? "Depressed"
              : "Normal"
            : "",
      }));
    }

    return [];
  };

  const metrics = getMetrics();

  // Download handler
  const handleDownload = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eeg-analysis-${new Date().getTime()}.json`;
    link.click();
  };

  // Clear history handler
  const handleClearHistory = () => {
    if (window.confirm("Clear all analysis history?")) {
      localStorage.removeItem("eeg-analysis-history");
      window.location.reload();
    }
  };

  // Toggle session expansion
  const toggleSession = (index) => {
    setExpandedSession(expandedSession === index ? null : index);
  };

  // Get electrodes array from string or array
  const getElectrodesArray = (electrodes) => {
    if (!electrodes) return [];
    if (typeof electrodes === "string") {
      return electrodes === "All" ? [] : electrodes.split(", ");
    }
    return electrodes;
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <NavbarDrawer />
      <Chatbot />

      {/* Professional Animated Background */}
      <NeuroResultsBackground />
      <ResultsOverlayElements />

      <div className="relative z-10 min-h-screen pt-20 pb-12 px-4 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-400 mb-3">
              Neural Analysis Results
            </h1>
            <p className="text-gray-400 mb-6 text-lg">
              {history.length > 0
                ? `${history.length} EEG analysis record${
                    history.length !== 1 ? "s" : ""
                  } found`
                : "No analysis history available"}
            </p>

            <div className="flex justify-center items-center gap-6 flex-wrap mb-8">
              <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-lg py-3 px-6 rounded-xl border border-gray-700/40 shadow-lg">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  Normal (0.00)
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  Depressed (1.00)
                </span>
              </div>

              {history.length > 0 && (
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleDownload}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-900/30 flex items-center gap-2 transition-all hover:scale-105"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    Export Data
                  </motion.button>
                  <motion.button
                    onClick={handleClearHistory}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2.5 rounded-xl border border-red-500/20 flex items-center gap-2 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Clear History
                  </motion.button>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            {history.length > 0 && (
              <div className="flex justify-center mb-8">
                <div className="bg-gray-800/40 backdrop-blur-lg p-1 rounded-xl inline-flex border border-gray-700/40 shadow-lg">
                  <button
                    onClick={() => setActiveTab("latest")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      activeTab === "latest"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Latest Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      activeTab === "history"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    History
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {/* Latest Analysis Tab */}
          {activeTab === "latest" && history.length > 0 && (
            <motion.div
              key="latest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Electrode Display Card */}
                <motion.div
                  className="lg:col-span-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 h-full border border-gray-700/40 overflow-hidden relative shadow-xl enhanced-card">
                    {/* Card header with gradient */}
                    <div className="card-gradient-top"></div>

                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Brain Activity Map
                    </h3>
                    <SelectedElectrodesDisplay
                      selectedElectrodes={latestElectrodes}
                      enhancedDisplay={true}
                    />
                  </div>
                </motion.div>

                {/* Results Area */}
                <div className="lg:col-span-7">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {/* Latest Result Card */}
                    <motion.div whileHover={{ y: -5 }}>
                      <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/40 h-full shadow-xl relative overflow-hidden enhanced-card">
                        {/* Card header with gradient */}
                        <div className="card-gradient-top"></div>

                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-indigo-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                ></path>
                              </svg>
                              Analysis Results
                            </h3>
                            <p className="text-gray-400 text-sm flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5"
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
                              {history[0]?.filename || "Latest file"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              history[0]?.status === "Depressed"
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-green-500/20 text-green-300 border border-green-500/30"
                            }`}
                          >
                            {history[0]?.status || "Unknown"}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {metrics.map((metric) => (
                            <div
                              key={metric.id}
                              className={`p-4 rounded-xl backdrop-blur-md ${
                                metric.status === "Depressed"
                                  ? "bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-900/40"
                                  : "bg-gradient-to-r from-green-900/30 to-green-900/10 border border-green-900/40"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-300">
                                  {metric.title || "Prediction"}
                                </span>
                                <span
                                  className={`font-semibold text-lg ${
                                    metric.status === "Depressed"
                                      ? "text-red-400"
                                      : "text-green-400"
                                  }`}
                                >
                                  {metric.value}
                                </span>
                              </div>

                              {/* Animated Progress Bar */}
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full ${
                                    metric.status === "Depressed"
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${parseFloat(metric.value) * 100}%`,
                                  }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Analysis Details Card */}
                    <motion.div whileHover={{ y: -5 }}>
                      <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/40 h-full shadow-xl relative overflow-hidden enhanced-card">
                        {/* Card header with gradient */}
                        <div className="card-gradient-top"></div>

                        <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Session Details
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/30 border border-gray-700/40 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-indigo-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">
                                Date & Time
                              </div>
                              <div className="text-white">
                                {formatDate(history[0]?.date || new Date())}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/30 border border-gray-700/40 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">
                                Model Version
                              </div>
                              <div className="text-white">
                                {history[0]?.modelVersion || "1.0.0"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/30 border border-gray-700/40 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">
                                Electrodes Selected
                              </div>
                              <div className="text-white">
                                {latestElectrodes.length === 0
                                  ? "All (Default)"
                                  : `${latestElectrodes.length} selected`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/30 border border-gray-700/40 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-green-400"
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
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">
                                File Format
                              </div>
                              <div className="text-white">
                                Electroencephalogram (EDF)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/40 overflow-hidden shadow-xl enhanced-card">
                {/* Card header with gradient */}
                <div className="card-gradient-top"></div>

                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-indigo-400"
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
                    Session History
                  </h2>

                  {history.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/30 mb-4">
                        <svg
                          className="w-10 h-10 text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        No Analysis Data Yet
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto mb-6">
                        You haven't analyzed any EEG files yet. Upload an EDF
                        file to begin your neural analysis.
                      </p>
                      <Link
                        to="/uploadeeg"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
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
                          ></path>
                        </svg>
                        Upload EEG File
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((session, sessionIndex) => {
                        const isExpanded = expandedSession === sessionIndex;
                        const sessionElectrodes = getElectrodesArray(
                          session.electrodes
                        );

                        return (
                          <motion.div
                            key={sessionIndex}
                            className={`bg-gray-800/80 rounded-xl transition-all duration-300 overflow-hidden border ${
                              isExpanded
                                ? "border-indigo-500/50 shadow-lg shadow-indigo-900/10"
                                : "border-gray-700/40 hover:border-gray-600/60"
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.1 + sessionIndex * 0.05,
                              duration: 0.3,
                            }}
                            whileHover={{ y: -2 }}
                          >
                            {/* Session Header */}
                            <div
                              className="p-4 cursor-pointer"
                              onClick={() => toggleSession(sessionIndex)}
                            >
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                <div className="flex items-center gap-4">
                                  <div className="relative flex-shrink-0">
                                    <div
                                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        session.status === "Depressed"
                                          ? "bg-red-900/30 text-red-400"
                                          : "bg-green-900/30 text-green-400"
                                      }`}
                                    >
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {session.status === "Depressed" ? (
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          ></path>
                                        ) : (
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          ></path>
                                        )}
                                      </svg>
                                    </div>
                                    <div
                                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                                        session.status === "Depressed"
                                          ? "bg-red-500"
                                          : "bg-green-500"
                                      }`}
                                    ></div>
                                  </div>

                                  <div>
                                    <p className="font-medium text-white flex items-center gap-2">
                                      {session.filename}
                                      {sessionElectrodes.length > 0 && (
                                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                                          {sessionElectrodes.length} electrodes
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                      <svg
                                        className="w-3.5 h-3.5"
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
                                      {formatDate(session.date)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 ml-0 md:ml-auto">
                                  <span
                                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                                      session.status === "Depressed"
                                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                                    }`}
                                  >
                                    {session.status}
                                  </span>
                                  <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4">
                                    <div className="h-px bg-gray-700/50 mb-5" />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                      {/* Electrode visualization */}
                                      {sessionElectrodes.length > 0 && (
                                        <div className="md:col-span-1 bg-gray-800/70 rounded-xl p-4 border border-gray-700/40 shadow-inner backdrop-blur-lg">
                                          <h4 className="text-lg font-medium text-indigo-400 mb-3 flex items-center gap-2">
                                            <svg
                                              className="w-4 h-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                              ></path>
                                            </svg>
                                            Selected Electrodes
                                          </h4>
                                          <SelectedElectrodesDisplay
                                            selectedElectrodes={
                                              sessionElectrodes
                                            }
                                            small={true}
                                            enhancedDisplay={true}
                                          />
                                        </div>
                                      )}

                                      {/* Results */}
                                      <div
                                        className={`${
                                          sessionElectrodes.length > 0
                                            ? "md:col-span-2"
                                            : "md:col-span-3"
                                        } grid grid-cols-1 md:grid-cols-2 gap-3`}
                                      >
                                        {Array.isArray(session.results)
                                          ? session.results.map(
                                              (result, index) => (
                                                <div
                                                  key={index}
                                                  className={`bg-gray-800/70 p-4 rounded-xl backdrop-blur-lg ${
                                                    result > 0.5
                                                      ? "border border-red-900/40"
                                                      : "border border-green-900/40"
                                                  }`}
                                                >
                                                  <div className="flex items-center justify-between mb-2">
                                                    <span className="text-gray-300 text-sm">
                                                      Prediction
                                                    </span>
                                                    <span
                                                      className={`text-lg font-medium ${
                                                        result > 0.5
                                                          ? "text-red-400"
                                                          : "text-green-400"
                                                      }`}
                                                    >
                                                      {result.toFixed(2)}
                                                    </span>
                                                  </div>

                                                  {/* Result progress bar */}
                                                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                      className={`h-full ${
                                                        result > 0.5
                                                          ? "bg-red-500"
                                                          : "bg-green-500"
                                                      }`}
                                                      style={{
                                                        width: `${
                                                          result * 100
                                                        }%`,
                                                      }}
                                                    ></div>
                                                  </div>
                                                </div>
                                              )
                                            )
                                          : Object.entries(
                                              session.results || {}
                                            ).map(([key, value], index) => (
                                              <div
                                                key={index}
                                                className={`bg-gray-800/70 p-4 rounded-xl backdrop-blur-lg ${
                                                  value > 0.5
                                                    ? "border border-red-900/40"
                                                    : "border border-green-900/40"
                                                }`}
                                              >
                                                <div className="flex items-center justify-between mb-2">
                                                  <span className="text-gray-300 text-sm">
                                                    {key}
                                                  </span>
                                                  <span
                                                    className={`text-lg font-medium ${
                                                      value > 0.5
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                    }`}
                                                  >
                                                    {typeof value === "number"
                                                      ? value.toFixed(2)
                                                      : value}
                                                  </span>
                                                </div>

                                                {/* Result progress bar */}
                                                {typeof value === "number" && (
                                                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                      className={`h-full ${
                                                        value > 0.5
                                                          ? "bg-red-500"
                                                          : "bg-green-500"
                                                      }`}
                                                      style={{
                                                        width: `${
                                                          value * 100
                                                        }%`,
                                                      }}
                                                    ></div>
                                                  </div>
                                                )}
                                              </div>
                                            ))}

                                        {/* Additional metadata */}
                                        <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700/40 backdrop-blur-lg">
                                          <h4 className="font-medium text-blue-400 flex items-center gap-2 mb-3">
                                            <svg
                                              className="w-4 h-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                              ></path>
                                            </svg>
                                            Analysis Details
                                          </h4>

                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center p-2 rounded bg-gray-700/30">
                                              <span className="text-gray-400">
                                                Model Version
                                              </span>
                                              <span className="text-gray-200 font-medium">
                                                {session.modelVersion ||
                                                  "1.0.0"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 rounded bg-gray-700/30">
                                              <span className="text-gray-400">
                                                Analysis Date
                                              </span>
                                              <span className="text-gray-200 font-medium">
                                                {formatDate(session.date)}
                                              </span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 rounded bg-gray-700/30">
                                              <span className="text-gray-400">
                                                Electrode Count
                                              </span>
                                              <span className="text-gray-200 font-medium">
                                                {sessionElectrodes.length > 0
                                                  ? sessionElectrodes.length
                                                  : "All (Default)"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {history.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/40 text-center max-w-3xl mx-auto shadow-xl enhanced-card"
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-indigo-600/20 mx-auto mb-6 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(79, 70, 229, 0.4)",
                    "0 0 30px rgba(79, 70, 229, 0.6)",
                    "0 0 0 rgba(79, 70, 229, 0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg
                  className="w-12 h-12 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-3">
                No Analysis Data Yet
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                You haven't analyzed any EEG files yet. Upload an EDF file to
                get started with your neural analysis.
              </p>
              <Link to="/uploadeeg">
                <motion.a
                  href="/uploadeeg"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-900/30 transition-all"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                    ></path>
                  </svg>
                  Upload EEG File
                </motion.a>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Results;