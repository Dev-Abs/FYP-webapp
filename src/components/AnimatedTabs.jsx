import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const AnimatedTabs = ({ items }) => {
  const [position, setPosition] = useState({ 
    left: 0, 
    width: 0, 
    opacity: 0 
  });

  // Generate proper paths based on item names
  const getPath = (item) => {
    if (item === "Home") return "/";
    return `/${item.replace(" ", "").toLowerCase()}`;
  };

  return (
    <ul
      onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
      className="relative flex rounded-full border-2 border-gray-200 bg-white p-1"
    >
      {items.map((item, index) => {
        const path = getPath(item);
        return (
          <Tab 
            key={index} 
            setPosition={setPosition}
            path={path}
          >
            {item}
          </Tab>
        );
      })}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, path }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block"
    >
      <Link
        to={path}
        className="block px-3 py-1.5 text-xs uppercase text-gray-600 transition-colors
                   md:px-5 md:py-3 md:text-base hover:text-white mix-blend-difference"
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
      style={{
        transition: "opacity 0.25s, width 0.25s, left 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    />
  );
};