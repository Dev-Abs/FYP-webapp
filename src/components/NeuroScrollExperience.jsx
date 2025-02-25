import { ReactLenis } from "lenis/dist/lenis-react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { BrainCircuit } from "lucide-react"; // Install lucide-react for brain icon

export const NeuroScrollExperience = () => {
  return (
    <div className="bg-indigo-950">
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <NeuroNav />
        <NeuroHero />
        <ResearchTimeline />
      </ReactLenis>
    </div>
  );
};

const NeuroNav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white bg-indigo-900/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-indigo-300" />
        <span className="text-lg font-semibold">NeuroCare Analytics</span>
      </div>
      <button
        onClick={() => document.getElementById("research-timeline")?.scrollIntoView({ behavior: "smooth" })}
        className="flex items-center gap-1 text-sm text-indigo-200 hover:text-white transition-colors"
      >
        Research Timeline <FiArrowRight className="mt-0.5" />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const NeuroHero = () => {
  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
      <BrainScanVisual />
      <ParallaxNeuroImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-950/0 to-indigo-950" />
    </div>
  );
};

const BrainScanVisual = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  
  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(https://images.unsplash.com/photo-1611420618310-42b0d9e29476?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxNeuroImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/images/eeg-setup.jpg"
        alt="EEG equipment setup"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg shadow-xl"
      />
      <ParallaxImg
        src="/images/brain-activity.jpg"
        alt="Brain activity visualization"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg shadow-xl"
      />
      <ParallaxImg
        src="/images/medical-team.jpg"
        alt="Medical research team"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-lg shadow-xl"
      />
      <ParallaxImg
        src="/images/data-analysis.jpg"
        alt="Data analysis dashboard"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-lg shadow-xl"
      />
    </div>
  );
};

const ResearchTimeline = () => {
  return (
    <section id="research-timeline" className="mx-auto max-w-5xl px-4 py-48 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-indigo-50"
      >
        Research Milestones
      </motion.h1>
      <ResearchItem 
        title="Anxiety Detection Model" 
        date="Q3 2024" 
        details="Advanced neural network for anxiety pattern recognition"
      />
      <ResearchItem
        title="Depression Biomarkers"
        date="Q1 2025"
        details="Identification of EEG-based depression markers"
      />
      <ResearchItem
        title="Real-time Analysis"
        date="Q2 2025"
        details="Live EEG processing implementation"
      />
      <ResearchItem
        title="Clinical Trials"
        date="Q4 2025"
        details="Multi-center validation studies"
      />
    </section>
  );
};

const ResearchItem = ({ title, date, details }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-indigo-800 px-3 pb-9"
    >
      <div className="w-3/4">
        <p className="mb-1.5 text-xl text-indigo-50">{title}</p>
        <p className="text-sm text-indigo-300">{details}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5 text-end">
        <p className="text-sm font-medium text-indigo-400">{date}</p>
        <div className="flex items-center gap-1 text-indigo-500">
          <FiMapPin className="inline-block" />
          <span className="text-xs">Global Research</span>
        </div>
      </div>
    </motion.div>
  );
};

// Keep ParallaxImg component same as before, but update className with rounded edges


const ParallaxImg = ({ className, alt, src, start, end }) => {
    const ref = useRef(null);
  
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: [`${start}px end`, `end ${end * -1}px`],
    });
  
    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  
    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  
    return (
      <motion.img
        src={src}
        alt={alt}
        className={className}
        ref={ref}
        style={{ transform, opacity }}
      />
    );
  };
  
  const Schedule = () => {
    return (
      <section
        id="launch-schedule"
        className="mx-auto max-w-5xl px-4 py-48 text-white"
      >
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="mb-20 text-4xl font-black uppercase text-zinc-50"
        >
          Launch Schedule
        </motion.h1>
        <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
        <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
        <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
        <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
        <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
        <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
        <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
      </section>
    );
  };
  
  const ScheduleItem = ({ title, date, location }) => {
    return (
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
      >
        <div>
          <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
          <p className="text-sm uppercase text-zinc-500">{date}</p>
        </div>
        <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
          <p>{location}</p>
          <FiMapPin />
        </div>
      </motion.div>
    );
  };