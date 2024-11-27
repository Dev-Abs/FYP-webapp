import React from 'react'
import { motion } from "framer-motion";
import Hero from './Hero'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <Hero />
    <Footer />
          {/* Animated Background Signal
          <motion.div className="absolute left-0 w-full h-full z-[-1] bg-signal" /> */}
    </>
  )
}

export default Home
