import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

// Create a motion-enhanced Link component
const MotionLink = motion(RouterLink);

const Home = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">
          NeuroCare
        </h1>
        {/* <p className="text-lg text-neutral-300 mt-4">
          Explore our content using the links below.
        </p> */}
      </div>
      <div className="w-full max-w-5xl flex flex-col gap-8">
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
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
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
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
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
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
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
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </MotionLink>
  );
};

export default Home;
