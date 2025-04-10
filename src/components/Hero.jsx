import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import UploadEEG from "./UploadEEG";
import ParticleRing from "./ParticleRing";
import CircularText from "./CircularText";

// Image data for the grid
const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/reserve/dPfjQTyJSJ2LpM7D9Yr0_Photo%2015-02-2014.jpg?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1601363645678-0cbae97abb2c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1557426575-6e9ea75ef57a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1552081845-de328afbf66d?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1531260796528-ae45a644fb20?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1609110995302-572b9641c0d1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1661627668944-a65d4f54ab27?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { 
    id: 9,
    src: "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    src: "https://plus.unsplash.com/premium_photo-1661310066866-45a714706cdc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1715866170788-cbde4a47a742?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    src: "https://plus.unsplash.com/premium_photo-1729867698245-c14c57fc7f47?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1607827448452-6fda561309d0?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Simple shuffle function for the array
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to window center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Update cursor position for spotlight effect
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Update with slight smoothing
      setMousePosition(prev => ({
        x: prev.x + (x - prev.x) * 0.1,
        y: prev.y + (y - prev.y) * 0.1
      }));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-900 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-16 md:py-0">
      {/* Animated particles */}
      {/* <div className="absolute inset-0 z-0">
        <ParticleRing />
      </div> */}
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
          {/* Animated gradient blobs */}
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-900/50 blur-[100px] mix-blend-screen animate-blob"></div>
          <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-900/50 blur-[100px] mix-blend-screen animate-blob animation-delay-2"></div>
          <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 rounded-full bg-blue-900/50 blur-[100px] mix-blend-screen animate-blob animation-delay-4"></div>
        </div>
        
        {/* Neural network grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>
        
        {/* Spotlight effect that follows cursor */}
        <div 
          className="absolute w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full radial-spotlight opacity-10 pointer-events-none"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>
      
      {/* Circular rotating text */}
      {/* <div className="absolute top-8 left-8 z-10 hidden md:block">
        <CircularText
          text="NEURO*CARE*"
          onHover="speedUp"
          spinDuration={20}
        />
      </div> */}
      
      {/* Content container - with subtle parallax effect */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 z-10">
        {/* Left side - Hero text */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
          transition={{ type: "spring", mass: 0.5 }}
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 mb-6 bg-indigo-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/20"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-xs md:text-sm text-indigo-300 font-medium">AI-Powered Mental Health Analysis</span>
          </motion.div>
          
          {/* Main heading with multi-line & gradient effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Track and Manage <span className="relative">
                <span className="absolute -inset-1 rounded-lg bg-indigo-500/20 blur-sm"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 background-animate">Mental Well-being</span>
              </span> Through EEG
            </h1>
          </motion.div>
          
          {/* Description with improved typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg"
          >
            Upload your EEG data and gain valuable insights into stress, depression, and
            anxiety levels using our advanced neural network analysis.
          </motion.p>
          
          {/* CTA buttons with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* Primary button with animated glow effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative group"
            >
              {/* Animated glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 ${isHovered ? 'animate-glow' : ''}`}></div>
              
              {/* Button content */}
              <div className="relative bg-gray-900 rounded-lg p-0.5 ring-1 ring-gray-800 group-hover:ring-indigo-500/50 transition duration-200">
                <UploadEEG />
              </div>
            </motion.div>
            
            {/* Secondary button */}
            <motion.a
              href="#learn-more"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-6 rounded-lg bg-gray-800/70 backdrop-blur-sm text-gray-200 border border-gray-700 hover:border-indigo-500/50 transition-all"
            >
              Learn More
            </motion.a>
          </motion.div>
          
          {/* Stats with enhanced styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            {[
              { value: "98%", label: "Accuracy" },
              { value: "2.5s", label: "Analysis Time" },
              { value: "25+", label: "Research Papers" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 rounded-lg bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center relative z-10">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right side - ShuffleGrid */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center items-center"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
          }}
          transition={{ type: "spring", mass: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-lg"
          >
            {/* Brain scan effect overlay */}
            <div className="absolute inset-0 z-10 opacity-30 pointer-events-none overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-scan"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-indigo-500/50 z-20"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-500/50 z-20"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-500/50 z-20"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-indigo-500/50 z-20"></div>
            
            {/* ShuffleGrid component */}
            <ShuffleGrid />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        /* Background animations */
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        
        .animation-delay-2 {
          animation-delay: 5s;
        }
        
        .animation-delay-4 {
          animation-delay: 10s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        /* Gradient text animation */
        .background-animate {
          background-size: 400%;
          animation: gradient-text 8s ease infinite;
        }
        
        @keyframes gradient-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        /* Glow animation for button */
        @keyframes glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-glow {
          background-size: 200% auto;
          animation: glow 3s linear infinite;
        }
        
        /* Scan effect for grid */
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        
        /* Spotlight effect */
        .radial-spotlight {
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
          transition: left 0.3s ease-out, top 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

// Optimized ShuffleGrid Component
const ShuffleGrid = () => {
  const [squares, setSquares] = useState([]);
  const intervalRef = useRef(null);
  
  // Set up and clean up the interval
  useEffect(() => {
    // Generate initial squares
    setSquares(generateSquares());
    
    // Setup interval for shuffling
    intervalRef.current = setInterval(() => {
      setSquares(generateSquares());
    }, 3000);
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Generate squares with optimized image handling
  const generateSquares = () => {
    return shuffle(squareData);
  };
  
  // Show loading state if squares aren't ready
  if (squares.length === 0) {
    return (
      <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1.5 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-gray-700/50">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-gray-700/50 animate-pulse rounded-sm"></div>
        ))}
      </div>
    );
  }
  
  // Render the grid
  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1.5 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-gray-700/50">
      {squares.map((square) => (
        <motion.div
          key={square.id}
          layout
          transition={{ 
            duration: 0.7, 
            type: "spring",
            stiffness: 150,
            damping: 15
          }}
          className="relative w-full h-full overflow-hidden rounded-sm group"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10"></div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          {/* Image */}
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${square.src})` }}
          ></motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Hero;