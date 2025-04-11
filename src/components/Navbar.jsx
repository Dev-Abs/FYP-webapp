import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { AnimatedTabs } from "./AnimatedTabs";
import { NavbarContext } from "./NavbarContext";

const Navbar = ({ inDrawer = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setNavbarDrawerOpen } = useContext(NavbarContext) || {};

  // Define the navigation items
  const navItems = [
    { name: "Main", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Home", path: "/home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Upload EEG", path: "/uploadeeg", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
    { name: "Results", path: "/results", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { name: "About", path: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Wellness", path: "/wellness", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { name: "We Care", path: "/wecare", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }
  ];

  // Check if screen is mobile size
  useEffect(() => {
    if (inDrawer) return; // Skip this in drawer mode
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [inDrawer]);

  // Change navbar appearance on scroll
  useEffect(() => {
    if (inDrawer) return; // Skip this in drawer mode
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inDrawer]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle navigation within drawer
  const handleDrawerNavigation = () => {
    if (setNavbarDrawerOpen && inDrawer) {
      setNavbarDrawerOpen(false);
    }
  };

  // Conditional rendering for drawer vs normal navbar
  if (inDrawer) {
    return (
      <div className="py-2 mt-[-40px]">
        <h2 className="text-lg font-medium text-white mb-6 flex items-center ml-2">
          {/* <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-2"
          >
            <span className="text-white font-bold text-sm">NC</span>
          </motion.div> */}
          <span>Navigator</span>
        </h2>
        
        <div className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleDrawerNavigation}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-indigo-600/20 text-white border-l-2 border-indigo-500"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon}></path>
              </svg>
              <span>{item.name}</span>
              
              {item.name === "Wellness" && (
                <motion.span 
                  className="w-2 h-2 rounded-full bg-indigo-500 ml-auto"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              )}
            </Link>
          ))}
        </div>
        
        {/* Special wellness highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/30"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white font-medium">Wellness Center</h3>
            <motion.div 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </motion.div>
          </div>
          
          <p className="text-indigo-100 text-sm mb-3">Take a moment for yourself with our interactive wellness activities.</p>
          
          <Link
            to="/wellness"
            onClick={handleDrawerNavigation}
            className="flex items-center justify-center w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-2 px-4 rounded-lg shadow-md hover:shadow-indigo-600/20 transition-all duration-300"
          >
            <span className="mr-2">Open Wellness Space</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <motion.nav
        className={`fixed w-full z-30 transition-all duration-300 ${
          scrolled 
            ? "py-2 bg-gray-900/90 backdrop-blur-md shadow-lg" 
            : "py-4 bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center space-x-2"
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">NC</span>
              </motion.div>
              <span className="text-white font-semibold text-xl hidden sm:block">NeuroCare</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:block">
                <AnimatedTabs items={navItems.map(item => item.name)} />
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/wellness"
                  className="relative p-2 text-gray-300 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <motion.span 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </Link>
                
                <motion.button
                  onClick={toggleMobileMenu}
                  className="text-gray-200 focus:outline-none"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-8 h-8 flex flex-col justify-center items-center"
                    initial={false}
                    animate={mobileMenuOpen ? "open" : "closed"}
                  >
                    <motion.span
                      className="w-6 h-0.5 bg-gray-200 block mb-1.5"
                      variants={{
                        closed: { rotate: 0, translateY: 0 },
                        open: { rotate: 45, translateY: 6 }
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                    <motion.span
                      className="w-6 h-0.5 bg-gray-200 block mb-1.5"
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                    <motion.span
                      className="w-6 h-0.5 bg-gray-200 block"
                      variants={{
                        closed: { rotate: 0, translateY: 0 },
                        open: { rotate: -45, translateY: -6 }
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </motion.div>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-20 pt-16 bg-gray-900/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-6">
              <ul className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 text-lg py-3 px-4 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-indigo-600/30 text-white font-medium border-l-4 border-indigo-500"
                          : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon}></path>
                      </svg>
                      <span>{item.name}</span>
                      
                      {item.name === "Wellness" && (
                        <motion.span 
                          className="w-2 h-2 rounded-full bg-indigo-500 ml-auto"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              {/* Quick Access Wellness Button */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/30">
                  <h3 className="text-white font-medium mb-2">Wellness Center</h3>
                  <p className="text-indigo-100 text-sm mb-3">Take a moment for yourself with our interactive wellness activities.</p>
                  
                  <Link
                    to="/wellness"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg shadow-md hover:shadow-indigo-600/20 transition-all duration-300"
                  >
                    <span className="mr-2">Open Wellness Space</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;