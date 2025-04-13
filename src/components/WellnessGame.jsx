import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WellnessGame = ({ isActive = false, onClose }) => {
  const [gameMode, setGameMode] = useState("select"); // select, breathe, focus, relax
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [connecting, setConnecting] = useState(true);
  
  // Generate background particles on component mount
  useEffect(() => {
    const generateParticles = () => {
      const particles = [];
      const particleCount = 40;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() * 60 + 220, // Blue to purple range
          delay: Math.random() * 5
        });
      }
      
      setBackgroundParticles(particles);
    };
    
    generateParticles();
    
    // Simulate connection
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle game mode selection
  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setStreak(0);
  };

  // Return to game selection
  const backToSelect = () => {
    setGameMode("select");
  };

  // Display temporary message
  const displayMessage = (text, duration = 2000) => {
    setMessage(text);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };

  return (
    <motion.div 
      className="w-full h-full overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced background with particles and gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/95 overflow-hidden">
        {/* Background gradient blobs */}
        <motion.div 
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-900/30 blur-[100px] mix-blend-screen"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-900/30 blur-[100px] mix-blend-screen"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 5
          }}
        />
        
        {/* Background particles */}
        {backgroundParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [particle.opacity, 0],
            }}
            transition={{
              duration: 20 / particle.speed,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Grid pattern for technical feel */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"
        />
      </div>
      
      {/* Loading overlay */}
      <AnimatePresence>
        {connecting && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-md"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-indigo-200 text-lg">Initializing Wellness Space...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content container with glass morphism effect */}
      <div className="relative z-10 w-full h-screen flex flex-col">
        {/* Game Header */}
        <div className="px-5 py-4 bg-indigo-700/20 backdrop-blur-md border-b border-indigo-500/30 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
              Wellness Space
            </span>
          </h3>
          {gameMode !== "select" && (
            <motion.button 
              onClick={backToSelect}
              className="text-indigo-200 hover:text-white text-sm flex items-center px-3 py-1 rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </motion.button>
          )}
        </div>

        {/* Game Content Area */}
        <div className="flex-1 p-5 overflow-auto">
          <AnimatePresence mode="wait">
            {gameMode === "select" ? (
              <GameSelection onSelect={startGame} key="selection" />
            ) : gameMode === "breathe" ? (
              <BreathingExercise key="breathe" onComplete={() => displayMessage("Great job! Feeling calmer now?")} />
            ) : gameMode === "focus" ? (
              <FocusGame 
                key="focus" 
                onScoreChange={setScore} 
                onStreakChange={setStreak} 
                onMessage={displayMessage}
              />
            ) : (
              <RelaxingScene key="relax" onComplete={() => displayMessage("Take this calm feeling with you")} />
            )}
          </AnimatePresence>

          {/* Message Overlay */}
          <AnimatePresence>
            {showMessage && (
              <motion.div 
                className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white px-8 py-6 rounded-xl shadow-lg text-center max-w-sm border border-indigo-500/50"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                >
                  <p className="text-xl font-medium">{message}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game Footer - Only shown during active games */}
        {gameMode !== "select" && (
          <div className="px-5 py-3 bg-indigo-800/20 backdrop-blur-md border-t border-indigo-500/30 flex justify-between items-center">
            {gameMode === "focus" && (
              <>
                <div className="px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-600/30 text-indigo-200">
                  Score: <span className="text-white font-medium">{score}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-600/30 text-indigo-200">
                  Streak: <span className="text-white font-medium">{streak}</span>
                </div>
              </>
            )}
            {(gameMode === "breathe" || gameMode === "relax") && (
              <div className="text-indigo-200 text-sm w-full text-center italic">
                Take a moment for yourself
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Game Selection Menu with enhanced visuals
const GameSelection = ({ onSelect }) => {
  const games = [
    {
      id: "breathe",
      name: "Breathing Exercise",
      description: "Guided breathing to reduce stress and anxiety",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
      accent: "border-blue-400"
    },
    {
      id: "focus",
      name: "Focus Training",
      description: "Simple attention game to improve concentration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-600",
      accent: "border-purple-400"
    },
    {
      id: "relax",
      name: "Calming Scene",
      description: "Visual relaxation with gentle animations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "from-teal-500 to-blue-600",
      accent: "border-teal-400"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Enhanced header */}
      <div className="text-center mb-8">
        <motion.div 
          className="h-20 w-20 mx-auto mb-4 rounded-full bg-indigo-600/30 flex items-center justify-center border border-indigo-500/50"
          animate={{ 
            boxShadow: [
              "0 0 0 rgba(79, 70, 229, 0.4)",
              "0 0 20px rgba(79, 70, 229, 0.6)",
              "0 0 0 rgba(79, 70, 229, 0.4)"
            ] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Wellness Activities</h2>
        <p className="text-indigo-200 max-w-lg mx-auto">
          Choose an activity to support your mental wellbeing. These exercises are designed to help reduce stress and improve focus.
        </p>
      </div>
      
      <div className="grid gap-4">
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`relative overflow-hidden bg-gray-800/50 backdrop-blur-md border ${game.accent} rounded-xl text-left flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow p-0`}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center w-full p-5">
              <div className={`bg-gradient-to-br ${game.color} p-3 rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                <div className="text-white">
                  {game.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-white mb-1">{game.name}</h3>
                <p className="text-sm text-indigo-200">{game.description}</p>
              </div>
              
              <motion.div 
                className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.2, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Wellness tip card */}
      <motion.div 
        className="mt-6 rounded-xl bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-indigo-300 text-sm font-medium mb-1">Wellness Tip</div>
        <p className="text-white text-sm italic">
          "Taking just a few minutes each day for mindfulness exercises can significantly reduce stress levels and improve mental clarity."
        </p>
      </motion.div>
    </motion.div>
  );
};

// Breathing Exercise Component with enhanced visuals
const BreathingExercise = ({ onComplete }) => {
  const [phase, setPhase] = useState("inhale"); // inhale, hold, exhale, hold2
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const maxCycles = 3;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (phase === "inhale" && prevCount >= 4) {
          setPhase("hold");
          return 0;
        } else if (phase === "hold" && prevCount >= 3) {
          setPhase("exhale");
          return 0;
        } else if (phase === "exhale" && prevCount >= 6) {
          setPhase("hold2");
          return 0;
        } else if (phase === "hold2" && prevCount >= 2) {
          const newCycles = cycles + 1;
          if (newCycles >= maxCycles) {
            clearInterval(timer);
            if (onComplete) setTimeout(onComplete, 500);
          } else {
            setCycles(newCycles);
          }
          setPhase("inhale");
          return 0;
        }
        return prevCount + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [phase, cycles, onComplete]);
  
  // Calculate circle size based on breathing phase
  const getSize = () => {
    if (phase === "inhale") {
      return 120 + (count / 4) * 120;
    } else if (phase === "exhale") {
      return 240 - (count / 6) * 120;
    }
    return phase === "hold" || phase === "hold2" ? 240 : 120;
  };

  // Get instruction text
  const getInstruction = () => {
    switch (phase) {
      case "inhale": return "Breathe In";
      case "hold": return "Hold";
      case "exhale": return "Breathe Out";
      case "hold2": return "Hold";
      default: return "";
    }
  };
  
  // Get color based on breathing phase
  const getColor = () => {
    switch (phase) {
      case "inhale": return "rgba(129, 140, 248, 0.7)"; // Indigo
      case "hold": return "rgba(167, 139, 250, 0.7)"; // Purple
      case "exhale": return "rgba(96, 165, 250, 0.7)"; // Blue
      case "hold2": return "rgba(167, 139, 250, 0.7)"; // Purple
      default: return "rgba(129, 140, 248, 0.7)";
    }
  };
  
  return (
    <motion.div
      className="h-full flex flex-col items-center justify-center py-8 gap-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-3">Breathing Exercise</h3>
        <p className="text-indigo-100 max-w-md mx-auto">
          Follow the circle's rhythm and sync your breathing with the animation. 
          This exercise helps reduce stress and increase mindfulness.
        </p>
      </div>
      
      <div className="relative flex items-center justify-center">
        {/* Outer decorative rings */}
        <motion.div 
          className="absolute rounded-full border-2 border-indigo-300/10"
          style={{ width: '300px', height: '300px' }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Main breathing circle with enhanced visuals */}
        <motion.div 
          className="absolute rounded-full backdrop-blur-md"
          style={{ 
            boxShadow: `0 0 30px ${getColor()}`, 
            background: `radial-gradient(circle, ${getColor()} 0%, rgba(79, 70, 229, 0.1) 70%)`,
            border: `2px solid ${getColor()}`,
          }}
          animate={{ 
            width: `${getSize()}px`, 
            height: `${getSize()}px`,
          }}
          transition={{ duration: 1 }}
        />
        
        <motion.div
          className="relative z-10 text-white font-medium text-xl"
          animate={{ 
            opacity: [0.7, 1, 0.7],
            scale: [0.95, 1, 0.95]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: phase === "inhale" ? 4 : phase === "exhale" ? 6 : 3 
          }}
        >
          {getInstruction()}
        </motion.div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-16 flex flex-col items-center">
        <div className="text-indigo-200 mb-3">
          Cycle {cycles + 1} of {maxCycles}
        </div>
        
        <div className="w-64 h-2 bg-gray-800/70 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${((cycles * 4 + 
              (phase === 'inhale' ? 1 : 
               phase === 'hold' ? 2 : 
               phase === 'exhale' ? 3 : 4)) / (maxCycles * 4)) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Focus Game Component with enhanced visuals
const FocusGame = ({ onScoreChange, onStreakChange, onMessage }) => {
  const [shapes, setShapes] = useState([]);
  const [targetShape, setTargetShape] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  const shapeTypes = ["circle", "square", "triangle", "diamond"];
  const colors = ["indigo", "teal", "purple", "blue"];
  
  // Start game with countdown
  useEffect(() => {
    if (!gameActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (!gameActive && countdown === 0) {
      setGameActive(true);
      startNewRound();
    }
  }, [countdown, gameActive]);
  
  // Update parent component with score and streak
  useEffect(() => {
    onScoreChange(score);
    onStreakChange(streak);
  }, [score, streak, onScoreChange, onStreakChange]);
  
  const startNewRound = () => {
    // Generate random shapes
    const numShapes = Math.min(3 + Math.floor(round / 2), 7);
    const newShapes = [];
    
    for (let i = 0; i < numShapes; i++) {
      newShapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Select random target
    const newTarget = newShapes[Math.floor(Math.random() * newShapes.length)];
    
    setShapes(newShapes);
    setTargetShape(newTarget);
    setRound(round + 1);
    
    // Auto-end game after 10 rounds
    if (round >= 10) {
      setGameActive(false);
      onMessage(`Game complete! Final score: ${score}`);
    }
  };
  
  const handleShapeClick = (shape) => {
    if (!gameActive) return;
    
    if (shape.id === targetShape.id) {
      // Correct!
      const newScore = score + 10 + (streak * 2);
      const newStreak = streak + 1;
      
      setScore(newScore);
      setStreak(newStreak);
      
      if (newStreak === 3) {
        onMessage("3x streak! Great focus!");
      }
      
      startNewRound();
    } else {
      // Incorrect
      setStreak(0);
      onMessage("Try again!");
    }
  };
  
  const getShapeStyle = (shape) => {
    let baseClasses = "flex items-center justify-center w-16 h-16 cursor-pointer transition-transform backdrop-blur-sm shadow-lg";
    
    // Add color classes
    switch (shape.color) {
      case "indigo": baseClasses += " bg-indigo-500/90 border-indigo-400"; break;
      case "teal": baseClasses += " bg-teal-500/90 border-teal-400"; break;
      case "purple": baseClasses += " bg-purple-500/90 border-purple-400"; break;
      case "blue": baseClasses += " bg-blue-500/90 border-blue-400"; break;
      default: baseClasses += " bg-indigo-500/90 border-indigo-400";
    }
    
    // Add shape classes
    switch (shape.type) {
      case "circle": baseClasses += " rounded-full"; break;
      case "square": baseClasses += " rounded-lg"; break;
      case "triangle": baseClasses = "triangle " + baseClasses; break;
      case "diamond": baseClasses = "diamond " + baseClasses; break;
      default: baseClasses += " rounded-lg";
    }
    
    // Add border
    baseClasses += " border-2";
    
    return baseClasses;
  };
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!gameActive ? (
        <div className="flex flex-col items-center justify-center h-56 py-10">
          <motion.div 
            className="text-6xl text-white font-bold"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.5, 1, 0.5],
              textShadow: [
                '0 0 5px rgba(99, 102, 241, 0.5)',
                '0 0 20px rgba(99, 102, 241, 0.8)',
                '0 0 5px rgba(99, 102, 241, 0.5)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {countdown > 0 ? countdown : "Go!"}
          </motion.div>
          
          <motion.p 
            className="text-indigo-200 mt-6 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Get ready to find the matching shape. Click on the shape that matches the target.
          </motion.p>
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-900/40 backdrop-blur-sm rounded-xl border border-indigo-500/30">
              <p className="text-white">Round {round}/10</p>
            </div>
            
            {targetShape && (
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={round}
              >
                <p className="text-white text-sm mb-3">Find this shape:</p>
                <div className="flex justify-center">
                  <div className={getShapeStyle(targetShape) + " scale-75 cursor-default"}>
                    {targetShape.type === "triangle" && <div className="triangle-inner" />}
                    {targetShape.type === "diamond" && <div className="diamond-inner" />}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            key={round}
          >
            {shapes.map(shape => (
              <motion.div
                key={shape.id}
                className={getShapeStyle(shape)}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShapeClick(shape)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: shape.id * 0.1 }}
              >
                {shape.type === "triangle" && <div className="triangle-inner" />}
                {shape.type === "diamond" && <div className="diamond-inner" />}
              </motion.div>
            ))}
          </motion.div>
          
          <style jsx>{`
            .triangle {
              clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            }
            .diamond {
              clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            }
          `}</style>
        </>
      )}
    </motion.div>
  );
};

// Relaxing Scene Component with enhanced visuals
const RelaxingScene = ({ onComplete }) => {
  const [scene, setScene] = useState("forest");
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const sceneDuration = 60; // seconds
  const [timer, setTimer] = useState(sceneDuration);
  
  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const newParticles = [];
    const particleCount = Math.floor((width * height) / 3000);
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        hue: getSceneHue(scene)
      });
    }
    
    setParticles(newParticles);
    
    // Timer for automatic completion
    const countdownTimer = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdownTimer);
  }, [scene, onComplete]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getSceneBackground = () => {
    switch (scene) {
      case "forest":
        return "bg-gradient-to-b from-emerald-900 to-emerald-950";
      case "ocean":
        return "bg-gradient-to-b from-blue-900 to-blue-950";
      case "sunset":
        return "bg-gradient-to-b from-orange-700 to-purple-950";
      default:
        return "bg-gradient-to-b from-emerald-900 to-emerald-950";
    }
  };
  
  const getSceneHue = (currentScene) => {
    switch (currentScene) {
      case "forest": return 140; // Green
      case "ocean": return 210; // Blue
      case "sunset": return 25; // Orange
      default: return 140;
    }
  };
  
  return (
    <motion.div
      className="flex flex-col items-center relative h-full overflow-hidden rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <div className={`absolute inset-0 ${getSceneBackground()} transition-colors duration-1000`}>
        {/* Scene-specific elements */}
        {scene === "forest" && (
          <div className="absolute bottom-0 w-full h-1/3">
            <motion.div 
              className="absolute bottom-0 w-full h-[30px] bg-emerald-900"
              style={{ 
                maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 L0,60 C20,70 40,40 60,50 C80,60 100,20 120,30 C140,40 160,80 180,70 C190,65 200,50 200,50 L200,100 Z' fill='%23000'/%3E%3C/svg%3E\")",
                WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 L0,60 C20,70 40,40 60,50 C80,60 100,20 120,30 C140,40 160,80 180,70 C190,65 200,50 200,50 L200,100 Z' fill='%23000'/%3E%3C/svg%3E\")",
                maskSize: "cover",
                WebkitMaskSize: "cover"
              }}
            />
            <motion.div 
              className="absolute bottom-0 w-full h-[60px] bg-emerald-800"
              style={{ 
                maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 L0,30 C30,50 40,20 60,30 C80,40 100,10 120,20 C140,30 160,60 180,50 C190,45 200,30 200,30 L200,100 Z' fill='%23000'/%3E%3C/svg%3E\")",
                WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 L0,30 C30,50 40,20 60,30 C80,40 100,10 120,20 C140,30 160,60 180,50 C190,45 200,30 200,30 L200,100 Z' fill='%23000'/%3E%3C/svg%3E\")",
                maskSize: "cover",
                WebkitMaskSize: "cover"
              }}
            />
          </div>
        )}
        
        {scene === "ocean" && (
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 right-0 h-1/3">
              <motion.div 
                className="absolute inset-0 bg-blue-600/30"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0 bg-blue-500/20"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
        )}
        
        {scene === "sunset" && (
          <div className="absolute inset-0">
            <div className="absolute top-[30%] left-[50%] w-20 h-20 rounded-full bg-orange-500/70 blur-xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[30%] left-[50%] w-14 h-14 rounded-full bg-yellow-400/90 blur-md transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-purple-900/80 to-transparent" />
          </div>
        )}
      </div>
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`,
              x: particle.x,
              y: particle.y
            }}
            animate={{
              y: [particle.y, -10],
              opacity: [particle.opacity, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 / particle.speed,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Scene controls */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center space-x-4 z-10">
        <button
          onClick={() => setScene("forest")}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            scene === "forest" 
              ? "bg-emerald-500 ring-2 ring-white" 
              : "bg-emerald-700/40 hover:bg-emerald-600/60"
          }`}
          aria-label="Forest scene"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => setScene("ocean")}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            scene === "ocean" 
              ? "bg-blue-500 ring-2 ring-white" 
              : "bg-blue-700/40 hover:bg-blue-600/60"
          }`}
          aria-label="Ocean scene"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => setScene("sunset")}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            scene === "sunset" 
              ? "bg-orange-500 ring-2 ring-white" 
              : "bg-orange-700/40 hover:bg-orange-600/60"
          }`}
          aria-label="Sunset scene"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Timer */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-xs text-white/70">
        {formatTime(timer)}
      </div>
      
      {/* Breathing guide */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 rounded-full border-2 border-white/30" />
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-white text-opacity-70 text-sm bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full">
          Breathe with the circle
        </p>
      </div>
    </motion.div>
  );
};

export default WellnessGame;