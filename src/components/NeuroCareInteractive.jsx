import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import NavbarDrawer from "./NavbarDrawer";
import CircularText from "./CircularText";
import "../css/care.css"

const motivationalWords = [
  "Inspire", "Hope", "Courage", "Strength", "Resilience", "Believe",
  "Thrive", "Empower", "Calm", "Peace", "Focus", "Joy", "Gratitude",
  "Kindness", "Compassion", "Mindful", "Balance", "Wellness", "Healing",
  "Self-care", "Self-love", "Confidence", "Optimism", "Purpose", "Success",
];

const motivationStatements = [
  "You have survived 100% of your worst days. Keep going.",
  "It's okay to not be okay. Healing takes time.",
  "Your feelings are valid, but they do not define you.",
  "Small progress is still progress. Take one step at a time.",
  "You are not alone. There are people who care about you.",
  "Mental health is just as important as physical health.",
  "You are stronger than you think, even on your worst days.",
  "Every storm runs out of rain. Your struggles will pass too.",
  "Be kind to yourself. Self-love is not selfish.",
  "Your thoughts are not facts. Don’t believe everything you think.",
  "Asking for help is a sign of strength, not weakness.",
  "Your current situation is not your final destination.",
  "Breathe. Inhale strength, exhale stress.",
  "You are worthy of love, happiness, and peace.",
  "Progress, not perfection. Just keep moving forward.",
  "One bad day does not mean a bad life.",
  "Your past does not define your future.",
  "You are enough, just as you are.",
  "It’s okay to take breaks. Rest is part of healing.",
  "Happiness is not the absence of problems, but the ability to deal with them.",
  "Every day is a new beginning. Don’t be afraid to start over.",
  "Even the darkest night will end, and the sun will rise again.",
  "Your mind believes what you tell it. Speak kindly to yourself.",
  "You don’t have to control your thoughts, just stop letting them control you.",
  "Healing is not linear. Some days will be better than others, and that’s okay.",
];

const DELAY_IN_MS = 3000;
const TRANSITION_DURATION_IN_SECS = 0.8;

let cachedStatements = null;

const NeuroCareInteractive = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatWidth, setChatWidth] = useState(400); // default width
  const [chatHeight, setChatHeight] = useState(500); // default height
  const isResizingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      // Calculate delta from top-left handle.
      const dx = lastMousePosRef.current.x - e.clientX;
      const dy = lastMousePosRef.current.y - e.clientY;
      setChatWidth(prev => Math.max(300, prev + dx));
      setChatHeight(prev => Math.max(300, prev + dy));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (isResizingRef.current) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleResizerMouseDown = (e) => {
    isResizingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 min-h-screen">
      <NavbarDrawer />
      <CircularText
        text="NEURO*CARE*"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
        Top="4"
        Left="-30px"
      />
      {/* Rotating motivational statements */}
      <div className="relative z-10 flex h-screen items-center justify-center">
        <NeuroCareRotatingStatements />
      </div>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowChatbot(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition hidden md:block"
        >
          Talk to our Chatbot
        </button>
        <div className="block md:hidden">
                <AnimatePresence>
                  {!showChatbot && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setShowChatbot(true)}
                      className="fixed bottom-4 right-4 p-4 bg-indigo-600 rounded-full shadow-2xl text-white hover:bg-indigo-700 transition z-50 mb-12 mr-2"
                    >
                      <FaComments size={24} />
                    </motion.button>
                  )}
                </AnimatePresence>
        </div>
      </div>
      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-l-lg p-6 relative flex flex-col overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: chatWidth, height: chatHeight }}
            >
              {/* Resizer handle in top-left corner */}
              <div
                onMouseDown={handleResizerMouseDown}
                className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize"
                style={{ background: "rgba(255,255,255,0.3)" }}
              ></div>
              <button
                onClick={() => setShowChatbot(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
              >
                &times;
              </button>
              <ChatbotModalContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NeuroCareRotatingStatements = () => {
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
    return motivationStatements;
  });
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
      setIndex(prev => prev + 1);
    }, DELAY_IN_MS);
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          className="p-8 bg-white rounded-xl shadow-2xl text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-xl font-semibold text-gray-800">
            {items[index % items.length]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Chatbot modal content component with conversation persistence and real-time API call.
const ChatbotModalContent = () => {
  const ONE_HOUR_MS = 3600000;
  const loadStoredMessages = () => {
    try {
      const storedTimestamp = localStorage.getItem("chatMessagesTimestamp");
      const now = Date.now();
      if (storedTimestamp && now - parseInt(storedTimestamp, 10) < ONE_HOUR_MS) {
        const stored = localStorage.getItem("chatMessages");
        return stored ? JSON.parse(stored) : [];
      }
    } catch (err) {
      console.error("Error loading stored messages", err);
    }
    return [{ sender: 'bot', text: "Hello! I'm here to support you. How can I help today?" }];
  };

  const [messages, setMessages] = useState(loadStoredMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatMessagesTimestamp", Date.now().toString());
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { sender: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const prompt =
    "You are a compassionate doctor and motivational counselor specialized in mental health. " +
    "Answer the following question in a concise, clear, and supportive manner with a brief, empathetic, and practical response. " +
    "If the question is not directly related to mental health, stress, depression, or anxiety, respond ONLY with 'please ask relevant questions'. " +
    "Question: " + userMessage.text;
  

    try {
      const apiKey = localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE") ||
        "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";
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 500,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }
      
      const data = await response.json();
      const botText = data.choices[0].message.content;
      setMessages(prev => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs p-3 rounded-lg shadow ${msg.sender === 'bot' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs p-3 rounded-lg bg-indigo-600 text-white">
              Bot is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-l bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-indigo-600 text-white rounded-r hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NeuroCareInteractive;
