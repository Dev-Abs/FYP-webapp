import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkullSVG from './SkullSVG';

const SelectedElectrodesDisplay = ({ selectedElectrodes = [], small = false, enhancedDisplay = false }) => {
  const [activeRegion, setActiveRegion] = useState(null);
  
  // Define all electrode groups with positions
  const electrodeGroups = {
    frontal: [
      { id: 'Fp1', x: '35%', y: '22%', color: '#ACD1F0' },
      { id: 'Fp2', x: '65%', y: '22%', color: '#ACD1F0' },
      { id: 'F7', x: '25%', y: '30%', color: '#ACD1F0' },
      { id: 'F3', x: '38%', y: '33%', color: '#ACD1F0' },
      { id: 'Fz', x: '50%', y: '33%', color: '#ACD1F0' },
      { id: 'F4', x: '62%', y: '33%', color: '#ACD1F0' },
      { id: 'F8', x: '75%', y: '30%', color: '#ACD1F0' },
    ],
    central: [
      { id: 'C3', x: '38%', y: '50%', color: '#A2E1A2' },
      { id: 'Cz', x: '50%', y: '50%', color: '#A2E1A2' },
      { id: 'C4', x: '62%', y: '50%', color: '#A2E1A2' },
    ],
    temporal: [
      { id: 'T3', x: '25%', y: '50%', color: '#B3F0B3' },
      { id: 'T4', x: '75%', y: '50%', color: '#B3F0B3' },
      { id: 'T5', x: '30%', y: '65%', color: '#B3F0B3' },
      { id: 'T6', x: '70%', y: '65%', color: '#B3F0B3' },
    ],
    parietal: [
      { id: 'P3', x: '38%', y: '65%', color: '#FFED97' },
      { id: 'Pz', x: '50%', y: '65%', color: '#FFED97' },
      { id: 'P4', x: '62%', y: '65%', color: '#FFED97' },
    ],
    occipital: [
      { id: 'O1', x: '40%', y: '80%', color: '#FFB6B6' },
      { id: 'O2', x: '60%', y: '80%', color: '#FFB6B6' },
    ],
  };

  // Flatten electrode groups into a single array
  const allElectrodes = Object.values(electrodeGroups).flat();

  // Count selected electrodes in each region
  const regionCounts = Object.keys(electrodeGroups).reduce((acc, region) => {
    const regionElectrodes = electrodeGroups[region].map(e => e.id);
    const selected = regionElectrodes.filter(id => selectedElectrodes.includes(id));
    acc[region] = {
      count: selected.length,
      total: regionElectrodes.length,
      percentage: (selected.length / regionElectrodes.length) * 100,
      color: electrodeGroups[region][0].color
    };
    return acc;
  }, {});

  // Calculate scores for visualization
  const totalSelected = selectedElectrodes.length;
  const coverage = Math.round((totalSelected / allElectrodes.length) * 100);
  
  return (
    <div className="rounded-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Enhanced skull visualization */}
        <div className={`relative ${small ? 'w-40 h-40' : 'w-60 h-60'} mx-auto`}>
          {/* Brain visualization with glowing effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-80"></div>
            
            {/* Brain regions */}
            {Object.keys(regionCounts).map(region => {
              const count = regionCounts[region];
              if (count.count === 0) return null;
              
              const positions = {
                frontal: { x: '50%', y: '25%' },
                central: { x: '50%', y: '50%' },
                temporal: { x: '25%', y: '50%' },
                parietal: { x: '50%', y: '65%' },
                occipital: { x: '50%', y: '80%' }
              };
              
              if (!positions[region]) return null;
              
              return (
                <motion.div 
                  key={region}
                  className="absolute rounded-full opacity-20"
                  style={{
                    background: count.color,
                    left: positions[region].x,
                    top: positions[region].y,
                    width: `${Math.max(30, count.percentage * 0.7)}%`,
                    height: `${Math.max(30, count.percentage * 0.7)}%`,
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              );
            })}
            
            <div className="absolute inset-0">
              <SkullSVG 
                activeGroup={activeRegion} 
                onGroupClick={() => {}} 
              />
            </div>
          </div>
          
          {/* Neural network-like connections */}
          {selectedElectrodes.length > 1 && enhancedDisplay && (
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              {/* Connection lines between electrodes */}
              {selectedElectrodes.map((id, idx) => {
                if (idx === 0 || idx > 5) return null; // Limit lines for clarity
                
                const electrode = allElectrodes.find(e => e.id === id);
                const prevElectrode = allElectrodes.find(e => e.id === selectedElectrodes[idx-1]);
                
                if (!electrode || !prevElectrode) return null;
                
                // Extract numeric values from percentage strings
                const x1 = parseFloat(prevElectrode.x);
                const y1 = parseFloat(prevElectrode.y);
                const x2 = parseFloat(electrode.x);
                const y2 = parseFloat(electrode.y);
                
                return (
                  <motion.line
                    key={`${prevElectrode.id}-${electrode.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(99, 102, 241, 0.4)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 0.7,
                      strokeDashoffset: [0, -10]
                    }}
                    transition={{ 
                      pathLength: { duration: 1.5, delay: 0.5 },
                      opacity: { duration: 0.5 },
                      strokeDashoffset: { 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear"
                      }
                    }}
                    style={{ strokeDasharray: "3,2" }}
                  />
                );
              })}
            </svg>
          )}
          
          {/* Render selected electrodes with glowing effect */}
          {allElectrodes.map((electrode) => {
            if (!selectedElectrodes.includes(electrode.id)) return null;
            
            return (
              <motion.div
                key={electrode.id}
                className={`absolute ${
                  enhancedDisplay 
                    ? 'bg-indigo-600 shadow-lg shadow-indigo-900/30' 
                    : 'bg-indigo-600'
                } text-white font-bold rounded-full flex items-center justify-center
                       ${small ? 'w-5 h-5 text-[8px]' : 'w-7 h-7 text-xs'}`}
                style={{
                  left: electrode.x,
                  top: electrode.y,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: enhancedDisplay ? '0 0 12px rgba(79, 70, 229, 0.6)' : '0 0 8px rgba(79, 70, 229, 0.5)'
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  boxShadow: enhancedDisplay ? ['0 0 8px rgba(79, 70, 229, 0.5)', '0 0 15px rgba(79, 70, 229, 0.7)', '0 0 8px rgba(79, 70, 229, 0.5)'] : undefined
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  delay: Math.random() * 0.3,
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                onMouseEnter={() => setActiveRegion(
                  Object.keys(electrodeGroups).find(key => 
                    electrodeGroups[key].some(e => e.id === electrode.id)
                  )
                )}
                onMouseLeave={() => setActiveRegion(null)}
              >
                {electrode.id}
                
                {/* Pulse effect for enhanced display */}
                {enhancedDisplay && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-indigo-400"
                    animate={{ 
                      scale: [1, 1.7, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced electrode stats */}
        <div className="flex-1 flex flex-col justify-center">
          {selectedElectrodes.length === 0 ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-gray-800/60 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No electrodes selected</p>
              {enhancedDisplay && !small && (
                <p className="text-gray-500 text-xs mt-1">Using default configuration (all electrodes)</p>
              )}
            </div>
          ) : (
            <>
              {/* Total coverage */}
              <div className={`mb-3 ${small ? 'hidden' : ''}`}>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Selected:</span>
                  <span className="font-medium">{selectedElectrodes.length} / {allElectrodes.length}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${enhancedDisplay ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : 'bg-indigo-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedElectrodes.length / allElectrodes.length) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
              
              {/* Per region stats with enhanced visualization */}
              <div className="space-y-2">
                {Object.entries(regionCounts).map(([region, data]) => {
                  // Skip empty regions in small view
                  if (small && data.count === 0) return null;
                  
                  return (
                    <div 
                      key={region} 
                      className="hover:bg-gray-800/50 rounded transition-colors p-1"
                      onMouseEnter={() => setActiveRegion(region)}
                      onMouseLeave={() => setActiveRegion(null)}
                    >
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: data.color, 
                              opacity: 0.8 
                            }} 
                          />
                          <span className="capitalize">{region}</span>
                        </div>
                        <span>{data.count} / {data.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                        <motion.div
                          className={`h-full ${enhancedDisplay && data.count > 0 ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : ''}`}
                          style={{ 
                            backgroundColor: enhancedDisplay ? undefined : data.color,
                            boxShadow: enhancedDisplay && data.count > 0 ? '0 0 5px rgba(99, 102, 241, 0.5)' : 'none'
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${data.percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + Object.keys(regionCounts).indexOf(region) * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Electrode ID chips */}
              {(!small || enhancedDisplay) && selectedElectrodes.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {selectedElectrodes.sort().map(id => {
                      const region = Object.keys(electrodeGroups).find(key => 
                        electrodeGroups[key].some(e => e.id === id)
                      );
                      
                      return (
                        <span 
                          key={id} 
                          className="bg-gray-800/80 text-indigo-300 border border-indigo-900/40 px-1.5 py-0.5 rounded text-xs"
                          onMouseEnter={() => setActiveRegion(region)}
                          onMouseLeave={() => setActiveRegion(null)}
                        >
                          {id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Visualization data display */}
      {enhancedDisplay && !small && selectedElectrodes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-gray-800/60 p-3 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-1">{coverage}%</div>
            <div className="text-xs text-gray-400">Coverage</div>
          </div>
          
          <div className="rounded-lg bg-gray-800/60 p-3 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{selectedElectrodes.length}</div>
            <div className="text-xs text-gray-400">Electrodes</div>
          </div>
          
          <div className="rounded-lg bg-gray-800/60 p-3 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {Object.values(regionCounts).filter(r => r.count > 0).length}
            </div>
            <div className="text-xs text-gray-400">Regions</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedElectrodesDisplay;