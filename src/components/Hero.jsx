// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import UploadEEG from "./UploadEEG";
// import ParticleRing from "./ParticleRing";

// const Hero = () => {
//   return (
//     <section className="w-full px-8 py-12 mt-20 min-h-[700px] grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto relative overflow-hidden">
//       {/* Particle Background */}
//       <div className="absolute inset-0 z-0">
//         <ParticleRing />
//       </div>

//       {/* Hero Text */}
//       <div className="relative z-10 ml-20">
//         <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
//           Better every day
//         </span>
//         <h3 className="text-4xl md:text-5xl font-semibold text-gray-800">
//           Track and Manage Mental Well-being Through EEG
//         </h3>
//         <p className="text-base md:text-lg text-gray-600 my-4 md:my-6">
//           Upload your EEG data and gain insights into stress, depression, and
//           anxiety levels.
//         </p>
//         <button className="text-white font-medium py-2 px-4 rounded transition-all active:scale-95">
//           <UploadEEG />
//         </button>
//       </div>

//       <ShuffleGrid />
//     </section>
//   );
// };

// // Update utils.js colors for better matching


// // Rest of the Hero component code remains the same...

// const shuffle = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex != 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const squareData = [
//   {
//     id: 1, //
//     src: "https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 2, //
//     src: "https://images.unsplash.com/reserve/dPfjQTyJSJ2LpM7D9Yr0_Photo%2015-02-2014.jpg?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3, // 
//     src: "https://images.unsplash.com/photo-1601363645678-0cbae97abb2c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 4, //
//     src: "https://images.unsplash.com/photo-1557426575-6e9ea75ef57a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 5, // 
//     src: "https://images.unsplash.com/photo-1552081845-de328afbf66d?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 6,
//     src: "https://images.unsplash.com/photo-1531260796528-ae45a644fb20?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     src: "https://images.unsplash.com/photo-1609110995302-572b9641c0d1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 8,
//     src: "https://plus.unsplash.com/premium_photo-1661627668944-a65d4f54ab27?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   { 
//     id: 9, // 
//     src: "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 10,
//     src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 11, //
//     src: "https://plus.unsplash.com/premium_photo-1661310066866-45a714706cdc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 12,
//     src: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 13,
//     src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 14, //
//     src: "https://images.unsplash.com/photo-1715866170788-cbde4a47a742?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 15,
//     src: "https://plus.unsplash.com/premium_photo-1729867698245-c14c57fc7f47?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 16, //
//     src: "https://images.unsplash.com/photo-1607827448452-6fda561309d0?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

// const generateSquares = () => {
//   return shuffle(squareData).map((sq) => (
//     <motion.div
//       key={sq.id}
//       layout
//       transition={{ duration: 1.5, type: "spring" }}
//       className="w-full h-full"
//       style={{
//         backgroundImage: `url(${sq.src})`,
//         backgroundSize: "cover",
//       }}
//     ></motion.div>
//   ));
// };

// const ShuffleGrid = () => {
//   const timeoutRef = useRef(null);
//   const [squares, setSquares] = useState(generateSquares());

//   useEffect(() => {
//     shuffleSquares();

//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const shuffleSquares = () => {
//     setSquares(generateSquares());

//     timeoutRef.current = setTimeout(shuffleSquares, 3000);
//   };

//   return (
//     <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 mr-20">
//       {squares.map((sq) => sq)}
//     </div>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import UploadEEG from "./UploadEEG";
import ParticleRing from "./ParticleRing";

const Hero = () => {
  return (
    <section className="w-full px-8 py-12 mt-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto relative overflow-hidden bg-gray-900 min-h-screen">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleRing />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 ml-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="block mb-4 text-xs md:text-sm text-indigo-400 font-medium"
        >
          Better every day
        </motion.span>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-semibold text-gray-100"
        >
          Track and Manage Mental Well-being Through EEG
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-base md:text-lg text-gray-300 my-4 md:my-6"
        >
          Upload your EEG data and gain insights into stress, depression, and
          anxiety levels.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="text-gray-100 font-medium py-3 px-6 rounded-lg transition-all"
        >
          <UploadEEG />
        </motion.button>
      </div>

      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const squareData = [
  {
    id: 1, //
    src: "https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2, //
    src: "https://images.unsplash.com/reserve/dPfjQTyJSJ2LpM7D9Yr0_Photo%2015-02-2014.jpg?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3, // 
    src: "https://images.unsplash.com/photo-1601363645678-0cbae97abb2c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4, //
    src: "https://images.unsplash.com/photo-1557426575-6e9ea75ef57a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5, // 
    src: "https://images.unsplash.com/photo-1552081845-de328afbf66d?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1531260796528-ae45a644fb20?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1609110995302-572b9641c0d1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1661627668944-a65d4f54ab27?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { 
    id: 9, // 
    src: "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11, //
    src: "https://plus.unsplash.com/premium_photo-1661310066866-45a714706cdc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14, //
    src: "https://images.unsplash.com/photo-1715866170788-cbde4a47a742?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    src: "https://plus.unsplash.com/premium_photo-1729867698245-c14c57fc7f47?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16, //
    src: "https://images.unsplash.com/photo-1607827448452-6fda561309d0?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"/>
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${sq.src})` }}
      />
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 mr-20 bg-gray-800 rounded-xl p-2 shadow-2xl">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;
