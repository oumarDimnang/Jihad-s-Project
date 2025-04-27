import { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Replace with your API URL
  const API_URL = "http://localhost:3000/api/chatbot/chat";

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add user message to state
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await axios.post(API_URL, {
        userText: inputText.trim(),
      });

      // Add bot response to state
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data || "Sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with the backend:", error);

      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't connect to the server right now.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    // Main container with top padding to account for the Navbar
    <div className="flex flex-col h-screen pt-16 bg-gray-100">
      {/* Messages area - calc accounts for navbar (4rem), header (2.5rem) and input area (3.5rem) */}
      <div
        className="flex-1 overflow-y-auto p-3"
        style={{ height: "calc(100vh - 10rem)" }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-2xl shadow-sm ${
                  message.isUser
                    ? "bg-violet-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    message.isUser ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center p-2 ml-2">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ~AI Assistant is thinking~
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area with fixed height */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center">
        <textarea
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-green-800"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          rows="1"
          maxLength={200}
        />
        <button
          className={`ml-3 w-10 h-10 rounded-full flex items-center justify-center ${
            inputText.trim()
              ? "bg-violet-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
          onClick={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
