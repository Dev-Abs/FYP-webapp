import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WellnessGame = ({ isActive = false, onClose }) => {
  const [gameMode, setGameMode] = useState("select"); // select, breathe, focus, relax
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  
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
      className="bg-gradient-to-b mt-2 from-indigo-900/90 to-gray-900/95 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Game Header */}
      <div className="px-5 py-4 bg-indigo-700/30 border-b border-indigo-500/30 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Wellness Space
        </h3>
        {gameMode !== "select" && (
          <button 
            onClick={backToSelect}
            className="text-indigo-200 hover:text-white text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Game Content Area */}
      <div className="p-5">
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
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-indigo-600 text-white px-6 py-4 rounded-lg shadow-lg text-center max-w-xs"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <p className="text-lg">{message}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Footer - Only shown during active games */}
      {gameMode !== "select" && (
        <div className="px-5 py-3 bg-indigo-800/20 border-t border-indigo-500/30 flex justify-between items-center">
          {gameMode === "focus" && (
            <>
              <div className="text-indigo-200">
                Score: <span className="text-white font-medium">{score}</span>
              </div>
              <div className="text-indigo-200">
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
    </motion.div>
  );
};

// Game Selection Menu
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
      color: "from-blue-500 to-indigo-600"
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
      color: "from-purple-500 to-indigo-600"
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
      color: "from-teal-500 to-blue-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <p className="text-indigo-100 text-center mb-4">
        Choose an activity to support your wellbeing
      </p>
      
      <div className="grid gap-4">
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`bg-gradient-to-r ${game.color} p-4 rounded-lg text-left flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white/20 p-2 rounded-full">
              {game.icon}
            </div>
            <div>
              <h3 className="font-medium text-white">{game.name}</h3>
              <p className="text-sm text-indigo-100 opacity-90">{game.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Breathing Exercise Component
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
      return 100 + (count / 4) * 100;
    } else if (phase === "exhale") {
      return 200 - (count / 6) * 100;
    }
    return phase === "hold" || phase === "hold2" ? 200 : 100;
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
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="text-indigo-100 mb-8 text-center">
        Follow the circle and breathe along with it
      </p>
      
      <div className="relative flex items-center justify-center">
        <motion.div 
          className="absolute rounded-full bg-indigo-400/10 border-2 border-indigo-400/30"
          animate={{ 
            width: `${getSize()}px`, 
            height: `${getSize()}px`,
            borderColor: phase === "inhale" 
              ? "rgba(129, 140, 248, 0.6)" 
              : phase === "exhale" 
              ? "rgba(129, 140, 248, 0.3)" 
              : "rgba(129, 140, 248, 0.5)"
          }}
          transition={{ duration: 1 }}
        />
        
        <motion.div
          className="text-white font-medium"
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
      
      <div className="mt-10 text-indigo-200">
        Cycle {cycles + 1} of {maxCycles}
      </div>
    </motion.div>
  );
};

// Focus Game Component
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
    let baseClasses = "flex items-center justify-center w-16 h-16 cursor-pointer transition-transform";
    
    // Add color classes
    switch (shape.color) {
      case "indigo": baseClasses += " bg-indigo-500"; break;
      case "teal": baseClasses += " bg-teal-500"; break;
      case "purple": baseClasses += " bg-purple-500"; break;
      case "blue": baseClasses += " bg-blue-500"; break;
      default: baseClasses += " bg-indigo-500";
    }
    
    // Add shape classes
    switch (shape.type) {
      case "circle": baseClasses += " rounded-full"; break;
      case "square": baseClasses += " rounded-lg"; break;
      case "triangle": baseClasses = "triangle " + baseClasses; break;
      case "diamond": baseClasses = "diamond " + baseClasses; break;
      default: baseClasses += " rounded-lg";
    }
    
    return baseClasses;
  };
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center relative py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!gameActive ? (
        <div className="flex flex-col items-center justify-center h-48">
          <motion.div 
            className="text-4xl text-white font-bold"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {countdown > 0 ? countdown : "Go!"}
          </motion.div>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <p className="text-indigo-100">Round {round}/10</p>
            {targetShape && (
              <div className="mt-2">
                <p className="text-white text-sm mb-2">Find this shape:</p>
                <div className="flex justify-center">
                  <div className={getShapeStyle(targetShape) + " scale-75 cursor-default"}>
                    {targetShape.type === "triangle" && <div className="triangle-inner" />}
                    {targetShape.type === "diamond" && <div className="diamond-inner" />}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {shapes.map(shape => (
              <motion.div
                key={shape.id}
                className={getShapeStyle(shape)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShapeClick(shape)}
              >
                {shape.type === "triangle" && <div className="triangle-inner" />}
                {shape.type === "diamond" && <div className="diamond-inner" />}
              </motion.div>
            ))}
          </div>
          
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

// Relaxing Scene Component
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
        opacity: Math.random() * 0.7 + 0.3
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
        return "bg-gradient-to-b from-teal-900 to-green-900";
      case "ocean":
        return "bg-gradient-to-b from-blue-900 to-indigo-900";
      case "sunset":
        return "bg-gradient-to-b from-orange-600 to-purple-900";
      default:
        return "bg-gradient-to-b from-teal-900 to-green-900";
    }
  };
  
  return (
    <motion.div
      className="flex flex-col items-center relative h-64 overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <div className={`absolute inset-0 ${getSceneBackground()} transition-colors duration-1000`}>
        {/* Scene elements will go here */}
      </div>
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
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
      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-3 z-10">
        <button
          onClick={() => setScene("forest")}
          className={`w-3 h-3 rounded-full ${scene === "forest" ? "bg-white" : "bg-white/40"} transition-colors`}
        />
        <button
          onClick={() => setScene("ocean")}
          className={`w-3 h-3 rounded-full ${scene === "ocean" ? "bg-white" : "bg-white/40"} transition-colors`}
        />
        <button
          onClick={() => setScene("sunset")}
          className={`w-3 h-3 rounded-full ${scene === "sunset" ? "bg-white" : "bg-white/40"} transition-colors`}
        />
      </div>
      
      {/* Timer */}
      <div className="absolute top-2 right-2 text-xs text-white/70">
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
        <p className="text-white text-opacity-70 text-sm">Breathe with the circle</p>
      </div>
    </motion.div>
  );
};

export default WellnessGame;