import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import CircularText from "./CircularText";

// Create a motion-enhanced Link component
const MotionLink = motion.create(RouterLink);

const Main = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen w-full overflow-x-hidden p-6 md:p-10">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.075)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-900/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-indigo-900/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto pt-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <CircularText
              text="NEURO*CARE*"
              onHover="speedUp"
              spinDuration={20}
              className="filter"
            />
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Advanced Mental Health Diagnostics
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 mt-4 text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Precise mental health monitoring through EEG technology and AI analysis
          </motion.p>
        </div>

        <div className="grid gap-4 md:gap-6 w-full">
          <Link
            heading="Home"
            subheading="Explore our platform and features"
            imgSrc="/home.png"
            href="/home"
          />
          <Link
            heading="Upload EEG"
            subheading="Analyze your EEG data"
            imgSrc="/upload.png"
            href="/uploadeeg"
          />
          <Link
            heading="Results"
            subheading="View your analysis history"
            imgSrc="/results.png"
            href="/results"
          />
          <Link
            heading="About"
            subheading="Learn more about our project"
            imgSrc="/about.png"
            href="/about"
          />
          <Link
            heading="We Care"
            subheading="Interactive mental wellbeing tools"
            imgSrc="/we-care.png"
            href="/wecare"
          />
          <Link
            heading="Set Server URL"
            subheading="Configure API connection settings"
            imgSrc="/url.png"
            href="/setserverurl"
          />
        </div>
        
        {/* Simple footer */}
        <div 
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>NeuroCare v1.0.0 | {new Date().getFullYear()} © All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  // Create motion values and springs for the image hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // These transforms determine the image's position based on the mouse movement
  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  // Update the motion values based on the current mouse position
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <MotionLink
      to={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group bg-gray-800/70 hover:bg-gray-800/90 rounded-lg p-4 flex items-center justify-between overflow-hidden relative transition-all duration-300 w-full border border-gray-700 hover:border-indigo-500/50"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -8 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.1,
          }}
          className="relative z-10 block text-2xl md:text-3xl font-semibold text-gray-200 transition-colors duration-300 group-hover:text-white"
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { x: 0 },
                whileHover: { x: 8 },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-1 block text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-5deg" },
          whileHover: { scale: 1, rotate: "0deg" },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-32 md:w-48 sm:h-28 sm:w-40 opacity-80"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: { x: "15%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 bg-indigo-600 rounded-full p-2 flex-shrink-0 ml-2"
      >
        <FiArrowRight className="text-lg text-white" />
      </motion.div>
    </MotionLink>
  );
};

export default Main;