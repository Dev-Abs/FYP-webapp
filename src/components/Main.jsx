import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import CircularText from "./CircularText";

// Create a motion-enhanced Link component
const MotionLink = motion.create(RouterLink);

const Home = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-indigo-950 min-h-screen w-full overflow-x-hidden p-6 md:p-10">
      
      <div className="relative z-10 max-w-6xl mx-auto pt-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <CircularText
              text="NEURO*CARE*"
              onHover="speedUp"
              spinDuration={20}
              className="filter drop-shadow-lg"
            />
          </div>
          <p className="text-indigo-200 mt-4 text-lg max-w-xl mx-auto px-4">
            Advanced mental health diagnostics with EEG technology
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 w-full">
          <Link
            heading="Home"
            subheading="Learn what we do here"
            imgSrc="home.png"
            href="/home"
          />
          <Link
            heading="Upload EEG"
            subheading="Upload your EEG for analysis"
            imgSrc="upload.png"
            href="/uploadeeg"
          />
          <Link
            heading="Results"
            subheading="View analysis history"
            imgSrc="results.png"
            href="/results"
          />
          <Link
            heading="About"
            subheading="Learn what we do here"
            imgSrc="about.png"
            href="/about"
          />
          <Link
            heading="We Care"
            subheading="Experience interactive neuro care"
            imgSrc="we-care.png"
            href="/wecare"
          />
          <Link
            heading="Set Server URL"
            subheading="Set the API URL for the server"
            imgSrc="url.png"
            href="/setserverurl"
          />
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
      className="group bg-gray-800/90 hover:bg-indigo-900/70 rounded-lg p-4 flex items-center justify-between overflow-hidden relative transition-all duration-300 w-full"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-2xl md:text-3xl font-bold text-gray-300 transition-colors duration-300 group-hover:text-white"
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-1 block text-sm text-gray-400 transition-colors duration-300 group-hover:text-indigo-200">
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
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-32 md:w-48 sm:h-28 sm:w-40"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 bg-indigo-600 rounded-full p-2 flex-shrink-0 ml-2"
      >
        <FiArrowRight className="text-xl text-white" />
      </motion.div>
    </MotionLink>
  );
};

export default Home;