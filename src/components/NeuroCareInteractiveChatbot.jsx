import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaTimes,
  FaRegSmile,
} from "react-icons/fa";
import { MdOutlineHelp, MdOutlineInfo, MdSave } from "react-icons/md";

// Preset supportive responses for quick access
const QUICK_RESPONSES = [
  { icon: "😊", text: "I'd like to talk about managing my anxiety" },
  { icon: "🛌", text: "How can I improve my sleep?" },
  { icon: "🧘", text: "What are some meditation techniques?" },
  { icon: "🚶", text: "How can physical exercise help my mental health?" },
  { icon: "❓", text: "What are common signs of depression?" },
  { icon: "🤝", text: "How can I support someone going through a tough time?" },
];

// Brain regions information for the visualization
const BRAIN_REGIONS = [
  {
    name: "Prefrontal Cortex",
    role: "Decision making, personality, executive function",
    impact: "Often affected in depression and anxiety disorders",
  },
  {
    name: "Amygdala",
    role: "Processes emotions, especially fear and threat detection",
    impact: "Hyperactive in anxiety disorders",
  },
  {
    name: "Hippocampus",
    role: "Memory formation and emotional regulation",
    impact: "Can shrink under chronic stress",
  },
  {
    name: "Hypothalamus",
    role: "Controls stress response and hormone release",
    impact: "Regulates fight-or-flight response in anxiety",
  },
];

// Mental health facts to display
const MENTAL_HEALTH_FACTS = [
  "1 in 4 people will experience a mental health problem each year",
  "Exercise can be as effective as medication for mild to moderate depression",
  "Sleep problems affect more than 50% of adults with anxiety or depression",
  "Meditation and mindfulness can physically change brain structure over time",
  "Social connection is one of the strongest protective factors for mental health",
  "Spending time in nature can significantly reduce stress hormones",
  "Deep breathing exercises can activate the parasympathetic nervous system",
  "Consistent routines help stabilize mood and reduce anxiety",
];

// Animated typing indicator
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 px-2 py-1">
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-0"></span>
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-200"></span>
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-400"></span>
  </div>
);

const NeuroCareInteractiveChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem("neuroCareMessages");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Error loading stored messages", err);
    }
    return [
      {
        sender: "bot",
        text: "Welcome to NeuroCare's interactive mental health assistant. I'm here to provide support and information about mental health. How are you feeling today?",
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoType, setInfoType] = useState("facts");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Save messages and scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    localStorage.setItem("neuroCareMessages", JSON.stringify(messages));
  }, [messages]);

  // Cycle through facts
  useEffect(() => {
    if (showInfo && infoType === "facts") {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % MENTAL_HEALTH_FACTS.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showInfo, infoType]);

  // Handle message sending
  const handleSend = async (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const prompt =
      "You are a compassionate mental health professional specializing in stress, anxiety, and depression. " +
      "Answer the following question in a gentle, supportive, and practical way. Keep your response brief but empathetic. " +
      "If the question is not directly related to mental health, stress, depression, or anxiety, respond ONLY with 'Please ask questions related to mental health and wellbeing.' " +
      "Question: " +
      text;

    try {
      const apiKey =
        localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE") ||
        "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";
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      const botText = data.choices[0].message.content.trim();

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick response selection - Fixed Function
  const handleQuickResponse = (responseText) => {
    setInputValue(responseText);

    // Using setTimeout to ensure the input value is set before sending
    setTimeout(() => {
      // Directly send the message without requiring form submission
      const text = responseText.trim();
      if (!text) return;

      const userMsg = { sender: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsLoading(true);

      const prompt =
        "You are a compassionate mental health professional specializing in stress, anxiety, and depression. " +
        "Answer the following question in a gentle, supportive, and practical way. Keep your response brief but empathetic. " +
        "If the question is not directly related to mental health, stress, depression, or anxiety, respond ONLY with 'Please ask questions related to mental health and wellbeing.' " +
        "Question: " +
        text;

      // API call
      const apiKey =
        localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE") ||
        "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";

      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("API request failed");
          return res.json();
        })
        .then((data) => {
          const botText = data.choices[0].message.content.trim();
          setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
        })
        .catch((error) => {
          console.error("Chat error:", error);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "I'm having trouble connecting right now. Please try again in a moment.",
            },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 100);
  };

  // Toggle info panel
  const toggleInfo = (type) => {
    if (showInfo && infoType === type) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
      setInfoType(type);
    }
  };

  // Clear chat history
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear this conversation?")) {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to NeuroCare's interactive mental health assistant. I'm here to provide support and information about mental health. How are you feeling today?",
        },
      ]);
    }
  };

  // Save chat as text file
  const saveChat = () => {
    const chatText = messages
      .map((m) => `${m.sender === "bot" ? "Assistant" : "You"}: ${m.text}`)
      .join("\n\n");
    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neurocare-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render brain region info panel
  const renderBrainInfo = () => (
    <div className="bg-gray-800 rounded-lg p-4 border border-indigo-500/30 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold text-indigo-300 mb-4">
        Brain & Mental Health
      </h3>
      <div className="space-y-4">
        {BRAIN_REGIONS.map((region, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/50 p-3 rounded-lg"
          >
            <h4 className="font-medium text-indigo-200">{region.name}</h4>
            <p className="text-sm text-gray-300 mt-1">{region.role}</p>
            <p className="text-xs text-gray-400 mt-1 italic">{region.impact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render mental health facts panel
  const renderFactsInfo = () => (
    <div className="bg-gray-800 rounded-lg p-4 border border-indigo-500/30 h-full flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-indigo-300 mb-2">
        Did You Know?
      </h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex items-center justify-center"
        >
          <p className="text-gray-200 text-center">
            {MENTAL_HEALTH_FACTS[currentFactIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-4">
        {MENTAL_HEALTH_FACTS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i === currentFactIndex ? "bg-indigo-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="bg-indigo-900 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
            <FaRobot className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">
              NeuroCare Assistant
            </h2>
            <p className="text-indigo-200 text-xs">
              Mental health support & resources
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <button 
      onClick={() => toggleInfo('brain')} 
      className={`p-2 rounded-full ${infoType === 'brain' && showInfo ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
      title="Brain & Mental Health Information"
    >
      <MdOutlineInfo size={20} />
    </button>
    <button 
      onClick={() => toggleInfo('facts')} 
      className={`p-2 rounded-full ${infoType === 'facts' && showInfo ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
      title="Mental Health Facts"
    >
      <MdOutlineHelp size={20} />
    </button> */}
          <button
            onClick={saveChat}
            className="p-2 rounded-full text-indigo-200 hover:bg-indigo-800"
            title="Save Conversation"
          >
            <MdSave size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-indigo-200 hover:bg-indigo-800"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages - Fixed for proper scrolling */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900 custom-scrollbar"
            ref={messagesContainerRef}
            style={{ overflowY: "auto", maxHeight: "calc(100% - 160px)" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1">
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.sender === "bot"
                      ? "bg-indigo-600 text-white rounded-tl-none"
                      : "bg-blue-600 text-white rounded-tr-none"
                  } ${
                    // if message sender is bot and text starts with Welcome add margin top of 20
                    msg.sender === "bot" &&
                    msg.text.startsWith("Welcome")
                        ? "mt-20"
                        : ""
                  }`}
                >
                  {msg.text}
                </motion.div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0 self-end mb-1">
                    <FaUser className="text-white text-sm" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-indigo-600 p-2 px-4 rounded-lg rounded-tl-none">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick response options */}
          <div className="bg-gray-800 p-3 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {QUICK_RESPONSES.map((response, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleQuickResponse(response.text)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-1 px-3 rounded-full flex items-center"
                >
                  <span className="mr-1">{response.icon}</span>
                  <span className="truncate max-w-[150px]">
                    {response.text}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setInputValue((prev) => prev + " 😊")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  <FaRegSmile />
                </button>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-r-lg ${
                  !inputValue.trim() || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaPaperPlane />
              </button>
            </form>

            <div className="mt-3 flex justify-between items-center text-xs">
              <button
                onClick={clearChat}
                className="text-gray-500 hover:text-gray-300"
              >
                Clear conversation
              </button>
              <span className="text-gray-500">
                For educational & support purposes
              </span>
            </div>
          </div>
        </div>

        {/* Info panel - conditionally rendered */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "300px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l border-gray-700 h-full overflow-hidden"
            >
              {infoType === "brain" ? renderBrainInfo() : renderFactsInfo()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .typing-dot {
          animation: typing 1s infinite ease-in-out;
        }
        .delay-0 {
          animation-delay: 0s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%,
          80%,
          100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.7);
        }
      `}</style>
    </div>
  );
};

export default NeuroCareInteractiveChatbot;
