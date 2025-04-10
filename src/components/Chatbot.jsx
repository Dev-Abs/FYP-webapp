import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";
import { MdMoreVert, MdDelete, MdDownload, MdHelp, MdSettings } from "react-icons/md";

const ONE_HOUR_MS = 3600000;

// A refined system prompt to prepend to every request
const SYSTEM_PROMPT = `
You are a compassionate mental health professional and motivational counselor specialized in stress, anxiety, and depression.
Answer the user in a concise, clear, and supportive manner, offering brief, practical advice and encouragement.
Only respond to questions directly related to mental health, stress, depression, or anxiety.
If the question is off-topic, reply exactly: "please ask relevant questions".
Use the full conversation history for context.
`.trim();

// Suggested questions to get started
const SUGGESTED_QUESTIONS = [
  "How can I manage anxiety?",
  "What are signs of depression?",
  "Tips for better sleep?",
  "How to practice self-care?",
  "Ways to reduce stress?",
  "Mindfulness techniques?",
  "How to support someone with depression?",
  "What is cognitive behavioral therapy?",
];

// Typing animation for bot messages
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 px-2 py-1">
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-0"></span>
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-200"></span>
    <span className="w-2 h-2 bg-white rounded-full typing-dot delay-400"></span>
  </div>
);

const Chatbot = () => {
  const loadStoredMessages = () => {
    try {
      const ts = localStorage.getItem("chatMessagesTimestamp");
      if (ts && Date.now() - parseInt(ts, 10) < ONE_HOUR_MS) {
        const stored = localStorage.getItem("chatMessages");
        return stored ? JSON.parse(stored) : [];
      }
    } catch {
      // ignore
    }
    return [
      { sender: "bot", text: "Hello! I'm NeuroCare's mental health assistant. How can I support you today?" }
    ];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadStoredMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatWidth, setChatWidth] = useState(350);
  const [chatHeight, setChatHeight] = useState(500);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // dark or light
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const isResizingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const chatContainerRef = useRef(null);

  // Persist & scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatMessagesTimestamp", Date.now().toString());
  }, [messages]);

  // Check if chat should display welcome suggestions
  useEffect(() => {
    setShowSuggestions(messages.length <= 1);
  }, [messages]);

  // Handle outside click to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Send message
  const handleSend = async (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMsg = { sender: "user", text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputValue("");
    setIsLoading(true);
    setShowSuggestions(false);

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...updated.map(m => ({
        role: m.sender === "bot" ? "assistant" : "user",
        content: m.text
      }))
    ];

    try {
      const apiKey =
        localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE") ||
        "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";
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 500,
          messages: apiMessages
        })
      });
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      const botText = data.choices[0].message.content.trim();
      setMessages(prev => [...prev, { sender: "bot", text: botText }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggested question click
  const handleSuggestionClick = (question) => {
    setInputValue(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  // Clear chat history
  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        { sender: "bot", text: "Hello! I'm NeuroCare's mental health assistant. How can I support you today?" }
      ]);
      setIsMenuOpen(false);
      setShowSuggestions(true);
    }
  };

  // Download chat history
  const handleDownloadChat = () => {
    const chatText = messages
      .map(m => `${m.sender === "bot" ? "Assistant" : "You"}: ${m.text}`)
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
    setIsMenuOpen(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsMenuOpen(false);
  };

  // Resizing
  useEffect(() => {
    const onMouseMove = e => {
      if (!isResizingRef.current) return;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      setChatWidth(w => Math.max(300, w + dx));
      setChatHeight(h => Math.max(400, h + dy));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.cursor = 'default';
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    if (isResizingRef.current) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const startResize = e => {
    isResizingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'nwse-resize';
    e.preventDefault();
  };

  // Get theme-based classes
  const getThemeClasses = () => {
    return theme === "dark" 
      ? {
          mainBg: "bg-gray-900",
          headerBg: "bg-gray-800",
          text: "text-white",
          inputBg: "bg-gray-800",
          botMsg: "bg-indigo-600 text-white",
          userMsg: "bg-gray-700 text-white",
          menuBg: "bg-gray-800",
          menuHover: "hover:bg-gray-700",
          border: "border-gray-700",
          placeholder: "placeholder-gray-500",
          icon: "text-gray-400"
        }
      : {
          mainBg: "bg-white",
          headerBg: "bg-indigo-50", 
          text: "text-gray-800",
          inputBg: "bg-gray-100",
          botMsg: "bg-indigo-100 text-indigo-900",
          userMsg: "bg-blue-100 text-blue-900",
          menuBg: "bg-white",
          menuHover: "hover:bg-gray-100",
          border: "border-gray-200",
          placeholder: "placeholder-gray-400",
          icon: "text-gray-500"
        };
  };

  const theme_classes = getThemeClasses();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`fixed bottom-4 right-4 ${theme_classes.mainBg} rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 border border-indigo-500/30`}
            style={{ width: chatWidth, height: chatHeight }}
            ref={chatContainerRef}
          >
            {/* Resizer */}
            <div
              onMouseDown={startResize}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize opacity-0 hover:opacity-100"
            />

            {/* Header */}
            <div className={`${theme_classes.headerBg} p-3 flex items-center justify-between shadow-md`}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                  <FaRobot className="text-white" />
                </div>
                <h2 className={`${theme_classes.text} font-semibold`}>NeuroCare Assistant</h2>
              </div>
              <div className="flex items-center">
                {/* Menu button */}
                <div className="relative menu-container">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full ${theme_classes.icon} hover:bg-opacity-30 hover:bg-gray-500`}
                  >
                    <MdMoreVert size={20} />
                  </button>
                  
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute right-0 mt-2 w-48 ${theme_classes.menuBg} rounded-md shadow-lg z-10 border ${theme_classes.border}`}
                      >
                        <div className="py-1">
                          <button
                            onClick={handleClearChat}
                            className={`flex items-center px-4 py-2 text-sm ${theme_classes.text} w-full text-left ${theme_classes.menuHover}`}
                          >
                            <MdDelete className="mr-2" /> Clear conversation
                          </button>
                          <button
                            onClick={handleDownloadChat}
                            className={`flex items-center px-4 py-2 text-sm ${theme_classes.text} w-full text-left ${theme_classes.menuHover}`}
                          >
                            <MdDownload className="mr-2" /> Save conversation
                          </button>
                          <button
                            onClick={toggleTheme}
                            className={`flex items-center px-4 py-2 text-sm ${theme_classes.text} w-full text-left ${theme_classes.menuHover}`}
                          >
                            <MdSettings className="mr-2" /> Toggle theme
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full ${theme_classes.icon} hover:bg-opacity-30 hover:bg-gray-500`}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${theme_classes.mainBg}`}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  {m.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1">
                      <FaRobot className="text-white text-sm" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                      m.sender === "bot" 
                        ? `${theme_classes.botMsg} rounded-tl-none` 
                        : `${theme_classes.userMsg} rounded-tr-none`
                    }`}
                  >
                    {m.text}
                  </motion.div>
                  {m.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 flex-shrink-0 self-end mb-1">
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
                  <div className={`${theme_classes.botMsg} p-2 px-4 rounded-lg rounded-tl-none`}>
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className={`${theme_classes.text} text-sm mb-2 opacity-70`}>You can ask me about:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(q)}
                        className={`text-sm py-1 px-3 rounded-full bg-indigo-500/20 ${theme === "dark" ? "text-indigo-300" : "text-indigo-700"} hover:bg-indigo-500/30 transition-colors`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSend} 
              className={`p-3 border-t ${theme_classes.border} ${theme_classes.mainBg}`}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className={`flex-1 p-2 px-3 rounded-l-lg ${theme_classes.inputBg} ${theme_classes.text} ${theme_classes.placeholder} focus:outline-none`}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2 h-full bg-indigo-600 rounded-r-lg text-white ${!inputValue.trim() ? 'opacity-50' : 'hover:bg-indigo-700'} transition-colors`}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  NeuroCare Assistant is here to help with stress, anxiety, and depression
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 p-4 bg-indigo-600 rounded-full shadow-xl text-white hover:bg-indigo-700 transition-colors z-50 group"
          >
            <FaComments size={24} />
            <motion.span 
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
            >
              1
            </motion.span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap hidden group-hover:block"
            >
              Need support? Chat with me!
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .typing-dot {
          animation: typing 1s infinite ease-in-out;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Chatbot;