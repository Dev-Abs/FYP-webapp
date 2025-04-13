import React, { useEffect, useState } from "react";

const ResultsOverlayElements = () => {
  const [timeDisplay, setTimeDisplay] = useState("");
  const [dataMarkups, setDataMarkups] = useState([]);
  
  useEffect(() => {
    // Update time display
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTimeDisplay(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Generate data markups for professional look
    const generateDataMarkups = () => {
      const markups = [];
      
      // Analysis metadata boxes in fixed positions
      const metadataBoxes = [
        {
          id: 'system-status',
          position: { top: '10px', right: '10px' },
          content: `
            <div class="data-block-title">SYSTEM STATUS</div>
            <div class="data-line">ACTIVE SCAN: ${Math.random() > 0.5 ? 'COMPLETE' : 'IN PROGRESS'}</div>
            <div class="data-line">MEMORY: ${Math.floor(Math.random() * 90) + 10}% AVAILABLE</div>
            <div class="data-line">UPTIME: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m</div>
            <div class="data-line">SIGNAL: <span class="signal-good">OPTIMAL</span></div>
          `
        },
        {
          id: 'analysis-metrics',
          position: { bottom: '10px', left: '10px' },
          content: `
            <div class="data-block-title">ANALYSIS METRICS</div>
            <div class="data-line">SENSITIVITY: ${(Math.random() * 0.2 + 0.8).toFixed(2)}</div>
            <div class="data-line">SPECIFICITY: ${(Math.random() * 0.2 + 0.8).toFixed(2)}</div>
            <div class="data-line">ACCURACY: ${(Math.random() * 0.15 + 0.85).toFixed(2)}</div>
            <div class="data-line">CONFIDENCE: ${(Math.random() * 0.1 + 0.9).toFixed(2)}</div>
          `
        }
      ];
      
      markups.push(...metadataBoxes);
      
      // Technical data snippets floating around
      const dataSnippets = [
        'ALPHA WAVE: 8-12 Hz',
        'BETA WAVE: 12-30 Hz',
        'THETA WAVE: 4-8 Hz',
        'DELTA WAVE: 0.5-4 Hz',
        'GAMMA WAVE: 30-100 Hz',
        'SNR: 32.6 dB',
        'SAMPLING: 256 Hz',
        'FILTERING: APPLIED',
        'NORMALIZATION: COMPLETE',
        'ANOMALY DETECTION: ENABLED',
      ];
      
      // Create floating data snippets
      for (let i = 0; i < 8; i++) {
        markups.push({
          id: `floating-data-${i}`,
          position: {
            top: `${15 + Math.random() * 70}%`,
            left: `${Math.random() * 80}%`
          },
          content: dataSnippets[i % dataSnippets.length],
          isFloating: true,
          delay: i * 0.5
        });
      }
      
      return markups;
    };
    
    setDataMarkups(generateDataMarkups());
    
    // Clean up intervals
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  
  return (
    <div className="results-professional-overlay">
      {/* Grain texture overlay */}
      <div className="grain-overlay"></div>
      
      {/* Vignette effect */}
      <div className="vignette-overlay"></div>
      
      {/* Time display in corner */}
      <div className="time-display">
        {timeDisplay}
        <div className="time-display-label">SYSTEM TIME</div>
      </div>
      
      {/* Data blocks and floating elements */}
      {dataMarkups.map((markup) => (
        <div 
          key={markup.id}
          className={markup.isFloating ? "floating-data" : "data-block"}
          style={{
            ...markup.position,
            position: 'absolute',
            animationDelay: markup.delay ? `${markup.delay}s` : '0s'
          }}
        >
          {markup.isFloating ? (
            <span>{markup.content}</span>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: markup.content }} />
          )}
        </div>
      ))}
      
      {/* Status indicators */}
      <div className="status-indicator status-active" style={{ top: '10px', left: '10px' }}></div>
      <div className="status-indicator status-processing" style={{ top: '10px', left: '20px' }}></div>
      <div className="status-indicator status-standby" style={{ top: '10px', left: '30px' }}></div>
      
      {/* Add neural activity indicators */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`neural-dot-${i}`}
          className="neural-activity-indicator"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default ResultsOverlayElements;