// import React from "react";
// import { motion } from "framer-motion";
// import { DragCards } from "./DragCards"; // DragCards from your provided code

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 py-12 mt-20">
//       <motion.div
//         className="container mx-auto px-4"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           visible: { transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {/* About Project Card */}
//         <motion.div
//           className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-8"
//           variants={fadeIn}
//         >
//           <h2 className="text-3xl font-bold mb-4">About the Project</h2>
//           <p className="text-base leading-relaxed">
//             This project leverages EEG (electroencephalography) data to detect
//             mental health challenges such as anxiety and depression. Through
//             advanced deep learning models, we aim to provide early diagnostic
//             insights, making mental health monitoring more accessible.
//           </p>
//         </motion.div>

//         {/* Importance of EEG Card */}
//         <motion.div
//           className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-8"
//           variants={fadeIn}
//         >
//           <h2 className="text-3xl font-bold mb-4">
//             Why EEG Matters for Mental Health
//           </h2>
//           <p className="text-base leading-relaxed">
//             EEG is a powerful tool for observing brain activity in real-time.
//             Its ability to detect neural patterns makes it invaluable in
//             diagnosing mental health disorders, providing non-invasive and
//             accurate insights that can guide treatment.
//           </p>
//         </motion.div>

//         {/* Team Section with Animated Cards */}
//         <motion.div
//           className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6"
//           variants={fadeIn}
//         >
//           <h2 className="text-3xl font-bold mb-4 text-center">Meet the Team</h2>
//           <p className="text-center text-base leading-relaxed mb-6">
//             A dedicated team of engineers and researchers focused on transforming
//             mental health diagnostics through EEG technology.
//           </p>
//           <div className="relative">
//             <DragCards />
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default AboutPage;

import React from "react";
import { motion } from "framer-motion";
import { DragCards } from "./DragCards";
import Navbar from "./Navbar";
import NavbarDrawer from "./NavbarDrawer";
import Chatbot from "./Chatbot";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AboutPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <NavbarDrawer />
      <Chatbot />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 pt-10">
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* About Project Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-950 p-8 mb-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              About the Project
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              This project leverages EEG (electroencephalography) data to detect
              mental health challenges such as anxiety and depression. Through
              advanced deep learning models, we aim to provide early diagnostic
              insights, making mental health monitoring more accessible.
            </p>
          </motion.div>

          {/* Importance of EEG Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-950 p-8 mb-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Why EEG Matters
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              EEG is a powerful tool for observing brain activity in real-time.
              Its ability to detect neural patterns makes it invaluable in
              diagnosing mental health disorders, providing non-invasive and
              accurate insights that can guide treatment.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-950 p-8 border border-gray-200 dark:border-gray-700"
            variants={fadeIn}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Meet the Team
              </h2>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A dedicated team of engineers and researchers focused on
                transforming mental health diagnostics through EEG technology.
              </p>
            </div>
            <div className="relative">
              <DragCards />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
