import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.8 },
    });
  }, [controls]);

  return (
    <section className="relative grid h-full md:min-h-screen w-full place-content-center overflow-hidden dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={controls}
        className="relative hidden md:block z-0 text-[25px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 md:text-[150px]"
      >
        NEUROCARE<span className="text-indigo-500">.</span>
      </motion.h2>
      {isMobile ? <SimpleTeamGrid /> : <Cards />}
    </section>
  );
};

// Enhanced mobile team grid with carousel-like scrolling
const SimpleTeamGrid = () => {
  return (
    <div className="relative z-10 px-2 overflow-hidden">
      {/* Horizontal scrollable container */}
      <div
        className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4 px-2">
          <TeamMember src="/asim.jpg" name="Asim" role="Research Engineer" />
          <TeamMember src="/khuzaim.jpg" name="Khuzaim" role="ML Engineer" />
          <TeamMember src="/ajay.jpg" name="Ajay Kumar" role="ML Engineer" />
          <TeamMember
            src="/abdullah-2.jpg"
            name="Abdullah"
            role="Web Developer"
          />
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="flex justify-center mt-2 space-x-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
        <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
        <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
        <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
      </div>
    </div>
  );
};

const TeamMember = ({ src, name, role }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] max-w-[280px] snap-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={src}
          alt={`Team member ${name}`}
          className="w-full h-auto object-cover rounded-lg shadow-sm transform transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-3 mt-3 text-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
        <h3 className="font-semibold text-base text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium mt-1">
          {role}
        </p>
      </div>
    </motion.div>
  );
};

// Original Cards component for desktop - unchanged
const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/ajay.jpg"
        alt="Team member Ajay"
        top="10%"
        left="10%"
        rotate="10deg"
        className="w-32 md:w-56"
        name="Ajay Kumar"
        role="ML Engineer"
      />
      <Card
        containerRef={containerRef}
        src="/abdullah-2.jpg"
        alt="Team member Abdullah"
        top="20%"
        left="20%"
        rotate="-10deg"
        className="w-24 md:w-48"
        name="Abdullah"
        role="Web Developer"
      />
      <Card
        containerRef={containerRef}
        src="/asim.jpg"
        alt="Team member Asim"
        top="30%"
        left="30%"
        rotate="5deg"
        className="w-40 md:w-64"
        name="Asim"
        role="Research Engineer"
      />
      <Card
        containerRef={containerRef}
        src="/khuzaim.jpg"
        alt="Team member Khuzaim"
        top="40%"
        left="40%"
        rotate="-5deg"
        className="w-36 md:w-60"
        name="Khuzaim"
        role="ML Engineer"
      />
    </div>
  );
};

// Original Card component - unchanged
const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  role,
  name,
}) => {
  const [zIndex, setZIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements h-[300px] absolute w-48 bg-white dark:bg-gray-800 p-2 pb-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300",
        isHovered ? "ring-2 ring-indigo-500 ring-opacity-50" : "",
        className
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.2 },
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg shadow-sm"
      />
      <div className="p-3 mt-2 text-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
        <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium mt-1">
          {role}
        </p>
      </div>
    </motion.div>
  );
};
