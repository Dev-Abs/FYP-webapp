import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-gray-900/80"></div>
        <div className="neural-network-background"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                <BrainCircuit className="w-12 h-12 md:w-16 md:h-16 text-indigo-400" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Begin Your Mental Health Journey Today
                </h2>
                <p className="text-gray-300 mb-6 md:mb-8 md:pr-8">
                  Upload your EEG data and gain valuable insights into your mental wellbeing.
                  Our advanced AI analysis provides comprehensive, personalized reports.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/upload">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20 w-full sm:w-auto"
                    >
                      Upload EEG Data
                    </motion.button>
                  </Link>
                  
                  <Link to="/neurocare">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg font-medium transition-all border border-gray-600 w-full sm:w-auto"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Bottom feature highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Quick Analysis",
                  description: "Results in under 5 minutes"
                },
                {
                  title: "Clinical Grade",
                  description: "Used by medical professionals"
                },
                {
                  title: "Free Getting Started",
                  description: "Basic analysis at no cost"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for neural network background */}
      <style jsx>{`
        .neural-network-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.2) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: pulse 4s infinite alternate;
        }
        
        @keyframes pulse {
          0% { opacity: 0.05; }
          100% { opacity: 0.15; }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;