import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ElectrodeAnimation = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  
  useEffect(() => {
    // Set up animation timing
    const timer1 = setTimeout(() => setAnimationStage(1), 800);
    const timer2 = setTimeout(() => setAnimationStage(2), 1800);
    const timer3 = setTimeout(() => setAnimationStage(3), 2800);
    const timer4 = setTimeout(() => {
      setAnimationStage(4);
      if (onComplete) setTimeout(onComplete, 500);
    }, 4000);
    
    // Create scanning effect
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev < 100) ? prev + 2 : 0);
    }, 50);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(scanInterval);
    };
  }, [onComplete]);
  
  // Electrode positions for animation
  const electrodes = [
    { id: 'Fp1', x: 35, y: 22 },
    { id: 'Fp2', x: 65, y: 22 },
    { id: 'F7', x: 25, y: 30 },
    { id: 'F3', x: 38, y: 33 },
    { id: 'Fz', x: 50, y: 33 },
    { id: 'F4', x: 62, y: 33 },
    { id: 'F8', x: 75, y: 30 },
    { id: 'T3', x: 25, y: 50 },
    { id: 'C3', x: 38, y: 50 },
    { id: 'Cz', x: 50, y: 50 },
    { id: 'C4', x: 62, y: 50 },
    { id: 'T4', x: 75, y: 50 },
    { id: 'T5', x: 30, y: 65 },
    { id: 'P3', x: 38, y: 65 },
    { id: 'Pz', x: 50, y: 65 },
    { id: 'P4', x: 62, y: 65 },
    { id: 'T6', x: 70, y: 65 },
    { id: 'O1', x: 40, y: 80 },
    { id: 'O2', x: 60, y: 80 },
  ];
  
  // Generate random EEG signal data for animations
  const generateRandomSignal = () => {
    let points = "M 0,50 ";
    for (let i = 1; i <= 100; i++) {
      const y = 50 + Math.sin(i * 0.5) * 20 + Math.random() * 15;
      points += `L ${i},${y} `;
    }
    return points;
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-md">
      {/* Tech interface elements */}
      <div className="absolute top-6 left-6 right-6 flex justify-between">
        <motion.div 
          className="text-xs md:text-sm text-blue-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          NEUROSCiENCE.DATA.PROC //{Math.floor(Math.random() * 10000)}
        </motion.div>
        <motion.div 
          className="text-xs md:text-sm text-green-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {new Date().toISOString().substring(0, 19).replace('T', ' ')}
        </motion.div>
      </div>
      
      {/* Main visualization */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 mt-8">
        {/* Background grid */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-blue-500/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.7) 100%)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)',
          }}
        >
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.1) 0px, transparent 1px, transparent 10px)',
                 backgroundSize: '100% 10px',
               }}></div>
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0px, transparent 1px, transparent 10px)',
                 backgroundSize: '10px 100%',
               }}></div>
        </motion.div>
        
        {/* Scanning effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{ top: `${scanLine}%`, opacity: animationStage >= 1 ? 0.7 : 0 }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        {/* Skull outline */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: animationStage >= 0 ? 1 : 0, 
            scale: animationStage >= 0 ? 1 : 0.8,
            borderColor: animationStage >= 3 ? 'rgba(219, 234, 254, 0.6)' : 'rgba(99, 102, 241, 0.6)'
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Brain regions - appear next */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStage >= 1 ? 0.8 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <radialGradient id="frontalGradient" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#8BB1D1" />
                  <stop offset="100%" stopColor="#5A81A1" />
                </radialGradient>
                <radialGradient id="centralGradient" cx="50%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#82C182" />
                  <stop offset="100%" stopColor="#529152" />
                </radialGradient>
                <radialGradient id="temporalGradient" cx="50%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#93D093" />
                  <stop offset="100%" stopColor="#63A063" />
                </radialGradient>
                <radialGradient id="parietalGradient" cx="50%" cy="70%" r="40%">
                  <stop offset="0%" stopColor="#DFCD77" />
                  <stop offset="100%" stopColor="#AF9D57" />
                </radialGradient>
                <radialGradient id="occipitalGradient" cx="50%" cy="80%" r="30%">
                  <stop offset="0%" stopColor="#DF9696" />
                  <stop offset="100%" stopColor="#AF6666" />
                </radialGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feComposite in="SourceGraphic" in2="coloredBlur" operator="over"/>
                </filter>
              </defs>
              
              {/* Frontal lobe */}
              <motion.path 
                d="M30,30 Q50,15 70,30 Q60,40 50,40 Q40,40 30,30 Z"
                fill="url(#frontalGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity },
                  filter: { duration: 0.5 }
                }}
              />
              
              {/* Central region */}
              <motion.path 
                d="M30,30 Q40,40 50,40 Q60,40 70,30 Q75,45 75,50 Q70,60 50,60 Q30,60 25,50 Q25,45 30,30 Z"
                fill="url(#centralGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, delay: 0.5 },
                  filter: { duration: 0.5, delay: 0.1 }
                }}
              />
              
              {/* Temporal regions */}
              <motion.path 
                d="M25,50 Q20,55 30,65 Q40,60 30,60 Q25,55 25,50 Z"
                fill="url(#temporalGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, delay: 1 },
                  filter: { duration: 0.5, delay: 0.2 }
                }}
              />
              <motion.path 
                d="M75,50 Q80,55 70,65 Q60,60 70,60 Q75,55 75,50 Z"
                fill="url(#temporalGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, delay: 1 },
                  filter: { duration: 0.5, delay: 0.2 }
                }}
              />
              
              {/* Parietal region */}
              <motion.path 
                d="M30,65 Q50,70 70,65 Q60,75 50,75 Q40,75 30,65 Z"
                fill="url(#parietalGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, delay: 1.5 },
                  filter: { duration: 0.5, delay: 0.3 }
                }}
              />
              
              {/* Occipital region */}
              <motion.path 
                d="M40,75 Q50,75 60,75 Q55,85 50,85 Q45,85 40,75 Z"
                fill="url(#occipitalGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationStage >= 1 ? [0.8, 1, 0.8] : 0,
                  filter: animationStage >= 2 ? "url(#glow)" : "none"
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, delay: 2 },
                  filter: { duration: 0.5, delay: 0.4 }
                }}
              />
            </svg>
          </motion.div>
          
          {/* EEG signal traces - appears during electrode detection */}
          {animationStage >= 2 && (
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {[0, 1, 2].map((index) => (
                  <motion.path
                    key={`signal-${index}`}
                    d={generateRandomSignal()}
                    fill="none"
                    stroke={index === 0 ? "#38bdf8" : index === 1 ? "#8b5cf6" : "#4ade80"}
                    strokeWidth="0.2"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 0.6,
                      strokeDashoffset: [0, -100]
                    }}
                    transition={{ 
                      pathLength: { duration: 1, delay: 0.2 * index },
                      opacity: { duration: 0.5, delay: 0.2 * index },
                      strokeDashoffset: { 
                        duration: 10, 
                        repeat: Infinity, 
                        ease: "linear"
                      }
                    }}
                    style={{ 
                      strokeDasharray: "5,3",
                      transformOrigin: "center",
                      transform: `rotate(${120 * index}deg)`
                    }}
                  />
                ))}
              </svg>
            </div>
          )}
          
          {/* Electrodes - appear after brain regions */}
          {electrodes.map((electrode, index) => (
            <motion.div
              key={electrode.id}
              className="absolute flex items-center justify-center"
              style={{ 
                left: `${electrode.x}%`, 
                top: `${electrode.y}%`, 
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: animationStage >= 2 ? 1 : 0,
                scale: animationStage >= 2 ? 1 : 0,
              }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 + (index * 0.04)
              }}
            >
              <motion.div 
                className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-600 flex items-center justify-center z-10"
                animate={{ 
                  boxShadow: animationStage >= 3 
                    ? ['0 0 5px rgba(99, 102, 241, 0.8)', '0 0 15px rgba(99, 102, 241, 0.8)', '0 0 5px rgba(99, 102, 241, 0.8)'] 
                    : '0 0 0px rgba(99, 102, 241, 0)'
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <span className="text-[8px] md:text-[10px] text-white font-bold">{electrode.id}</span>
              </motion.div>
              
              {/* Electrode ring pulse effect */}
              {animationStage >= 2 && (
                <motion.div
                  className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full border border-indigo-400"
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.1 % 1
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Connection lines - appear with electrodes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {animationStage >= 3 && electrodes.map((electrode, index) => {
            // Connect electrodes to central point with interactive lines
            if (index % 2 !== 0) return null;
            
            return electrode.id !== 'Cz' ? (
              <motion.line
                key={`line-${electrode.id}`}
                x1={electrode.x}
                y1={electrode.y}
                x2="50"
                y2="50"
                stroke="#4f46e5"
                strokeWidth="0.5"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: 0.6, 
                  pathLength: 1,
                  stroke: ['#4f46e5', '#38bdf8', '#4f46e5']
                }}
                transition={{ 
                  pathLength: { duration: 0.7, delay: index * 0.05 },
                  opacity: { duration: 0.5, delay: index * 0.05 },
                  stroke: { duration: 3, repeat: Infinity }
                }}
                style={{
                  filter: "drop-shadow(0 0 2px rgba(99, 102, 241, 0.6))"
                }}
              />
            ) : null;
          })}
        </svg>
      </div>
      
      {/* Data processing indicators */}
      <div className="mt-8 max-w-md w-full">
        <motion.div 
          className="w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationStage >= 0 ? 1 : 0,
            y: animationStage >= 0 ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-blue-400 font-mono">
              {animationStage < 1 && "INITIALIZING SCAN"}
              {animationStage === 1 && "MAPPING NEURAL REGIONS"}
              {animationStage === 2 && "DETECTING EEG CHANNELS"}
              {animationStage === 3 && "SYNCHRONIZING NEURAL NET"}
              {animationStage >= 4 && "COMPLETE"}
            </h3>
            <div className="text-blue-300 text-sm font-mono">
              {animationStage * 25}%
            </div>
          </div>
          
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-600 to-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${animationStage * 25}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Status indicators */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "REGION MAPPING", stage: 1 },
              { label: "ELECTRODE DETECTION", stage: 2 },
              { label: "NEURAL SYNC", stage: 3 },
              { label: "DATA VALIDATION", stage: 4 }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="flex items-center"
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: animationStage >= item.stage ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  animationStage >= item.stage 
                    ? 'bg-green-500' 
                    : animationStage === item.stage - 1 
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-gray-600'
                }`} />
                <div className="text-xs font-mono text-gray-300">
                  {item.label}
                  {animationStage === item.stage - 1 && (
                    <span className="text-blue-400 ml-2 animate-pulse">...</span>
                  )}
                  {animationStage >= item.stage && (
                    <span className="text-green-400 ml-2">OK</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Simulated console output */}
      <motion.div 
        className="mt-4 w-full max-w-md bg-gray-900 border border-gray-800 rounded text-xs font-mono text-green-400 p-2 h-16 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animationStage >= 1 ? 1 : 0, y: animationStage >= 1 ? 0 : 20 }}
        transition={{ duration: 0.4 }}
      >
        {animationStage >= 1 && (
          <div className="animate-typing">
            <div className="mb-1"> Initializing neural preprocessing...</div>
            {animationStage >= 2 && (
              <div className="mb-1">Loading EEG channel configuration...</div>
            )}
            {animationStage >= 3 && (
              <div className="mb-1"> Generating electrode map from EDF data...</div>
            )}
            {animationStage >= 4 && (
              <div className="text-blue-400"> Ready for electrode selection.</div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ElectrodeAnimation;