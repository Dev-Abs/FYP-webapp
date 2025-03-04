import React, { useRef } from "react";
import { useAnimate } from "framer-motion";

const MouseWordTrail = ({ children, words, renderImageBuffer, rotationRange }) => {
    const [scope, animate] = useAnimate();
    const lastRenderPosition = useRef({ x: 0, y: 0 });
    const wordRenderCount = useRef(0);
  
    const handleMouseMove = (e) => {
      if (e.target.closest(".no-mouse-trail")) return;
      const { clientX, clientY } = e;
      const distance = calculateDistance(
        clientX,
        clientY,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      );
      if (distance >= renderImageBuffer) {
        lastRenderPosition.current.x = clientX;
        lastRenderPosition.current.y = clientY;
        renderNextWord();
      }
    };
  
    const calculateDistance = (x1, y1, x2, y2) => {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    };
  
    const renderNextWord = () => {
      const wordIndex = wordRenderCount.current % words.length;
      const selector = `[data-mouse-move-index="${wordIndex}"]`;
      const el = document.querySelector(selector);
      if (!el) return;
  
      el.style.top = `${lastRenderPosition.current.y}px`;
      el.style.left = `${lastRenderPosition.current.x}px`;
      el.style.zIndex = wordRenderCount.current.toString();
  
      const rotation = Math.random() * rotationRange;
      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -25%) scale(0.5) ${wordIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`}`,
            `translate(-50%, -50%) scale(1) ${wordIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`}`,
          ],
        },
        { type: "spring", damping: 15, stiffness: 200 }
      );
      animate(
        selector,
        { opacity: [1, 0] },
        { ease: "linear", duration: 0.5, delay: 2 }
      );
      wordRenderCount.current = wordRenderCount.current + 1;
    };
  
    return (
      <div ref={scope} className="relative" onMouseMove={handleMouseMove}>
        {children}
        {words.map((word, index) => (
          <span
            key={index}
            data-mouse-move-index={index}
            className="pointer-events-none absolute text-2xl font-bold text-white opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

export default MouseWordTrail;