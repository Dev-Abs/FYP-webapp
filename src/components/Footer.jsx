// import React from "react";
// function Footer() {
//     return (
//       <footer className="bg-white border-t border-gray-200 py-10">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center justify-between">
//             {/* Contact Info */}
//             <div className="text-center lg:text-left">
//               <p className="text-sm font-semibold text-gray-900">
//                 Contact us at:{" "}
//                 <a href="mailto:neurocare@gmail.com" className="text-indigo-600">
//                   neurocare@gmail.com
//                 </a>
//               </p>
//               <p className="text-sm text-gray-500">Phone: +92 312 456 7890</p>
//             </div>
  
//             {/* Social Links */}
//             <div className="mt-4 lg:mt-0 flex space-x-6">
//               <a href="#" className="text-gray-500 hover:text-indigo-600">
//                 <span className="sr-only">Facebook</span>
//                 {/* Facebook Icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.3h-3.125v-3.625h3.125v-2.671c0-3.1 1.894-4.788 4.663-4.788 1.325 0 2.463.099 2.794.144v3.242h-1.916c-1.504 0-1.794.714-1.794 1.76v2.309h3.587l-.467 3.625h-3.12v9.3h6.104c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-500 hover:text-indigo-600">
//                 <span className="sr-only">Twitter</span>
//                 {/* Twitter Icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M24 4.557a9.826 9.826 0 0 1-2.828.775 4.931 4.931 0 0 0 2.165-2.724 9.862 9.862 0 0 1-3.127 1.196 4.915 4.915 0 0 0-8.384 4.482 13.935 13.935 0 0 1-10.11-5.127 4.916 4.916 0 0 0 1.523 6.574 4.897 4.897 0 0 1-2.229-.616v.062a4.917 4.917 0 0 0 3.946 4.816 4.923 4.923 0 0 1-2.224.084 4.917 4.917 0 0 0 4.598 3.418 9.861 9.861 0 0 1-6.102 2.105c-.395 0-.785-.023-1.17-.067a13.933 13.933 0 0 0 7.557 2.213c9.054 0 14.002-7.506 14.002-14.002 0-.213-.005-.426-.015-.637a10.012 10.012 0 0 0 2.457-2.548z" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-500 hover:text-indigo-600">
//                 <span className="sr-only">LinkedIn</span>
//                 {/* LinkedIn Icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M19.998 0h-16c-2.21 0-4 1.791-4 4v16c0 2.21 1.79 4 4 4h16c2.209 0 4-1.79 4-4v-16c0-2.209-1.791-4-4-4zm-11.846 19.73h-3.214v-10.47h3.214v10.47zm-1.607-11.95c-1.007 0-1.826-.818-1.826-1.826 0-1.006.819-1.825 1.826-1.825s1.826.819 1.826 1.825c0 1.007-.819 1.826-1.826 1.826zm13.455 11.95h-3.214v-5.141c0-1.223-.023-2.795-1.704-2.795-1.706 0-1.968 1.332-1.968 2.707v5.229h-3.214v-10.47h3.086v1.431h.045c.429-.813 1.477-1.67 3.038-1.67 3.246 0 3.846 2.136 3.846 4.915v5.794z" />
//                 </svg>
//               </a>
//             </div>
  
//             {/* Privacy Policy */}
//             <div className="mt-4 lg:mt-0 text-center lg:text-right">
//               <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
//                 Privacy Policy
//               </a>
//             </div>
//           </div>
  
//           <div className="mt-6 ml-0 lg:ml-28 text-center text-xs text-gray-400">
//             &copy; 2025 NeuroCare. All rights reserved.
//             {/* © 2025 NeuroCare. All rights reserved. */}
//           </div>
//         </div>
//       </footer>
//     );
//   }
  
//   export default Footer;
  
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gray-300"
            >
              <Mail className="h-5 w-5 text-indigo-400" />
              <a href="mailto:support@neurocare.ai" className="hover:text-indigo-400 transition-colors">
                support@neurocare.ai
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-gray-300"
            >
              <Phone className="h-5 w-5 text-indigo-400" />
              <span>+92 (303) 413-4453</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-gray-300"
            >
              <MapPin className="h-5 w-5 text-indigo-400" />
              <span>NUST College of E&ME, Rawalpindi</span>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lg font-semibold text-gray-100 mb-2"
            >
              Resources
            </motion.h3>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Documentation
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Research Papers
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Case Studies
            </motion.a>
          </div>

          {/* Social & Legal */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
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
                  platform: 'ResearchGate',
                  url: 'https://researchgate.net',
                  icon: 'M15.78 18.906c-.193.013-.385 0-.57-.038a3.088 3.088 0 0 1-1.084-.413 2.986 2.986 0 0 1-.88-.813 3.21 3.21 0 0 1-.562-1.195 3.404 3.404 0 0 1-.08-.79c0-.272.028-.54.08-.79.053-.25.13-.485.232-.703a3.3 3.3 0 0 1 1.443-1.443c.218-.1.453-.178.703-.23.25-.053.518-.08.79-.08.272 0 .54.027.79.08.25.052.485.13.703.23.218.1.416.237.594.397.178.16.333.347.46.56.126.212.222.444.284.688.062.244.09.496.09.75 0 .272-.028.54-.08.79a3.21 3.21 0 0 1-.232.703 3.3 3.3 0 0 1-1.443 1.443 3.088 3.088 0 0 1-1.654.45zm-3.872-4.03l-2.12-2.12a.75.75 0 0 1 0-1.06l2.12-2.12a.75.75 0 0 1 1.06 0l2.12 2.12a.75.75 0 0 1 0 1.06l-2.12 2.12a.75.75 0 0 1-1.06 0zm6.367-3.41a.75.75 0 0 1-1.06 0l-2.12-2.12a.75.75 0 0 1 0-1.06l2.12-2.12a.75.75 0 0 1 1.06 0l2.12 2.12a.75.75 0 0 1 0 1.06l-2.12 2.12z'
                }
              ].map(({ platform, url, icon }, index) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="sr-only">{platform}</span>
                  <svg className="h-6 w-6 fill-current text-gray-400" viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-right"
            >
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <span className="mx-2 text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-8 border-t border-gray-800 text-center"
        >
          {/* <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/iso-certified.svg" 
              alt="ISO 13485 Certified" 
              className="h-8 w-auto opacity-80"
            />
            <img 
              src="/hipaa-compliant.svg" 
              alt="HIPAA Compliant" 
              className="h-8 w-auto opacity-80"
            />
          </div> */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} NeuroCare Technologies. Advancing mental health diagnostics through AI-powered EEG analysis.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Registered with Pakistan Medical Commission • FDA Cleared
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;