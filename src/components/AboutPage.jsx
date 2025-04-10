import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DragCards } from "./DragCards";
import NavbarDrawer from "./NavbarDrawer";
import Chatbot from "./Chatbot";

// Animation variants with improved easing
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9]
    } 
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0]
    } 
  },
};

const AboutPage = () => {
  // Animation control for scroll-triggered animations
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      <NavbarDrawer />
      <Chatbot />
      
      {/* Hero section with enhanced visuals */}
      <motion.div 
        className="w-full py-24 px-4 bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-800 dark:to-purple-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-indigo-300"></div>
          <div className="absolute top-40 right-10 w-20 h-20 rounded-full bg-purple-300"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-indigo-200">NeuroCare</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing mental health diagnostics through cutting-edge EEG technology and advanced artificial intelligence
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* About Project Card */}
          <motion.div
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl dark:shadow-indigo-900/20 p-10 mb-10 border-l-4 border-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About the Project
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              This project leverages EEG (electroencephalography) data to detect
              mental health challenges such as anxiety and depression. Through
              advanced deep learning models, we aim to provide early diagnostic
              insights, making mental health monitoring more accessible and effective.
            </p>
          </motion.div>

          {/* Importance of EEG Card */}
          <motion.div
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl dark:shadow-blue-900/20 p-10 mb-10 border-l-4 border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
            variants={slideIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Why EEG Matters
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              EEG is a powerful tool for observing brain activity in real-time.
              Its ability to detect neural patterns makes it invaluable in
              diagnosing mental health disorders, providing non-invasive and
              accurate insights that can guide treatment plans and improve patient outcomes.
            </p>
          </motion.div>

          {/* Our Approach Card */}
          <motion.div
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl dark:shadow-purple-900/20 p-10 mb-12 border-l-4 border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600 dark:text-purple-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Our Approach
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              We combine cutting-edge machine learning algorithms with clinical expertise to analyze EEG data patterns. 
              Our platform processes brain activity signals to identify biomarkers associated with various mental health conditions, 
              providing healthcare professionals with actionable insights for personalized care.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 p-10 border-t-4 border-indigo-500"
            variants={fadeIn}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Meet the Team
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A dedicated team of engineers and researchers focused on
                transforming mental health diagnostics through EEG technology.
              </p>
              <p className="text-sm text-indigo-500 mt-4 italic font-medium">Drag the cards to interact with them!</p>
            </div>
            <div className="relative md:h-screen h-[60vh]">
              <DragCards />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-100 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-base text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} NeuroCare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;