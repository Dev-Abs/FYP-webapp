import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Activity, ShieldCheck, LineChart } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-indigo-400" />,
    title: "Neural Pattern Analysis",
    description:
      "Our advanced AI algorithms identify patterns in your EEG data that correlate with various mental health conditions.",
  },
  {
    icon: <Activity className="w-8 h-8 text-indigo-400" />,
    title: "Real-time Monitoring",
    description:
      "Monitor changes in your mental health over time with regular scans and comprehensive reports.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
    title: "Secure & Private",
    description:
      "Your health data is encrypted and protected with the highest security standards in the industry.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-indigo-400" />,
    title: "Comprehensive Reports",
    description:
      "Get detailed analysis reports with actionable insights to improve your mental well-being.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900/0 via-indigo-900/10 to-gray-900/0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-900/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Advanced <span className="text-indigo-400">EEG Analysis</span> Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Our platform uses cutting-edge machine learning algorithms to analyze EEG data 
            and provide meaningful insights about your mental health.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all"
            >
              <div className="bg-indigo-900/30 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Brain scan visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                How Our EEG Analysis Works
              </h3>
              <p className="text-gray-300 mb-6">
                Our proprietary algorithm analyzes over 200 distinct patterns in your brain's
                electrical activity to identify potential indicators of depression, anxiety,
                and other mental health conditions.
              </p>
              <ul className="space-y-3">
                {[
                  "Upload your EEG data file",
                  "Select electrodes for analysis",
                  "AI processes brain wave patterns",
                  "Receive comprehensive insights"
                ].map((step, i) => (
                  <li key={i} className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm mr-3">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-full min-h-[300px] bg-gray-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <div className="eeg-waves"></div>
              </div>
              <div className="relative z-10 p-6 text-center">
                <div className="brain-scan-animation mb-4"></div>
                <p className="text-indigo-300 text-sm">EEG Signal Processing Visualization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .eeg-waves {
          background: linear-gradient(90deg, 
            rgba(0,0,0,0) 0%, 
            rgba(99,102,241,0.1) 20%, 
            rgba(99,102,241,0.2) 40%, 
            rgba(99,102,241,0.1) 60%, 
            rgba(0,0,0,0) 100%
          );
          width: 200%;
          height: 100%;
          position: absolute;
          animation: wave 8s linear infinite;
          background-size: 50% 100%;
          left: -50%;
        }
        
        @keyframes wave {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(25%) scaleY(0.8); }
          100% { transform: translateX(50%) scaleY(1); }
        }
        
        .brain-scan-animation {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          background: url('/brain-scan.svg') no-repeat center center;
          background-size: contain;
          position: relative;
        }
        
        .brain-scan-animation::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, 
            rgba(99,102,241,0.8) 0%, 
            rgba(99,102,241,0) 100%
          );
          animation: scan 3s ease-in-out infinite;
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;