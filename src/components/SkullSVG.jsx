import React from 'react';

const SkullSVG = ({ activeGroup, onGroupClick }) => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Base skull shape with slight gradient for depth */}
      <defs>
        <radialGradient id="skullGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: '#ffe8d6', stopOpacity: 1 }} />
          <stop offset="85%" style={{ stopColor: '#ffe0c9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffd4b8', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Shadow gradient for skull */}
        <radialGradient id="skullShadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="75%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: '#0002', stopOpacity: 0.5 }} />
        </radialGradient>
        
        {/* Subtle highlight for the top of the skull */}
        <radialGradient id="skullHighlight" cx="50%" cy="30%" r="40%" fx="50%" fy="20%">
          <stop offset="0%" style={{ stopColor: '#fff3', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      
      {/* Base skull shape - more realistic oval */}
      <ellipse cx="50" cy="50" rx="35" ry="40" fill="url(#skullGradient)" stroke="#d8c0ad" strokeWidth="0.5" />
      
      {/* Inner shadow for depth */}
      <ellipse cx="50" cy="50" rx="35" ry="40" fill="url(#skullShadow)" />
      
      {/* Subtle highlight */}
      <ellipse cx="50" cy="50" rx="32" ry="37" fill="url(#skullHighlight)" />

      {/* Frontal lobe region */}
      <path 
        d="M27,30 Q50,15 73,30 Q65,40 50,40 Q35,40 27,30 Z" 
        fill="#ACD1F0" 
        fillOpacity={activeGroup === 'frontal' ? 0.7 : 0.3} 
        stroke="#7A9CC2" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('frontal')}
        className="cursor-pointer"
      />
      
      {/* Central region */}
      <path 
        d="M27,30 Q35,40 50,40 Q65,40 73,30 Q78,45 78,50 Q65,60 50,60 Q35,60 22,50 Q22,45 27,30 Z" 
        fill="#A2E1A2" 
        fillOpacity={activeGroup === 'central' ? 0.7 : 0.3} 
        stroke="#7DB07D" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('central')}
        className="cursor-pointer"
      />
      
      {/* Temporal regions (left) */}
      <path 
        d="M22,50 Q18,55 30,65 Q35,60 35,60 Q25,55 22,50 Z" 
        fill="#B3F0B3" 
        fillOpacity={activeGroup === 'temporal' ? 0.7 : 0.3} 
        stroke="#8ABA8A" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('temporal')}
        className="cursor-pointer"
      />
      
      {/* Temporal regions (right) */}
      <path 
        d="M78,50 Q82,55 70,65 Q65,60 65,60 Q75,55 78,50 Z" 
        fill="#B3F0B3" 
        fillOpacity={activeGroup === 'temporal' ? 0.7 : 0.3} 
        stroke="#8ABA8A" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('temporal')}
        className="cursor-pointer"
      />
      
      {/* Parietal region */}
      <path 
        d="M30,65 Q50,72 70,65 Q60,75 50,75 Q40,75 30,65 Z" 
        fill="#FFED97" 
        fillOpacity={activeGroup === 'parietal' ? 0.7 : 0.3} 
        stroke="#D6C77D" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('parietal')}
        className="cursor-pointer"
      />
      
      {/* Occipital region */}
      <path 
        d="M40,75 Q50,77 60,75 Q55,87 50,87 Q45,87 40,75 Z" 
        fill="#FFB6B6" 
        fillOpacity={activeGroup === 'occipital' ? 0.7 : 0.3} 
        stroke="#D49595" 
        strokeWidth="0.5"
        onClick={() => onGroupClick('occipital')}
        className="cursor-pointer"
      />
      
      {/* Subtle contour lines for more realism */}
      <path d="M30,25 Q50,15 70,25" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.6" />
      <path d="M25,40 Q50,50 75,40" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.6" />
      <path d="M25,55 Q50,65 75,55" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.6" />
      <path d="M35,75 Q50,80 65,75" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.6" />
      
      {/* Face hint lines (very subtle) */}
      <path d="M44,35 Q50,38 56,35" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.4" />
      <path d="M45,40 Q50,47 55,40" fill="none" stroke="#d8c0ad" strokeWidth="0.3" strokeOpacity="0.3" />
    </svg>
  );
};

export default SkullSVG;