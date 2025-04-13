import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaComments, FaBrain, FaHeartbeat } from "react-icons/fa";
import NavbarDrawer from "./NavbarDrawer";
import CircularText from "./CircularText";
import NeuroCareInteractiveChatbot from "./NeuroCareInteractiveChatbot";
import "../css/care.css";

const motivationalWords = [
  "Inspire", "Hope", "Courage", "Strength", "Resilience", "Believe",
  "Thrive", "Empower", "Calm", "Peace", "Focus", "Joy", "Gratitude",
  "Kindness", "Compassion", "Mindful", "Balance", "Wellness", "Healing",
  "Self-care", "Self-love", "Confidence", "Optimism", "Purpose", "Success",
];

const motivationStatements = [
  "You have survived 100% of your worst days. Keep going.",
  "It's okay to not be okay. Healing takes time.",
  "Your feelings are valid, but they do not define you.",
  "Small progress is still progress. Take one step at a time.",
  "You are not alone. There are people who care about you.",
  "Mental health is just as important as physical health.",
  "You are stronger than you think, even on your worst days.",
  "Every storm runs out of rain. Your struggles will pass too.",
  "Be kind to yourself. Self-love is not selfish.",
  "Your thoughts are not facts. Don't believe everything you think.",
  "Asking for help is a sign of strength, not weakness.",
  "Your current situation is not your final destination.",
  "Breathe. Inhale strength, exhale stress.",
  "You are worthy of love, happiness, and peace.",
  "Progress, not perfection. Just keep moving forward.",
  "One bad day does not mean a bad life.",
  "Your past does not define your future.",
  "You are enough, just as you are.",
  "It's okay to take breaks. Rest is part of healing.",
  "Happiness is not the absence of problems, but the ability to deal with them.",
  "Every day is a new beginning. Don't be afraid to start over.",
  "Even the darkest night will end, and the sun will rise again.",
  "Your mind believes what you tell it. Speak kindly to yourself.",
  "You don't have to control your thoughts, just stop letting them control you.",
  "Healing is not linear. Some days will be better than others, and that's okay.",
];

const DELAY_IN_MS = 6000;
const TRANSITION_DURATION_IN_SECS = 0.8;

let cachedStatements = null;

const NeuroCareInteractive = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("motivation");
  const constraintsRef = useRef(null);

  // Handle chat dragging functionality
  const onDragStart = () => setIsDragging(true);
  const onDragEnd = () => setIsDragging(false);

  useEffect(() => {
    // Add custom cursor when dragging
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }
    
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isDragging]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-900 to-gray-950" ref={constraintsRef}>
      <NavbarDrawer />
      
      {/* Subtle circular text */}
      {/* <div className="absolute top-4 left-4 z-20">
        <CircularText
          text="NEURO*CARE*"
          onHover="speedUp"
          spinDuration={20}
          className="text-gray-400"
        />
      </div> */}
      
      {/* Subtle background with grid pattern */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.075)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
        
        {/* Subtle gradient accents */}
        <div className="absolute top-0 -right-1/3 w-2/3 h-2/3 bg-indigo-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-1/3 w-2/3 h-2/3 bg-indigo-900/5 rounded-full blur-3xl"></div>
        
        {/* Refined neural network visualization */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="rgba(67, 56, 202, 0.3)" />
              </linearGradient>
            </defs>
            
            {/* Horizontal lines */}
            <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            
            {/* Vertical lines */}
            <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="40%" y1="0%" x2="40%" y2="100%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="url(#line-gradient)" strokeWidth="0.5" />
            
            {/* Node points */}
            <circle cx="20%" cy="20%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="20%" cy="40%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="20%" cy="60%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="20%" cy="80%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            
            <circle cx="40%" cy="20%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="40%" cy="40%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="40%" cy="60%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="40%" cy="80%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            
            <circle cx="60%" cy="20%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="60%" cy="40%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="60%" cy="60%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="60%" cy="80%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            
            <circle cx="80%" cy="20%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="80%" cy="40%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="80%" cy="60%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            <circle cx="80%" cy="80%" r="2" fill="rgba(99, 102, 241, 0.8)" />
            
            {/* Connection lines */}
            <line x1="20%" y1="20%" x2="40%" y2="40%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
            <line x1="20%" y1="60%" x2="40%" y2="40%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
            <line x1="40%" y1="40%" x2="60%" y2="60%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
            <line x1="40%" y1="80%" x2="60%" y2="60%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
            <line x1="60%" y1="20%" x2="80%" y2="40%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
            <line x1="60%" y1="60%" x2="80%" y2="40%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="relative z-10 pt-20 pb-10 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-xl mx-auto mb-10">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-100 text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          You are not Alone!
          </motion.h1>
          
          <div className="flex justify-center mb-10">
            <div className="bg-gray-800/70 rounded-full p-1 border border-gray-700 shadow-md">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("motivation")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "motivation"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-300 hover:bg-gray-700/80"
                  }`}
                >
                  Motivation
                </button>
                <button
                  onClick={() => setActiveTab("affirmations")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "affirmations"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-300 hover:bg-gray-700/80"
                  }`}
                >
                  Affirmations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rotating content based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full mb-20"
          >
            {activeTab === "motivation" ? (
              <NeuroCareRotatingStatements />
            ) : (
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
                {motivationalWords.map((word, index) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="px-5 py-3 bg-gray-800/80 rounded-lg border border-gray-700 hover:border-indigo-500/50 shadow-md transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: "rgba(67, 56, 202, 0.1)",
                      borderColor: "rgba(99, 102, 241, 0.5)"
                    }}
                  >
                    <p className="text-gray-200 font-medium">{word}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Refined floating action button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={() => setShowChatbot(true)}
          whileHover={{ scale: 1.03, boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hidden md:flex items-center space-x-2 border border-indigo-500/50"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        >
          <FaComments size={18} />
          <span className="font-medium">Talk to our AI Assistant</span>
        </motion.button>
        
        <AnimatePresence>
          {!showChatbot && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowChatbot(true)}
              className="fixed bottom-6 right-6 p-4 bg-indigo-600 rounded-full shadow-md text-white border border-indigo-500/50 transition-all duration-300 z-50 block md:hidden"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <FaComments size={20} />
              <motion.span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs border border-red-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                1
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Refined Draggable Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragConstraints={constraintsRef}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragElastic={0.05}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-4xl h-[80vh] max-h-[700px] rounded-xl overflow-hidden shadow-lg border border-gray-700"
              style={{ 
                touchAction: "none",
                background: "linear-gradient(to bottom, rgb(17, 24, 39), rgb(9, 9, 18))"
              }}
            >
              <div className="w-full h-full">
                <NeuroCareInteractiveChatbot onClose={() => setShowChatbot(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle help indicator in bottom left */}
      <motion.div 
        className="fixed bottom-8 left-8 z-30 hidden md:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-3 bg-gray-800/80 px-4 py-2 rounded-full border border-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
          <p className="text-gray-300 text-sm">NeuroCare is here to help</p>
        </div>
      </motion.div>
    </div>
  );
};

const NeuroCareRotatingStatements = () => {
  const [statements, setStatements] = useState(() => {
    if (cachedStatements) return cachedStatements;
    try {
      const stored = sessionStorage.getItem("statements");
      if (stored) {
        cachedStatements = JSON.parse(stored);
        return cachedStatements;
      }
    } catch (err) {
      console.error("Session storage error:", err);
    }
    return motivationStatements;
  });
  
  return (
    <div className="flex items-center justify-center">
      <FlippingCard items={statements} />
    </div>
  );
};

const FlippingCard = ({ items }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, DELAY_IN_MS);
    return () => clearInterval(intervalRef.current);
  }, [items]);

  const variants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          className="p-8 bg-gray-800/80 rounded-xl shadow-lg text-center border border-gray-700"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: 0.2 }}
          >
            <FaHeartbeat className="w-7 h-7 mx-auto text-indigo-400" />
          </motion.div>
          <p className="text-xl md:text-2xl font-medium text-gray-100 leading-relaxed">
            {items[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NeuroCareInteractive;