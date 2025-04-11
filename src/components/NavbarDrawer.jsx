import React, { useState, useEffect, useRef } from "react";
import { useDragControls, useMotionValue, useAnimate, motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import Navbar from "./Navbar";
import WellnessGame from "./WellnessGame";
import { NavbarContext } from "./NavbarContext";
import { useLocation } from "react-router-dom";

export const NavbarDrawer = () => {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNavigateButton, setShowNavigateButton] = useState(true);
  const [activeTab, setActiveTab] = useState("navbar"); // navbar or wellness
  const location = useLocation();
  
  // Reset tab when path changes
  useEffect(() => {
    setActiveTab("navbar");
  }, [location.pathname]);

  // Show tooltip after a delay when user is inactive
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      
      const clearTooltip = () => setShowTooltip(false);
      window.addEventListener('click', clearTooltip);
      window.addEventListener('scroll', clearTooltip);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('click', clearTooltip);
        window.removeEventListener('scroll', clearTooltip);
      };
    } else {
      setShowTooltip(false);
    }
  }, [open]);

  // Handle automatic wellness tab activation for relevant routes
  useEffect(() => {
    if (open && location.pathname === "/game") {
      setActiveTab("wellness");
    }
  }, [open, location.pathname]);

  // Context value for sharing drawer state
  const contextValue = {
    navbarDrawerOpen: open,
    setNavbarDrawerOpen: setOpen,
    activeTab,
    setActiveTab
  };

  return (
    <NavbarContext.Provider value={contextValue}>
      {/* Open Navbar Button with floating tooltip */}
      {!open && showNavigateButton && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <AnimatePresence>
            {showTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg"
              >
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-indigo-600"></div>
                Click to navigate
              </motion.div>
            )}
          </AnimatePresence>
          <SpotlightNavigateButton
            onClick={() => {
              setOpen(true);
              setShowNavigateButton(false);
            }}
          />
        </div>
      )}
      <BottomNavbarDrawer
        open={open}
        setOpen={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setShowNavigateButton(true);
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {activeTab === "navbar" ? (
          <Navbar inDrawer={true} />
        ) : (
          <WellnessGame onClose={() => setActiveTab("navbar")} />
        )}
      </BottomNavbarDrawer>
    </NavbarContext.Provider>
  );
};

const SpotlightNavigateButton = ({ onClick }) => {
  const btnRef = useRef(null);
  const glowRef = useRef(null);
  const [active, setActive] = useState(false);
  const [animateAttention, setAnimateAttention] = useState(false);

  // Enhanced spotlight effect with glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!btnRef.current || !glowRef.current) return;
      
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`;
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`;
      }
    };

    const currentBtn = btnRef.current;
    if (currentBtn) {
      currentBtn.addEventListener("mousemove", handleMouseMove);
      currentBtn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentBtn) {
        currentBtn.removeEventListener("mousemove", handleMouseMove);
        currentBtn.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Detect proximity to bottom of screen
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      const threshold = 180; // pixels from bottom
      if (e.clientY > window.innerHeight - threshold) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  // Occasional attention animation for discovery
  useEffect(() => {
    const timer = setInterval(() => {
      // 20% chance of animating every 30 seconds if not already active
      if (Math.random() < 0.2 && !active) {
        setAnimateAttention(true);
        setTimeout(() => setAnimateAttention(false), 2000);
      }
    }, 30000);
    
    return () => clearInterval(timer);
  }, [active]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      ref={btnRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-3 text-md font-medium text-white shadow-lg transition-all duration-300 ${
        active || animateAttention ? "shadow-indigo-500/30" : "filter md:blur-sm opacity-80" 
      }`}
      animate={animateAttention ? {
        y: [0, -15, 0],
        transition: { duration: 1, ease: "easeInOut" }
      } : {}}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" />
      <motion.div 
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{ 
          y: active || animateAttention ? [0, -2, 0] : 0
        }}
        transition={{ 
          repeat: active || animateAttention ? Infinity : 0, 
          duration: 1.5 
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
        </svg>
        <span>Navigate</span>
      </motion.div>
    </motion.button>
  );
};

const BottomNavbarDrawer = ({ open, setOpen, children, activeTab, setActiveTab }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const [touchStart, setTouchStart] = useState(null);
  const [isHighlightingWellness, setIsHighlightingWellness] = useState(false);
  
  // Highlight wellness tab periodically
  useEffect(() => {
    if (!open) return;
    
    const timer = setInterval(() => {
      if (activeTab !== "wellness" && Math.random() < 0.3) {
        setIsHighlightingWellness(true);
        setTimeout(() => setIsHighlightingWellness(false), 2000);
      }
    }, 15000);
    
    return () => clearInterval(timer);
  }, [open, activeTab]);

  const handleClose = async () => {
    // Enhanced closing animation
    animate(scope.current, { 
      backdropFilter: ["blur(8px)", "blur(0px)"],
      opacity: [1, 0] 
    }, { duration: 0.4 });
    
    const currentY = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", { 
      y: [currentY, height],
      boxShadow: ["0 -10px 25px -5px rgba(0,0,0,0.2)", "0 0px 0px 0px rgba(0,0,0,0)"]
    }, { duration: 0.5, ease: "easeInOut" });
    
    setOpen(false);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStart;
    
    if (deltaY > 0) { // Only allow dragging down
      y.set(deltaY);
      
      // Apply visual feedback
      const factor = 1 - Math.min(deltaY / 500, 0.5);
      const newScale = 1 - (1 - factor) * 0.05;
      if (document.getElementById("drawer-content")) {
        document.getElementById("drawer-content").style.transform = `scale(${newScale})`;
        document.getElementById("drawer-content").style.opacity = factor;
      }
    }
  };
  
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchY = e.changedTouches[0].clientY;
    const deltaY = touchY - touchStart;
    
    // Reset content scale
    if (document.getElementById("drawer-content")) {
      document.getElementById("drawer-content").style.transform = "";
      document.getElementById("drawer-content").style.opacity = "";
    }
    
    // Close if dragged down far enough
    if (deltaY > 100) {
      handleClose();
    } else {
      // Snap back
      animate("#drawer", { y: 0 }, { type: "spring", damping: 20 });
    }
    
    setTouchStart(null);
  };

  // Reset position when opening
  useEffect(() => {
    if (open) {
      y.set(0);
    }
  }, [open, y]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/40"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ 
              y: 0,
              boxShadow: "0 -10px 25px -5px rgba(0,0,0,0.2)" 
            }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 300
            }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-gradient-to-b from-gray-900 to-gray-950 border-t border-indigo-500/20"
            style={{ y }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: height }}
            dragElastic={0.2}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDrag={(_, info) => {
              // Add resistance as drawer is pulled down
              if (info.offset.y > 0) {
                const factor = 1 - Math.min(info.offset.y / 500, 0.5);
                const newScale = 1 - (1 - factor) * 0.05;
                if (document.getElementById("drawer-content")) {
                  document.getElementById("drawer-content").style.transform = `scale(${newScale})`;
                  document.getElementById("drawer-content").style.opacity = factor;
                }
              }
            }}
            onDragEnd={(_, info) => {
              // Reset content scale
              if (document.getElementById("drawer-content")) {
                document.getElementById("drawer-content").style.transform = "";
                document.getElementById("drawer-content").style.opacity = "";
              }
              
              // Close if dragged down far enough
              if (info.offset.y > 100 || info.velocity.y > 500) {
                handleClose();
              } else {
                // Snap back
                animate("#drawer", { y: 0 }, { type: "spring", damping: 20 });
              }
            }}
          >
            {/* Drawer header with tabs */}
            <div className="absolute left-0 right-0 top-0 z-10 flex flex-col items-center">
              {/* Drag handle */}
              <button
                onPointerDown={(e) => controls.start(e)}
                className="h-1.5 w-16 cursor-grab touch-none rounded-full bg-indigo-400/30 mt-2 mb-1 active:cursor-grabbing"
              ></button>
            </div>
            
            {/* Content with gentle fade in */}
            <motion.div 
              id="drawer-content"
              className="relative z-0 p-5 pt-16 overflow-auto"
              style={{ maxHeight: "calc(85vh - 60px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === "navbar" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === "navbar" ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarDrawer;