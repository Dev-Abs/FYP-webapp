import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DragCards } from "./DragCards";
import NavbarDrawer from "./NavbarDrawer";
import Chatbot from "./Chatbot";

// Animation variants with subtle easing
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      ease: "easeOut"
    } 
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  },
};

const AboutPage = () => {
  // Check for mobile screens
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 min-h-screen">
      <NavbarDrawer />
      <Chatbot />
      
      {/* Hero section */}
      <motion.div 
        className="w-full py-20 px-4 relative overflow-hidden border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-indigo-900/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1)_0%,transparent_60%)]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About <span className="text-indigo-400">NeuroCare</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Advancing mental health diagnostics through cutting-edge EEG technology and artificial intelligence analysis
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-12 gap-8"
        >
          {/* About Project Card */}
          <motion.div
            className="md:col-span-12 bg-gray-800/50 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-indigo-500"
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About the Project
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              This project leverages EEG (electroencephalography) data to detect
              mental health challenges such as anxiety and depression. Through
              advanced deep learning models, we aim to provide early diagnostic
              insights, making mental health monitoring more accessible and effective.
            </p>
          </motion.div>

          {/* Two-column cards section */}
          <motion.div
            className="md:col-span-6 bg-gray-800/50 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-500"
            variants={slideIn}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Why EEG Matters
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              EEG is a powerful tool for observing brain activity in real-time.
              Its ability to detect neural patterns makes it invaluable in
              diagnosing mental health disorders, providing non-invasive and
              accurate insights that can guide treatment plans and improve patient outcomes.
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-6 bg-gray-800/50 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-purple-500"
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Our Approach
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              We combine cutting-edge machine learning algorithms with clinical expertise to analyze EEG data patterns. 
              Our platform processes brain activity signals to identify biomarkers associated with various mental health conditions, 
              providing healthcare professionals with actionable insights for personalized care.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="md:col-span-12 bg-gray-800/50 rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-indigo-500"
            variants={fadeIn}
          >
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Meet the Team
              </h2>
              <p className="text-base leading-relaxed text-gray-300 max-w-2xl">
                A dedicated team of engineers and researchers focused on
                transforming mental health diagnostics through EEG technology.
              </p>
              <p className="text-sm text-indigo-400 mt-4 italic font-medium">
                {isMobile ? (
                  <span className="block">Swipe to see all team members</span>
                ) : (
                  <span className="block">Drag the cards to interact with them</span>
                )}
              </p>
            </div>
            <div className="w-full overflow-hidden">
              <DragCards />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-base text-gray-500">
            © {new Date().getFullYear()} NeuroCare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;