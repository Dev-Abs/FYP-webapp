import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarDrawer from "./NavbarDrawer";

const Home = () => {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <NavbarDrawer />
        <Hero />
        <Footer />
        {/* Animated Background Signal
          <motion.div className="absolute left-0 w-full h-full z-[-1] bg-signal" /> */}
      </div>
    </>
  );
};

export default Home;
