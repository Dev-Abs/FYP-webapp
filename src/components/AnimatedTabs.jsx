// AnimatedTabs.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const AnimatedTabs = ({ items }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  // Update isMobile state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // below md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate drag constraints for mobile sliding
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      setConstraints({ left: -(scrollWidth - containerWidth), right: 0 });
    }
  }, [isMobile, items]);

  // Generate proper paths based on item names
  const getPath = (item) => {
    if (item === "Home") return "/home";
    if (item === "Main") return "/";
    return `/${item.replace(" ", "").toLowerCase()}`;
  };

  return (
    <motion.ul
      ref={containerRef}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      drag={isMobile ? "x" : false}
      dragConstraints={isMobile ? constraints : {}}
      className="relative flex rounded-full border-2 border-gray-200 bg-white p-1 overflow-x-auto"
    >
      {items.map((item, index) => {
        const path = getPath(item);
        return (
          <Tab
            key={index}
            setPosition={setPosition}
            path={path}
            isMobile={isMobile}
          >
            {item}
          </Tab>
        );
      })}
      {/* Only show the animated cursor for non-mobile (hover) experience */}
      {!isMobile && <Cursor position={position} />}
    </motion.ul>
  );
};

const Tab = ({ children, setPosition, path, isMobile }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        if (!isMobile) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className="relative z-10 block flex-shrink-0"
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
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
      style={{
        transition:
          "opacity 0.25s, width 0.25s, left 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    />
  );
};
