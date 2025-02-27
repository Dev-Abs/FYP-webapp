import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Navbar from "./Navbar";
import NavbarDrawer from "./NavbarDrawer";

const motivationalWords = [
  "Inspire",
  "Hope",
  "Courage",
  "Strength",
  "Resilience",
  "Believe",
  "Thrive",
  "Empower",
  "Calm",
  "Peace",
  "Focus",
  "Joy",
  "Gratitude",
  "Kindness",
  "Compassion",
  "Mindful",
  "Balance",
  "Wellness",
  "Healing",
  "Self-care",
  "Self-love",
  "Confidence",
  "Optimism",
  "Purpose",
  "Success",
];

const DELAY_IN_MS = 3000;
const TRANSITION_DURATION_IN_SECS = 0.8;

// Module-level cache variable to persist across navigations.
let cachedStatements = null;

const NeuroCareInteractive = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 min-h-screen">
      <MouseWordTrail words={motivationalWords} renderImageBuffer={50} rotationRange={25}>
        <div className="relative z-10 flex h-screen items-center justify-center">
          <NeuroCareRotatingStatements />
        </div>
      </MouseWordTrail>
    </div>
  );
};

const NeuroCareRotatingStatements = () => {
  // Try to load from the module-level cache first, then sessionStorage, then default to empty.
  const [statements, setStatements] = useState(() => {
    if (cachedStatements) return cachedStatements;
    try {
      const stored = sessionStorage.getItem("statements");
      if (stored) {
        cachedStatements = JSON.parse(stored);
        return cachedStatements;
      }
    } catch (err) {
      console.error("Session storage error:", err);
    }
    return [];
  });
  const [loading, setLoading] = useState(statements.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have statements, do nothing.
    if (statements.length > 0) return;

    const fetchStatements = async () => {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 500,
            messages: [
              {
                role: "user",
                content:
                  "Generate 25 concise mental health relief statements facts motivation for stress, depression, and anxiety. Format as numbered list without markdown.",
              },
            ],
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || "API request failed");
        }

        const content = data.choices[0].message.content;
        const statementsArray = content
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => line.replace(/^\d+\.\s*/, "").trim())
          .slice(0, 25);

        if (statementsArray.length < 25) {
          throw new Error("Received insufficient number of statements");
        }

        // Cache in both module-level variable and sessionStorage.
        cachedStatements = statementsArray;
        sessionStorage.setItem("statements", JSON.stringify(statementsArray));
        setStatements(statementsArray);
      } catch (err) {
        setError(err.message);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, [statements]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-white">Loading relief statements...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="flex h-screen items-center justify-center">
      <FlippingCard items={statements} />
    </div>
  );
};

const FlippingCard = ({ items }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, DELAY_IN_MS);
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };

  return (
    <div>
      {/* <Navbar /> */}
      <NavbarDrawer />
    <div className="relative w-full max-w-md no-mouse-trail">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          className="w-full p-8 bg-white rounded-xl shadow-2xl text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-xl font-semibold text-gray-800">
            {items[index % items.length]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
};

const MouseWordTrail = ({ children, words, renderImageBuffer, rotationRange }) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const wordRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    if (e.target.closest(".no-mouse-trail")) return;
    const { clientX, clientY } = e;
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );
    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;
      renderNextWord();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderNextWord = () => {
    const wordIndex = wordRenderCount.current % words.length;
    const selector = `[data-mouse-move-index="${wordIndex}"]`;
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = wordRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${wordIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`}`,
          `translate(-50%, -50%) scale(1) ${wordIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`}`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );
    animate(
      selector,
      { opacity: [1, 0] },
      { ease: "linear", duration: 0.5, delay: 2 }
    );
    wordRenderCount.current = wordRenderCount.current + 1;
  };

  return (
    <div ref={scope} className="relative" onMouseMove={handleMouseMove}>
      {children}
      {words.map((word, index) => (
        <span
          key={index}
          data-mouse-move-index={index}
          className="pointer-events-none absolute text-2xl font-bold text-white opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default NeuroCareInteractive;
