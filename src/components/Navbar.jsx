
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTabs } from "./AnimatedTabs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); 
  const buttonRef = useRef(null); 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target) 
      ) {
        setIsMenuOpen(false); // Close the menu if click is outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); 
  }, []);

  return (
    <motion.nav
      className="bg-gray-900 fixed w-full z-20 top-0 start-0"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4  ">
        {/* Logo */}
        {/* <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-semibold dark:text-white">NeuroCare</span>
        </Link> */}
        {/* <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
        <img src="/logoo.png"
          className="h-14 w-24"
          alt="" />
        </Link> */}

        {/* Hamburger Button */}
        {/* <div className="flex items-center md:order-2">
          <motion.button
            className="rounded-2xl border-2 border-dashed hidden md:block border-blue-700 bg-primary px-4 py-2 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-lg dark:bg-primary dark:hover:bg-indigo-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button> */}

          {/* Hamburger Icon */}
          {/* <motion.button
            ref={buttonRef} 
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
            whileHover={{ scale: 1.1 }}
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </motion.button>
        </div> */}

        {/* Navigation Links */}
        {/* <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef} 
              className="items-center justify-between w-full md:flex md:w-auto md:order-1"
              id="navbar-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="flex flex-col p-4 md:flex-row md:space-x-8 bg-gray-50 dark:bg-gray-800 rounded-lg md:bg-transparent">
                {["Home", "Upload EEG", "Results", "About"].map((item, index) => (
                  <motion.li
                    key={index}
                    className="block py-2 px-3 rounded md:p-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item === "Home" ? (
                      <Link
                        to="/"
                        className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-indigo-300"
                      >
                        {item}
                      </Link>
                    ) : (
                      <Link
                        to={`/${item.replace(" ", "").toLowerCase()}`}
                        className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-indigo-300"
                      >
                        {item}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence> */}
        <AnimatedTabs items={["Home", "Upload EEG", "Results", "About", 'We Care']} />
        
        {/* <ul className="md:flex hidden p-4 md:flex-row md:space-x-8 bg-gray-50 dark:bg-gray-800 rounded-lg md:bg-transparent">
                {["Home", "Upload EEG", "Results", "About"].map((item, index) => (
                  <motion.li
                    key={index}
                    className="block py-2 px-3 rounded md:p-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {
                      item === "Home" ? (
                        <Link
                          to="/"
                          className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-indigo-300"
                        >
                          {item}
                        </Link>
                      ) : (
                        <Link
                          to={`/${item.replace(" ", "").toLowerCase()}`}
                          className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-indigo-300"
                        >
                          {item}
                        </Link>
                      )
                    }
                  </motion.li>
                ))}
              </ul> */}
      </div>
    </motion.nav>
  );
};

export default Navbar;
