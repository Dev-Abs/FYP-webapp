import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const ONE_HOUR_MS = 3600000;

const Chatbot = () => {
  // Load stored conversation if it's less than one hour old.
  const loadStoredMessages = () => {
    try {
      const storedTimestamp = localStorage.getItem("chatMessagesTimestamp");
      const now = Date.now();
      if (
        storedTimestamp &&
        now - parseInt(storedTimestamp, 10) < ONE_HOUR_MS
      ) {
        const stored = localStorage.getItem("chatMessages");
        return stored ? JSON.parse(stored) : [];
      }
    } catch (err) {
      console.error("Error loading stored messages", err);
    }
    return [{ sender: "bot", text: "Hi there! How can I help you today?" }];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadStoredMessages());
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatWidth, setChatWidth] = useState(320);
  const [chatHeight, setChatHeight] = useState(384);
  const messagesEndRef = useRef(null);
  const resizerRef = useRef(null);
  const isResizingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatMessagesTimestamp", Date.now().toString());
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { sender: "user", text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const prompt =
    "You are a compassionate doctor and motivational counselor specialized in mental health. " +
    "Answer the following question in a concise, clear, and supportive manner with a brief, empathetic, and practical response. " +
    "If the question is not directly related to mental health, stress, depression, or anxiety, respond ONLY with 'please ask relevant questions'. " +
    "Question: " + userMessage.text;
  

    try {
      const apiKey =
        localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE") ||
        "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";
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 500,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const botText = data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Resizing logic using a bottom-right handle.
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      setChatWidth((prev) => Math.max(250, prev + dx));
      setChatHeight((prev) => Math.max(200, prev + dy));
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
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50"
            style={{ width: chatWidth, height: chatHeight }}
          >
            {/* Resizer handle: use a custom class to hide native scrollbar in chat window */}
            <div
              ref={resizerRef}
              onMouseDown={handleResizerMouseDown}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize hover:bg-indigo-500 transition-colors"
              style={{
                background: "rgba(255,255,255,0.3)",
                borderTopLeftRadius: "0.25rem",
              }}
            />
            {/* Header */}
            <div className="bg-gray-800 p-3 flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Chat Support</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {/* Chat Window */}
            <div
              className="flex-1 p-3 overflow-y-auto space-y-3 hide-scrollbar"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      msg.sender === "bot"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs p-2 rounded-lg bg-indigo-600 text-white">
                    Bot is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-gray-800"
            >
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-l bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 rounded-r hover:bg-indigo-700 transition text-white"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 p-4 bg-indigo-600 rounded-full shadow-2xl text-white hover:bg-indigo-700 transition z-50 mb-12 mr-2"
          >
            <FaComments size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Optional inline CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
