import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import './FeatureCards'

// --- Icons (must be declared before they're used) ---
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
    />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
    />
  </svg>
);

// --- Data arrays (now the icons are defined) ---
const features = [
  {
    title: "Advanced Analysis",
    description: "Utilize cutting-edge machine learning algorithms for precise mental health insights.",
    icon: BrainIcon,
  },
  {
    title: "Real-time Results",
    description: "Get instant feedback on your EEG data with comprehensive visualizations.",
    icon: ClockIcon,
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties.",
    icon: LockIcon,
  },
];

const stats = [
  { value: 95, suffix: '%', label: 'Accuracy Rate' },
  { value: 1000, suffix: '+', label: 'Analyses Completed' },
  { value: 24, suffix: '/7', label: 'Availability' },
];

// --- Helper Component ---
const AnimatedNumber = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        const step = Math.ceil(value / 100);
        return prev < value ? prev + step : value;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-primary">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

// --- Main Component ---
const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'linear-gradient(45deg, #f0f4ff, #fdf2f8)',
            'linear-gradient(135deg, #fdf2f8, #f0fdf4)',
            'linear-gradient(225deg, #f0fdf4, #f0f4ff)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Revolutionizing Mental Health
            <br />
            Through EEG Analysis
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Harness the power of advanced machine learning to gain insights into your mental well-being through EEG data analysis.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/uploadeeg"
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-primary rounded-full group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary-dark rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative flex items-center gap-2">
                Get Started <FiArrowRight className="w-5 h-5" />
              </span>
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 font-medium text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <FeatureCards />
        {/* <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -10 }}
            >
              <div className="text-primary mb-4">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Animated Stats */}
        <motion.div
          className="mt-20 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
