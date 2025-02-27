import React, { useState, useEffect, useRef } from "react";
import { useDragControls, useMotionValue, useAnimate, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Navbar from "./Navbar"; // or your modified BottomNavbar component

export const NavbarDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Open Navbar Button – fixed at bottom when drawer is closed */}
      {!open && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <SpotlightNavigateButton onClick={() => setOpen(true)} />
        </div>
      )}
      <BottomNavbarDrawer open={open} setOpen={setOpen}>
        <Navbar />
      </BottomNavbarDrawer>
    </>
  );
};

const SpotlightNavigateButton = ({ onClick }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);
  const [active, setActive] = useState(false);

  // Spotlight effect on hover over the button
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;
      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
    };

    const currentBtn = btnRef.current;
    currentBtn.addEventListener("mousemove", handleMouseMove);
    currentBtn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentBtn.removeEventListener("mousemove", handleMouseMove);
      currentBtn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Listen for mouse movement over the window
  // and update "active" based on whether the cursor is near the bottom.
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      const threshold = 150; // pixels from bottom to "activate" the button
      if (e.clientY > window.innerHeight - threshold) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onClick}
      className={`relative w-full max-w-xs overflow-hidden rounded-lg bg-slate-950 px-14 py-3 text-md font-medium text-white transition-filter duration-300 ${
        active ? "" : "filter md:blur-sm"
      }`}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        Navigate
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full"
      />
    </motion.button>
  );
};

const BottomNavbarDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    // Fade out the overlay and slide down the drawer
    animate(scope.current, { opacity: [1, 0] });
    const currentY = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", { y: [currentY, height] });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/50"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl"
            style={{ y }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={() => {
              // If dragged down far enough, close the drawer
              if (y.get() >= 100) {
                handleClose();
              }
            }}
          >
            {/* (Optional) Drag handle */}
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center p-4">
              {/* Uncomment below if you wish to add a drag handle */}
              {/* <button
                onPointerDown={(e) => controls.start(e)}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button> */}
            </div>
            {/* Navbar Content */}
            <div className="relative z-0 p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default NavbarDrawer;
