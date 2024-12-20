import React from "react";
import { motion } from "framer-motion";

const ResultsPage = () => {
  const metrics = [
    { id: 1, title: "Stress Level", value: "High", color: "text-red-500" },
    { id: 2, title: "Depression Indicator", value: "Severe", color: "text-red-500" },
    { id: 3, title: "Anxiety Level", value: "Moderate", color: "text-yellow-500" },
  ];

  const history = [
    {
      date: "2024-11-20",
      results: [
        { id: 1, title: "Stress Level", value: "Moderate", color: "text-yellow-500" },
        { id: 2, title: "Depression Indicator", value: "Mild", color: "text-green-500" },
        { id: 3, title: "Anxiety Level", value: "Low", color: "text-green-500" },
      ],
    },
    {
      date: "2024-10-10",
      results: [
        { id: 1, title: "Stress Level", value: "High", color: "text-red-500" },
        { id: 2, title: "Depression Indicator", value: "Moderate", color: "text-yellow-500" },
        { id: 3, title: "Anxiety Level", value: "Moderate", color: "text-yellow-500" },
      ],
    },
  ];

  const handleDownload = () => {
    alert("Downloading report...");
    // Add PDF download logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Analysis Results</h1>
        <p className="text-gray-600">Here are the insights based on your EEG data.</p>
      </div>

      {/* Current Metrics */}
      <div className="relative flex items-center gap-5 mb-8 p-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className={`w-[32%] bg-white shadow-md rounded-lg p-6 border-t-4 ${
              metric.color.includes("red")
                ? "border-red-500"
                : metric.color.includes("yellow")
                ? "border-yellow-500"
                : "border-green-500"
            }`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 className="text-xl font-semibold text-gray-800">{metric.title}</h3>
            <p className={`mt-2 text-2xl font-bold ${metric.color}`}>{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Graphical Representation */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Brain Activity</h3>
        <div className="h-48 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-md flex items-center justify-center">
          <p className="text-center text-white font-medium">Activity Signal Coming Soon...</p>
        </div>
      </motion.div>

      {/* History Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">History</h3>
        {history.map((session, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium text-gray-600 mb-2">{`Date: ${session.date}`}</p>
            <div className="flex gap-5">
              {session.results.map((result) => (
                <motion.div
                  key={result.id}
                  className={`w-[30%] bg-gray-100 p-4 rounded-lg shadow-sm border-t-4 ${
                    result.color.includes("red")
                      ? "border-red-500"
                      : result.color.includes("yellow")
                      ? "border-yellow-500"
                      : "border-green-500"
                  }`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-gray-800">{result.title}</h4>
                  <p className={`text-xl font-bold ${result.color}`}>{result.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <motion.button
          onClick={handleDownload}
          className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Report
        </motion.button>
      </div>
    </div>
  );
};

export default ResultsPage;
