import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkullSVG from './SkullSVG';

const ElectrodeSelector = ({ onElectrodeSelection, onClose }) => {
  // Define all electrode groups with positions
  const electrodeGroups = {
    frontal: [
      { id: 'Fp1', x: '35%', y: '22%', color: '#ACD1F0' }, // Light blue
      { id: 'Fp2', x: '65%', y: '22%', color: '#ACD1F0' },
      { id: 'F7', x: '25%', y: '30%', color: '#ACD1F0' },
      { id: 'F3', x: '38%', y: '33%', color: '#ACD1F0' },
      { id: 'Fz', x: '50%', y: '33%', color: '#ACD1F0' },
      { id: 'F4', x: '62%', y: '33%', color: '#ACD1F0' },
      { id: 'F8', x: '75%', y: '30%', color: '#ACD1F0' },
    ],
    central: [
      { id: 'C3', x: '38%', y: '50%', color: '#A2E1A2' }, // Light green
      { id: 'Cz', x: '50%', y: '50%', color: '#A2E1A2' },
      { id: 'C4', x: '62%', y: '50%', color: '#A2E1A2' },
    ],
    temporal: [
      { id: 'T3', x: '25%', y: '50%', color: '#B3F0B3' }, // Pastel green
      { id: 'T4', x: '75%', y: '50%', color: '#B3F0B3' },
      { id: 'T5', x: '30%', y: '65%', color: '#B3F0B3' },
      { id: 'T6', x: '70%', y: '65%', color: '#B3F0B3' },
    ],
    parietal: [
      { id: 'P3', x: '38%', y: '65%', color: '#FFED97' }, // Light yellow
      { id: 'Pz', x: '50%', y: '65%', color: '#FFED97' },
      { id: 'P4', x: '62%', y: '65%', color: '#FFED97' },
    ],
    occipital: [
      { id: 'O1', x: '40%', y: '80%', color: '#FFB6B6' }, // Light red
      { id: 'O2', x: '60%', y: '80%', color: '#FFB6B6' },
    ],
  };

  // Region descriptions for better context
  const regionDescriptions = {
    frontal: "Controls executive functions and decision-making",
    central: "Coordinates motor functions and sensory processing",
    temporal: "Processes auditory information and memory",
    parietal: "Integrates sensory information and spatial awareness",
    occipital: "Processes visual information"
  };

  // Flatten electrode groups into a single array
  const allElectrodes = Object.values(electrodeGroups).flat();

  // State for selected electrodes
  const [selectedElectrodes, setSelectedElectrodes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [sendToBackend, setSendToBackend] = useState(true);
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  // Generate simulated signal quality data for electrodes
  const [signalQuality] = useState(() => {
    const quality = {};
    allElectrodes.forEach(electrode => {
      // Random quality between 70-100%
      quality[electrode.id] = Math.floor(Math.random() * 30) + 70;
    });
    return quality;
  });

  // Effect to handle "Select All" state
  useEffect(() => {
    if (selectAll) {
      setSelectedElectrodes(allElectrodes.map(e => e.id));
    } else if (selectedElectrodes.length === allElectrodes.length) {
      // This prevents toggling individual electrodes from affecting the "Select All" checkbox
      // Only clear all when the "Select All" checkbox is explicitly unchecked
      if (!selectAll) {
        setSelectedElectrodes([]);
      }
    }
  }, [selectAll]);

  // Toggle an electrode selection
  const toggleElectrode = (id) => {
    setSelectedElectrodes(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id) 
        : [...prev, id]
    );
  };

  // Toggle an entire group
  const toggleGroup = (groupName) => {
    const groupIds = electrodeGroups[groupName].map(e => e.id);
    const allGroupSelected = groupIds.every(id => selectedElectrodes.includes(id));
    
    if (allGroupSelected) {
      // Remove all from this group
      setSelectedElectrodes(prev => prev.filter(id => !groupIds.includes(id)));
    } else {
      // Add all from this group
      setSelectedElectrodes(prev => {
        const newSelection = [...prev];
        groupIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  // Submit the selection
  const handleSubmit = () => {
    onElectrodeSelection(selectedElectrodes, sendToBackend);
    onClose();
  };

  // Skip electrode selection
  const handleSkip = () => {
    onElectrodeSelection([], false);
    onClose();
  };

  // Signal quality indicator color
  const getQualityColor = (quality) => {
    if (quality >= 90) return "bg-green-500";
    if (quality >= 80) return "bg-green-400";
    if (quality >= 70) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClose()}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-11/12 max-w-5xl h-auto max-h-[90vh] overflow-auto shadow-2xl"
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with blue gradient line */}
        <div className="relative pb-1 mb-5">
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded absolute bottom-0"></div>
          <h2 className="text-3xl font-bold text-blue-400 mb-2">EEG Electrode Selection</h2>
          <p className="text-gray-300 max-w-3xl">
            Select which electrodes to include in your analysis. Different regions of the brain are associated with different functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Enhanced Brain Visualization */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="relative aspect-square mx-auto md:mx-0 max-w-[450px] w-full">
              {/* Improved skull visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-800/50 to-gray-900/80 shadow-inner"></div>
              
              <SkullSVG 
                activeGroup={activeGroup} 
                onGroupClick={(group) => {
                  toggleGroup(group);
                  setActiveGroup(group);
                }} 
              />

              {/* Group info overlay */}
              {activeGroup && (
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-medium text-blue-400 capitalize mb-1">{activeGroup} Region</div>
                  <p className="text-gray-300 text-xs">{regionDescriptions[activeGroup]}</p>
                </motion.div>
              )}

              {/* Overlay electrode buttons with improved visual appearance */}
              {allElectrodes.map((electrode) => (
                <button 
                  key={electrode.id}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                             transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200
                             border-2 hover:scale-110
                             ${selectedElectrodes.includes(electrode.id) 
                               ? 'bg-blue-600 text-white border-white' 
                               : `bg-gray-800 text-gray-200 border-gray-600 hover:border-blue-400`}`}
                  style={{ 
                    left: electrode.x, 
                    top: electrode.y,
                    boxShadow: selectedElectrodes.includes(electrode.id) 
                      ? '0 0 10px rgba(59, 130, 246, 0.8)' 
                      : 'none'
                  }}
                  onClick={() => toggleElectrode(electrode.id)}
                  onMouseEnter={() => setHoverInfo({ 
                    id: electrode.id, 
                    x: electrode.x, 
                    y: electrode.y,
                    quality: signalQuality[electrode.id]
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  {electrode.id}
                  
                  {/* Signal quality indicator */}
                  <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getQualityColor(signalQuality[electrode.id])}`}></div>
                </button>
              ))}

              {/* Enhanced electrode info popup */}
              <AnimatePresence>
                {hoverInfo && (
                  <motion.div
                    className="absolute bg-gray-900 border border-gray-700 text-white text-sm rounded-md px-3 py-2 z-20 shadow-lg"
                    style={{ 
                      left: hoverInfo.x, 
                      top: `calc(${hoverInfo.y} + 15px)`,
                      transform: 'translateX(-50%)'
                    }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{hoverInfo.id}</span>
                      <div className="flex items-center ml-2">
                        <div className={`w-2 h-2 rounded-full ${getQualityColor(hoverInfo.quality)} mr-1`}></div>
                        <span className="text-xs">{hoverInfo.quality}% signal</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Click to {selectedElectrodes.includes(hoverInfo.id) ? 'remove' : 'select'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Improved Controls */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
                Brain Regions
              </h3>
              <div className="space-y-2">
                {Object.keys(electrodeGroups).map((groupName) => {
                  const electrodes = electrodeGroups[groupName];
                  const groupColor = electrodes[0].color;
                  const allSelected = electrodes.every(e => selectedElectrodes.includes(e.id));
                  const someSelected = electrodes.some(e => selectedElectrodes.includes(e.id));
                  const selectedCount = electrodes.filter(e => selectedElectrodes.includes(e.id)).length;
                  
                  return (
                    <div 
                      key={groupName}
                      className={`group flex items-center p-2 rounded-lg cursor-pointer transition-all
                                ${allSelected 
                                  ? 'bg-blue-900/30 border border-blue-700' 
                                  : someSelected 
                                    ? 'bg-gray-700/50 border border-gray-600' 
                                    : 'bg-gray-800 border border-transparent hover:bg-gray-700/50 hover:border-gray-600'}`}
                      onClick={() => toggleGroup(groupName)}
                      onMouseEnter={() => setActiveGroup(groupName)}
                      onMouseLeave={() => setActiveGroup(null)}
                    >
                      <div className="flex items-center justify-center w-5 h-5 mr-2">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 rounded accent-blue-500"
                          checked={allSelected}
                          onChange={() => toggleGroup(groupName)}
                        />
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: groupColor, opacity: 0.9 }}
                      ></div>
                      <span className="text-gray-200 capitalize">{groupName}</span>
                      
                      {/* Selection progress */}
                      <div className="ml-auto flex items-center">
                        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden mr-2">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${(selectedCount / electrodes.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {selectedCount}/{electrodes.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div 
                  className="flex items-center p-2 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700/70 border border-gray-700" 
                  onClick={() => setSelectAll(!selectAll)}
                >
                  <div className="flex items-center justify-center w-5 h-5 mr-2">
                    <input 
                      type="checkbox"
                      className="w-4 h-4 rounded accent-blue-500"
                      checked={selectAll}
                      onChange={() => setSelectAll(!selectAll)}
                    />
                  </div>
                  <span className="text-gray-200 font-medium">Select All Electrodes</span>
                  
                  <div className="ml-auto flex items-center">
                    <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${(selectedElectrodes.length / allElectrodes.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {selectedElectrodes.length}/{allElectrodes.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4 flex-grow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-blue-400 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Selected Electrodes
                </h3>
                {selectedElectrodes.length > 0 && (
                  <button 
                    className="text-xs text-red-400 hover:text-red-300"
                    onClick={() => setSelectedElectrodes([])}
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="bg-gray-900 rounded-lg p-3 min-h-[100px] max-h-[160px] overflow-auto border border-gray-700">
                {selectedElectrodes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedElectrodes.map(id => {
                      const quality = signalQuality[id];
                      
                      return (
                        <span 
                          key={id} 
                          className="bg-blue-900/60 text-white px-2 py-1 rounded-md text-sm flex items-center border border-blue-800"
                        >
                          <div className="flex items-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${getQualityColor(quality)} mr-1`}></div>
                            <span>{id}</span>
                          </div>
                          <button 
                            className="ml-1.5 text-blue-200 hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleElectrode(id);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">No electrodes selected</p>
                  </div>
                )}
              </div>
              
              {/* Signal quality legend */}
              <div className="flex justify-end mt-2">
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Excellent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                    <span>Good</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                    <span>Fair</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                    <span>Poor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer controls */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="send-to-backend" 
                    className="w-4 h-4 rounded accent-blue-500 mr-2"
                    checked={sendToBackend}
                    onChange={() => setSendToBackend(!sendToBackend)}
                  />
                  <label htmlFor="send-to-backend" className="text-gray-300 text-sm cursor-pointer flex items-center">
                    <span>Send selection to analysis model</span>
                    <div className="ml-2 group relative">
                      <svg className="w-4 h-4 text-gray-500 hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-xs text-gray-300 p-2 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Selecting specific electrodes can improve analysis accuracy for targeted brain regions
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  className="py-2 px-4 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={handleSkip}
                >
                  Skip Selection
                </button>
                
                <button
                  className={`py-2 px-6 rounded-lg text-white font-medium transition-colors 
                            ${selectedElectrodes.length === 0 
                              ? 'bg-gray-600 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-500'}`}
                  onClick={handleSubmit}
                  disabled={selectedElectrodes.length === 0}
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ElectrodeSelector;