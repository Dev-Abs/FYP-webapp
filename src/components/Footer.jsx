import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Brain, Users, BookOpen, MessageCircle } from "lucide-react";

function Footer() {
  const [hovered, setHovered] = useState(null);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 border-t border-gray-800 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
        </svg>
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
      </div>
      
      {/* Neural Network Animation (subtle background effect) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              whileInView={{ rotate: 0, scale: 1 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
            >
              <Brain className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
                NeuroCare
              </h2>
              <p className="text-xs text-gray-400">Advanced EEG Analysis</p>
            </div>
          </div>
          
          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full md:w-auto"
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-1 rounded-lg flex">
              <input 
                type="email" 
                placeholder="Subscribe to our newsletter" 
                className="bg-transparent border-none text-gray-300 px-4 py-2 focus:outline-none w-full md:w-64"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                Subscribe
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-semibold text-white relative inline-block"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group"
              whileHover={{ x: 5 }}
            >
              <a 
                href="mailto:support@neurocare.ai" 
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
                  <Mail className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Us</p>
                  <p className="text-sm">support@neurocare.ai</p>
                </div>
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
                  <Phone className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call Us</p>
                  <p className="text-sm">+92 (303) 413-4453</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Visit Us</p>
                  <p className="text-sm">NUST College of E&ME, Rawalpindi</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold text-white relative inline-block"
            >
              Resources
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </motion.h3>
            
            <ul className="space-y-3">
              {[
                { icon: <BookOpen className="h-4 w-4" />, label: "Documentation" },
                { icon: <Users className="h-4 w-4" />, label: "Case Studies" },
                { icon: <BookOpen className="h-4 w-4" />, label: "Research Papers" },
                { icon: <MessageCircle className="h-4 w-4" />, label: "Blog" }
              ].map((item, idx) => (
                <motion.li 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <a 
                    href="#" 
                    className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors group"
                  >
                    <span className="mr-3 text-gray-600 group-hover:text-indigo-500 transition-colors">
                      {item.icon}
                    </span>
                    {item.label}
                    <motion.span 
                      animate={{ x: hovered === item.label ? 5 : 0 }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Products */}
          {/* <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-white relative inline-block"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </motion.h3>
            
            <ul className="space-y-3">
              {[
                "NeuroCare BrainScan™",
                "EEG Analyst Pro",
                "Neural Pattern Detector",
                "Mind-Tech API"
              ].map((item, idx) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <a 
                    href="#" 
                    className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors group"
                  >
                    <span className="relative w-2 h-2 mr-3">
                      <span className="absolute inset-0 rounded-full bg-gray-700 group-hover:bg-indigo-900 transition-colors"></span>
                      <span className={`absolute inset-0 rounded-full bg-indigo-500 transform scale-0 group-hover:scale-100 transition-transform duration-300`}></span>
                    </span>
                    {item}
                    <motion.span 
                      animate={{ x: hovered === item ? 5 : 0 }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div> */}
          
          {/* Legal & Social */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold text-white relative inline-block"
            >
              Connect With Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </motion.h3>
            
            <div className="flex flex-wrap gap-3">
              {[
                {
                  platform: 'LinkedIn',
                  url: 'https://linkedin.com/company/neurocare',
                  icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                },
                {
                  platform: 'GitHub',
                  url: 'https://github.com/neurocare',
                  icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                },
                {
                  platform: 'Twitter',
                  url: 'https://twitter.com/neurocare',
                  icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
                },
                {
                  platform: 'ResearchGate',
                  url: 'https://researchgate.net',
                  icon: 'M19.586 0c-2.593 0-4.707 2.139-4.707 4.76v14.48c0 2.621 2.114 4.76 4.707 4.76h.707c2.593 0 4.707-2.139 4.707-4.76V4.76C25 2.139 22.886 0 20.293 0h-.707zM15.73 0H4.707C2.114 0 0 2.139 0 4.76v14.48C0 21.861 2.114 24 4.707 24h1.451c2.593 0 4.707-2.139 4.707-4.76V4.76C10.865 2.139 8.75 0 6.158 0H4.953'
                }
              ].map(({ platform, url, icon }, index) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors relative group overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="sr-only">{platform}</span>
                  <svg className="h-5 w-5 fill-current text-gray-400 group-hover:text-white relative z-10 transition-colors" viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <h4 className="text-sm text-gray-300">Legal</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section with Certifications */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-8 mt-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-300">ISO 13485 Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-300">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-300">FDA Cleared</span>
              </div>
            </div> */}
            
            <p className="text-sm text-gray-500">
              © {currentYear} NeuroCare Technologies. All rights reserved.
            </p>
          </div>
          
          <p className="text-xs flex justify-center items-center text-gray-600 mt-4 text-center md:text-left">
            Advancing mental health diagnostics through AI-powered EEG analysis. Registered with Pakistan Medical Commission.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;