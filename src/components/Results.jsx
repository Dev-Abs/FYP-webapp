// import React from "react";
// import { motion } from "framer-motion";
// import { format } from 'date-fns';

// const Results = ({ history }) => {
//   const latestResult = history[0]?.results || [];

//   // Date formatting helper
//   const formatDate = (isoString) => {
//     return format(new Date(isoString), 'MMM dd, yyyy - HH:mm:ss');
//   };

//   // Metrics formatting with depression labels
//   const getMetrics = () => {
//     if (Array.isArray(latestResult)) {
//       return latestResult.map((value, index) => ({
//         id: index,
//         title: `Recent File Prediction`,
//         value: value.toFixed(2),
//         color: value > 0.5 ? 'text-red-500' : 'text-green-500',
//         label: value > 0.5 ? 'Depressed' : 'Normal'
//       }));
//     }
    
//     if (typeof latestResult === 'object') {
//       return Object.entries(latestResult).map(([key, value], index) => ({
//         id: index,
//         title: key,
//         value: typeof value === 'number' ? value.toFixed(2) : value,
//         color: typeof value === 'number' ? 
//           (value > 0.5 ? 'text-red-500' : 'text-green-500') : 'text-gray-500',
//         label: typeof value === 'number' ? 
//           (value > 0.5 ? 'Depressed' : 'Normal') : ''
//       }));
//     }

//     return [];
//   };

//   const metrics = getMetrics();

//   // Download handler
//   const handleDownload = () => {
//     const dataStr = JSON.stringify(history, null, 2);
//     const blob = new Blob([dataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `eeg-history-${new Date().getTime()}.json`;
//     link.click();
//   };

//   // Clear history handler
//   const handleClearHistory = () => {
//     if (window.confirm('Clear all analysis history?')) {
//       localStorage.removeItem('eeg-analysis-history');
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <div />
//           <h1 className="text-4xl font-bold text-primary ml-28">Analysis Results</h1>
//           <button
//             onClick={handleClearHistory}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//           >
//             Clear History
//           </button>
//         </div>
//         <p className="text-gray-600">
//           {history.length > 0 
//             ? `${history.length} analysis records found`
//             : "No analysis history available"}
//         </p>
//         <div className="mt-4 bg-blue-50 p-4 rounded-lg max-w-xl mx-auto">
//           <p className="text-sm text-gray-600">
//             <span className="font-semibold">Interpretation Guide:</span>
//             <span className="text-green-500 ml-2">0.00 = Normal</span>
//             <span className="text-red-500 ml-2">1.00 = Depressed</span>
//           </p>
//         </div>
//       </div>

//       {/* Current Metrics */}
//       {metrics.length > 0 && (
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {metrics.map((metric, index) => (
//             <motion.div
//               key={metric.id}
//               className="bg-white rounded-xl shadow-md p-6 border-t-4"
//               style={{
//                 borderColor: metric.color === 'text-red-500' ? '#ef4444' : '#10b981'
//               }}
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: index * 0.1, duration: 0.3 }}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {metric.title}
//               </h3>
//               <div className="flex items-baseline gap-2">
//                 <span className={`text-3xl font-bold ${metric.color}`}>
//                   {metric.value}
//                 </span>
//                 <span className={`text-sm ${metric.color}`}>
//                   ({metric.label})
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Analysis History */}
//       <motion.div 
//         className="bg-white rounded-xl shadow-md p-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Analysis History
//           </h2>
//           {history.length > 0 && (
//             <button
//               onClick={handleDownload}
//               className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition text-sm"
//             >
//               Download History
//             </button>
//           )}
//         </div>

//         {history.length === 0 ? (
//           <div className="text-center text-gray-500 py-8">
//             No analysis records found
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {history.map((session) => (
//               <motion.div
//                 key={session.id}
//                 className="bg-gray-50 rounded-lg p-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <p className="font-medium text-gray-600">
//                       {formatDate(session.timestamp)}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       File: {session.filename}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       session.status === 'Depressed'
//                         ? 'bg-red-100 text-red-800'
//                         : 'bg-green-100 text-green-800'
//                     }`}
//                   >
//                     {/* {session.status === 'Depressed' ? 1 : 0} */}
//                     {session.status}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {Array.isArray(session.results) ? (
//                     session.results.map((result, index) => (
//                       <div
//                         key={index}
//                         className="bg-white p-4 rounded-lg shadow-sm"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">
//                             Prediction
//                           </span>
//                           {/* <span
//                             className={`text-sm ${
//                               result > 0.5
//                                 ? 'text-red-500'
//                                 : 'text-green-500'
//                             }`}
//                           >
//                             {result > 0.5 ? '1' : '0'}
//                           </span> */}
//                         </div>
//                         <div
//                           className={`text-2xl font-bold mt-2 ${
//                             result > 0.5 ? 'text-red-500' : 'text-green-500'
//                           }`}
//                         >
//                           {result === 1 ? 'Depressed' : 'Normal'}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     Object.entries(session.results || {}).map(
//                       ([key, value], index) => (
//                         <div
//                           key={index}
//                           className="bg-white p-4 rounded-lg shadow-sm"
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600">{key}</span>
//                             {typeof value === 'number' && (
//                               <span
//                                 className={`text-sm ${
//                                   value > 0.5
//                                     ? 'text-red-500'
//                                     : 'text-green-500'
//                                 }`}
//                               >
//                                 {value > 0.5 ? 'Depressed' : 'Normal'}
//                               </span>
//                             )}
//                           </div>
//                           <div
//                             className={`text-2xl font-bold mt-2 ${
//                               typeof value === 'number'
//                                 ? value > 0.5
//                                   ? 'text-red-500'
//                                   : 'text-green-500'
//                                 : 'text-gray-500'
//                             }`}
//                           >
//                             {typeof value === 'number' ? value.toFixed(2) : value}
//                           </div>
//                         </div>
//                       )
//                     )
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Results;

import React from "react";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const Results = ({ history }) => {
  const latestResult = history[0]?.results || [];

  const formatDate = (isoString) => {
    return format(new Date(isoString), 'MMM dd, yyyy - HH:mm:ss');
  };

  const getMetrics = () => {
    if (Array.isArray(latestResult)) {
      return latestResult.map((value, index) => ({
        id: index,
        value: value.toFixed(2),
        status: value > 0.5 ? 'Depressed' : 'Normal'
      }));
    }
    
    if (typeof latestResult === 'object') {
      return Object.entries(latestResult).map(([key, value], index) => ({
        id: index,
        title: key,
        value: typeof value === 'number' ? value.toFixed(2) : value,
        status: typeof value === 'number' ? (value > 0.5 ? 'Depressed' : 'Normal') : ''
      }));
    }

    return [];
  };

  const metrics = getMetrics();

     // Download handler
     const handleDownload = () => {
      const dataStr = JSON.stringify(history, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `eeg-history-${new Date().getTime()}.json`;
      link.click();
    };
  
    // Clear history handler
    const handleClearHistory = () => {
      if (window.confirm('Clear all analysis history?')) {
        localStorage.removeItem('eeg-analysis-history');
        window.location.reload();
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
            Analysis Results
          </h1>
          <button
            onClick={handleClearHistory}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Clear History
          </button>
        </div>
        
        <p className="text-gray-400 mb-6">
          {history.length > 0 
            ? `${history.length} analysis records found`
            : "No analysis history available"}
        </p>
        
        <div className="inline-flex items-center gap-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            Normal (0)
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            Depressed (1)
          </span>
        </div>
      </div>

      {/* Current Metrics */}
      {metrics.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="bg-gray-800 rounded-xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">
                    {metric.title || `Recent File Prediction`}
                  </h3>
                  <span className={`text-2xl font-semibold ${
                    metric.status === 'Depressed' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {metric.value}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  metric.status === 'Depressed' ? 'bg-red-400/10' : 'bg-green-400/10'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'Depressed' ? 'bg-red-400' : 'bg-green-400'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Analysis History */}
      <motion.div 
        className="bg-gray-800 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Analysis History
          </h2>
          {history.length > 0 && (
            <button
              onClick={handleDownload}
              className="bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Download History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No analysis records found
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((session) => (
              <motion.div
                key={session.id}
                className="bg-gray-700/50 hover:bg-gray-700/70 rounded-xl p-4 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
                  <div>
                    <p className="font-medium text-gray-300">
                      {formatDate(session.timestamp)}
                    </p>
                    {/* <p className="text-sm text-gray-400">
                      {session.filename}
                    </p> */}
                  </div>
                  <span className={`text-sm ${
                    session.status === 'Depressed' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {session.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Array.isArray(session.results) ? (
                    session.results.map((result, index) => (
                      <div
                        key={index}
                        className="bg-gray-600/50 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">
                            {session.filename}
                          </span>
                          <span className={`text-sm ${
                            result > 0.5 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {result.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    Object.entries(session.results || {}).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="bg-gray-600/50 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">{key}</span>
                            <span className={`text-sm ${
                              value > 0.5 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {typeof value === 'number' ? value.toFixed(2) : value}
                            </span>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Results;