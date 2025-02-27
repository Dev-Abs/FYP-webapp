import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DELAY_IN_MS = 3000;
const TRANSITION_DURATION_IN_SECS = 0.8;

const NeuroCareRotatingStatements = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch statements on component mount
  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`, // Replace with your secure API key
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

        setStatements(statementsArray);
      } catch (err) {
        setError(err.message);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
        <p className="text-lg text-gray-800">Loading relief statements...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 p-4">
      <FlippingCard items={statements} />
    </div>
  );
};

const FlippingCard = ({ items }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // Update index periodically to trigger flip animation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, DELAY_IN_MS);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Variants for flip animation along Y-axis
  const variants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };

  return (
    <div className="relative w-full max-w-md">
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
          {/* <div className="mt-4 text-sm text-gray-500">
            {((index % items.length) + 1)}/{items.length}
          </div> */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NeuroCareRotatingStatements;
