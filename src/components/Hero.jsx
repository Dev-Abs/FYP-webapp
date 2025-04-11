import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import UploadEEG from "./UploadEEG";
import ParticleRing from "./ParticleRing";
import CircularText from "./CircularText";
import '../css/eeg.css'

// Image data for the grid
const squareData = [
  { id: 1, src: "1.jpeg" },
  { id: 2, src: "2.jpeg" },
  { id: 3, src: "3.jpeg" },
  { id: 4, src: "4.jpeg" },
  { id: 5, src: "5.jpeg" },
  { id: 6, src: "17.jpg" },
  { id: 7, src: "7.jpeg" }, // Changed from 2.jpeg to 7.jpeg
  { id: 8, src: "8.jpeg" },
  { id: 9, src: "9.jpeg" },
  { id: 10, src: "10.jpeg" },
  { id: 11, src: "11.jpeg" }, // Changed id from 1 to 11
  { id: 12, src: "12.jpeg" },
  { id: 13, src: "13.jpeg" },
  { id: 14, src: "14.jpeg" },
  { id: 15, src: "15.jpeg" },
  { id: 16, src: "16.jpeg" }
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

// EEG Wave Animation Component
const EEGAnimation = () => {
  return (
    <>
      {/* EEG Wave Animation */}
      <div className="eeg-animation-container">
        <div className="eeg-wave eeg-wave-1"></div>
        <div className="eeg-wave eeg-wave-2"></div>
        <div className="eeg-wave eeg-wave-3"></div>
        <div className="eeg-wave eeg-wave-4"></div>
        <div className="eeg-wave eeg-wave-5"></div>
      </div>
      
      {/* EEG Signal Spikes */}
      <div className="eeg-spike-container">
        <div className="eeg-spike eeg-spike-1">
          <div className="eeg-spike-line"></div>
          <div className="eeg-spike-dot eeg-spike-dot-1"></div>
          <div className="eeg-spike-dot eeg-spike-dot-2"></div>
          <div className="eeg-spike-dot eeg-spike-dot-3"></div>
        </div>
        <div className="eeg-spike eeg-spike-2">
          <div className="eeg-spike-line"></div>
          <div className="eeg-spike-dot eeg-spike-dot-1"></div>
          <div className="eeg-spike-dot eeg-spike-dot-2"></div>
          <div className="eeg-spike-dot eeg-spike-dot-3"></div>
        </div>
        <div className="eeg-spike eeg-spike-3">
          <div className="eeg-spike-line"></div>
          <div className="eeg-spike-dot eeg-spike-dot-1"></div>
          <div className="eeg-spike-dot eeg-spike-dot-2"></div>
          <div className="eeg-spike-dot eeg-spike-dot-3"></div>
        </div>
      </div>
      
      {/* Brain Mapping Grid */}
      <div className="brain-mapping-grid"></div>
      
      {/* Pulse Rings */}
      <div className="pulse-ring-container">
        <div className="pulse-ring pulse-ring-1"></div>
        <div className="pulse-ring pulse-ring-2"></div>
        <div className="pulse-ring pulse-ring-3"></div>
      </div>
    </>
  );
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
      {/* EEG Animation Background */}
      <EEGAnimation />
      
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