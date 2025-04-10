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
    <div className="relative overflow-hidden min-h-screen bg-gray-950" ref={constraintsRef}>
      <NavbarDrawer />
      
      {/* Enhanced circular text with glowing effect */}
      <div className="absolute top-4 left-4 z-20">
        <CircularText
          text="NEURO*CARE*"
          onHover="speedUp"
          spinDuration={15}
          className="filter drop-shadow-lg text-indigo-200"
        />
      </div>
      
      {/* Improved background with darker mesh gradient and animated particles */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 overflow-hidden">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(78,48,178,0.7)_0%,rgba(10,15,30,0)_60%)]"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_70%,rgba(120,58,180,0.6)_0%,rgba(10,15,30,0)_60%)]"></div>
        
        {/* Enhanced particle animation */}
        <div className="particles-container">
          {Array.from({ length: 80 }).map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--size': `${Math.random() * 12 + 2}px`,
                '--pos-x': `${Math.random() * 100}%`,
                '--pos-y': `${Math.random() * 100}%`,
                '--opacity': Math.random() * 0.5 + 0.15,
                '--delay': `${Math.random() * 8}s`,
                '--duration': `${Math.random() * 30 + 15}s`,
                '--blur': `${Math.random() * 2 + 1}px`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Subtle dark overlay for depth */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Floating brain wave visualization for decorative purposes */}
      <motion.div 
        className="absolute top-1/4 right-10 w-48 h-48 opacity-20 z-0 hidden md:block"
        animate={{
          y: [0, 20, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0 50 C 40 30, 60 70, 100 50 C 140 30, 160 70, 200 50" 
            stroke="rgba(255,255,255,0.8)" 
            strokeWidth="2" 
            fill="none"
            animate={{
              d: [
                "M0 50 C 40 30, 60 70, 100 50 C 140 30, 160 70, 200 50",
                "M0 50 C 40 70, 60 30, 100 50 C 140 70, 160 30, 200 50",
                "M0 50 C 40 30, 60 70, 100 50 C 140 30, 160 70, 200 50"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Content Tabs */}
      <div className="relative z-10 pt-20 pb-10 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-xl mx-auto mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-900/70 backdrop-blur-lg rounded-full p-1 shadow-xl border border-indigo-500/20">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("motivation")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "motivation"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg"
                      : "text-indigo-100 hover:bg-gray-800/80"
                  }`}
                >
                  Motivation
                </button>
                <button
                  onClick={() => setActiveTab("affirmations")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "affirmations"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg"
                      : "text-indigo-100 hover:bg-gray-800/80"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {activeTab === "motivation" ? (
              <NeuroCareRotatingStatements />
            ) : (
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
                {motivationalWords.map((word, index) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="px-5 py-3 bg-gray-800/60 backdrop-blur-md rounded-xl border border-indigo-500/30 shadow-xl"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(79, 70, 229, 0.2)",
                      boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)"
                    }}
                  >
                    <p className="text-indigo-100 font-medium">{word}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced floating action button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={() => setShowChatbot(true)}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-full shadow-xl hidden md:flex items-center space-x-2 border border-indigo-500/30"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <FaComments size={20} />
          <span className="font-medium">Talk to our Assistant</span>
        </motion.button>
        
        <AnimatePresence>
          {!showChatbot && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowChatbot(true)}
              className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-700 to-purple-800 rounded-full shadow-2xl text-white hover:shadow-indigo-500/30 hover:shadow-lg transition-all duration-300 z-50 block md:hidden"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <FaComments size={24} />
              <motion.span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                1
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Draggable Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragConstraints={constraintsRef}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragElastic={0.1}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-4xl h-[80vh] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/40"
              style={{ 
                touchAction: "none",
                background: "linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(9, 9, 21, 0.98))"
              }}
            >
              <div className="w-full h-full backdrop-blur-md">
                <NeuroCareInteractiveChatbot onClose={() => setShowChatbot(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulsing help indicator in bottom left */}
      <motion.div 
        className="fixed bottom-8 left-8 z-30 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center space-x-3 bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/20">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-green-500 rounded-full shadow-sm shadow-green-500/50"
          />
          <p className="text-indigo-100 text-sm font-medium">NeuroCare is here to help</p>
        </div>
      </motion.div>
      
      {/* Custom CSS for enhanced particles */}
      <style jsx>{`
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: rgba(255, 255, 255, var(--opacity));
          border-radius: 50%;
          top: var(--pos-y);
          left: var(--pos-x);
          animation: float var(--duration) linear var(--delay) infinite;
          filter: blur(var(--blur));
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: var(--opacity);
          }
          25% {
            transform: translateY(-100px) translateX(50px);
            opacity: var(--opacity) * 0.8;
          }
          50% {
            transform: translateY(-200px) translateX(-50px);
            opacity: var(--opacity) * 0.6;
          }
          75% {
            transform: translateY(-300px) translateX(25px);
            opacity: var(--opacity) * 0.3;
          }
          100% {
            transform: translateY(-500px) translateX(0);
            opacity: 0;
          }
        }
      `}</style>
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
          className="p-10 bg-gradient-to-br from-gray-900/80 to-indigo-900/40 backdrop-blur-lg rounded-2xl shadow-2xl text-center border border-indigo-500/30"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <FaHeartbeat className="w-8 h-8 mx-auto text-indigo-400" />
          </motion.div>
          <p className="text-2xl md:text-3xl font-semibold text-indigo-50 leading-relaxed">
            {items[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NeuroCareInteractive;