import React, { useEffect, useState } from "react";

const ProfessionalElements = () => {
  const [dataBlocks, setDataBlocks] = useState([]);
  const [neuralDots, setNeuralDots] = useState([]);
  const [floatingLabels, setFloatingLabels] = useState([]);

  useEffect(() => {
    // Create data blocks
    const blocks = [];
    const blockContents = [
      {
        title: "SIGNAL PROCESSING",
        content: `FFT ANALYSIS\nALPHA: 8.34 Hz\nBETA: 15.67 Hz\nTHETA: 5.12 Hz\nDELTA: 1.88 Hz\nGAMMA: 31.25 Hz`
      },
      {
        title: "ELECTRODE STATUS",
        content: `FP1: OPTIMAL\nFP2: OPTIMAL\nF3: OPTIMAL\nF4: OPTIMAL\nC3: OPTIMAL\nCZ: CALIB..\nP3: OPTIMAL`
      },
      {
        title: "SYSTEM STATUS",
        content: `CPU: 18%\nMEMORY: 2.4GB\nFILTER: NOTCH 60Hz\nSAMPLE: 256Hz\nNOISE: 0.42µV`
      },
      {
        title: "DATA METRICS",
        content: `SNR: 28.6dB\nIMPEDANCE: LOW\nDRIFT: 0.01%\nQUALITY: 98.7%\nSTATUS: OPTIMAL`
      }
    ];

    // Position blocks at different corners/sides
    const positions = [
      { top: '20%', left: '10px' },
      { top: '20%', right: '10px' },
      { bottom: '15%', left: '10px' },
      { bottom: '15%', right: '10px' }
    ];

    blockContents.forEach((content, i) => {
      blocks.push({
        id: `data-block-${i}`,
        content: content,
        style: positions[i]
      });
    });

    setDataBlocks(blocks);

    // Create neural activity indicators
    const dots = [];
    for (let i = 0; i < 12; i++) {
      dots.push({
        id: `neural-dot-${i}`,
        style: {
          top: `${10 + Math.random() * 80}%`,
          left: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 3}s`
        }
      });
    }
    setNeuralDots(dots);

    // Create floating labels
    const labels = [
      { text: "THETA WAVES: 4-8Hz", delay: 0 },
      { text: "ALPHA WAVES: 8-13Hz", delay: 3 },
      { text: "BETA WAVES: 13-30Hz", delay: 6 },
      { text: "GAMMA WAVES: >30Hz", delay: 9 },
      { text: "DELTA WAVES: 0.5-4Hz", delay: 12 }
    ];

    const floatingElements = labels.map((label, i) => ({
      id: `floating-label-${i}`,
      text: label.text,
      style: {
        top: `${20 + i * 15}%`,
        left: `${45 + (i % 2 === 0 ? 10 : -10)}%`,
        animationDelay: `${label.delay}s`
      }
    }));

    setFloatingLabels(floatingElements);

    // Cleanup function (if needed)
    return () => {
      // Any cleanup code here
    };
  }, []);

  return (
    <div className="professional-overlay">
      {/* Grain overlay */}
      <div className="grain-overlay"></div>
      
      {/* Vignette effect */}
      <div className="vignette-overlay"></div>
      
      {/* Data blocks */}
      {dataBlocks.map(block => (
        <div 
          key={block.id} 
          className="data-block" 
          style={block.style}
        >
          <div className="data-block-title">{block.content.title}</div>
          <pre>{block.content.content}</pre>
        </div>
      ))}
      
      {/* Neural activity indicators */}
      {neuralDots.map(dot => (
        <div
          key={dot.id}
          className="neural-activity-indicator"
          style={dot.style}
        ></div>
      ))}
      
      {/* Floating labels */}
      {floatingLabels.map(label => (
        <div
          key={label.id}
          className="floating-element"
          style={label.style}
        >
          {label.text}
        </div>
      ))}
      
      {/* Status indicators */}
      <div className="status-indicator status-active" style={{ top: '30px', right: '30px' }}></div>
      <div className="status-indicator status-processing" style={{ top: '30px', right: '40px' }}></div>
      <div className="status-indicator status-standby" style={{ top: '30px', right: '50px' }}></div>
    </div>
  );
};

export default ProfessionalElements;