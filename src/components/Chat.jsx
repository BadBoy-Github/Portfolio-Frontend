// React
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Icons
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiExclamationMarkBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

const BACKEND_URL = "http://localhost:5000";


// Read More Component
const ReadMoreText = ({ text, maxLines = 5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    // Check if text needs expansion by counting lines
    const lineHeight = 20; // Approximate line height in pixels
    const maxHeight = maxLines * lineHeight;

    if (textRef.current) {
      const actualHeight = textRef.current.scrollHeight;
      setNeedsExpansion(actualHeight > maxHeight);
    }
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        ref={textRef}
        className={`overflow-hidden transition-all duration-300 ${
          !isExpanded ? `max-h-[${maxLines * 20}px]` : "max-h-none"
        }`}
        style={{
          maxHeight: !isExpanded ? `${maxLines * 20}px` : "none",
          lineHeight: "1.5",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="whitespace-pre-wrap"
        />
      </div>
      {needsExpansion && (
        <button
          onClick={toggleExpanded}
          className="text-sky-400 hover:text-sky-300 text-sm mt-1 font-medium transition-colors duration-200"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I'm a friendly Chatbot that lets you interact with the portfolio and CV. How can I help you?",
      source: "local", // Added source for initial message
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Send message to API
  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botMessage = {
        sender: "bot",
        text:
          data.answer ||
          "I'm not sure how to answer that. Try asking about my skills, projects, or experience!",
        source: data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again later!",
          source: "error",
          error: true,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to render source indicator
  const renderSourceIndicator = (source) => {
    switch (source) {
      case "ai":
        return (
          <div className="text-xs text-sky-400/70 mt-1 flex items-center gap-1">
            🤖 AI Powered
          </div>
        );
      case "local":
        return (
          <div className="text-xs text-amber-400/70 mt-1 flex items-center gap-1">
            ⚡ Local Response
          </div>
        );
      case "error":
        return (
          <div className="text-xs text-red-400/70 mt-1 flex items-center gap-1">
            ⚠️ API Error
          </div>
        );
      default:
        return null;
    }
  };

  // Response system
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="chatbot" className="section">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2">Talk With My Portfolio</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Explore my portfolio, skills, and resume in a conversational way
        </p>
      </div>

      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-4">
          {/* Left side */}
          <div className="relative">
            <h1 className="text-xl font-semibold text-sky-400">
              About the Chatbot
            </h1>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              This chatbot is designed to make exploring my portfolio more
              interactive. You can ask questions about my{" "}
              <span className="text-sky-400">skills</span>,
              <span className="text-sky-400"> projects</span>, or even my
              <span className="text-sky-400"> resume</span>, and it will guide
              you to the right information.
            </p>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              Access my <span className="text-sky-400">resume</span> or{" "}
              <span className="text-sky-400">contact me</span> for professional
              inquiries and collaborations.
            </p>

            <div className="hidden absolute left-2 bottom-0 lg:flex flex-row items-end justify-center gap-1">
              {/* Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8"
              >
                {isOpen ? (
                  <IoClose className="bg-red-500 size-6 p-1 rounded-full transition-all duration-300" />
                ) : (
                  <PiExclamationMarkBold className="bg-sky-500 size-6 p-1 rounded-full transition-all duration-300" />
                )}
              </button>

              {/* Info Panel */}
              <div
                className={` text-zinc-300 leading-relaxed text-[10px] px-3 py-2 bg-zinc-800/70 rounded-xl ring-1 ring-zinc-300/10 ring-inset transition-all duration-500 ${
                  isOpen
                    ? "opacity-100 scale-100 translate-x-0 block"
                    : "opacity-0 scale-95 translate-x-4 hidden"
                }`}
              >
                <span className="text-sky-400 font-semibold block mb-1">
                  Response System
                </span>
                <span className="text-sky-400">🤖 AI Powered</span> - Advanced
                responses from AI model
                <br />
                <span className="text-amber-400">⚡ Local Response</span> - Fast
                fallback responses
                <br />
                <span className="text-red-400">⚠️ API Error</span> - Using
                backup system
              </div>
            </div>

            <div className=" flex items-end justify-start gap-4 mt-4">
              <a
                href="/docs/resume.pdf"
                target="_blank"
                className="btn btn-primary"
              >
                <button className="">Download Resume</button>
                <MdOutlineFileDownload className="size-[20px]" />
              </a>
              <a href="#contactme" className="btn btn-outline">
                <button className="">Contact Me</button>
                <LuMessagesSquare className="size-[20px]" />
              </a>
            </div>
          </div>

          {/* Chat window */}
          <div className="bg-zinc-800/70 w-full h-[450px] rounded-2xl flex flex-col justify-between gap-2 hover:bg-zinc-700/30 transition-all duration-500 hover:ring-1 hover:ring-zinc-500/10 hover:ring-inset">
            <div className="h-full rounded-2xl p-4">
              <div
                ref={chatContainerRef}
                className="h-[350px] overflow-y-scroll scrollbar-thin flex flex-col gap-4 px-2"
              >
                {messages.map((msg, i) =>
                  msg.sender === "bot" ? (
                    <div className="flex items-start gap-3" key={i}>
                      <div className="flex items-center justify-center bg-sky-700 p-2 rounded-full mt-1">
                        <RiRobot2Fill className="size-5" />
                      </div>
                      <div className="bg-sky-600/20 ring-1 ring-sky-700/40 px-3 py-2 rounded-lg text-zinc-200 flex-1">
                        <ReadMoreText text={msg.text} maxLines={5} />
                        {renderSourceIndicator(msg.source)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-row-reverse items-start gap-3"
                      key={i}
                    >
                      <div className="flex items-center justify-center bg-emerald-700 p-2 rounded-full mt-1">
                        <FaUser className="size-5" />
                      </div>
                      <div className="bg-emerald-600/20 ring-1 ring-emerald-700/40 px-3 py-2 rounded-lg text-zinc-200">
                        {msg.text}
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-sky-700 p-2 rounded-full">
                      <RiRobot2Fill className="size-5" />
                    </div>
                    <div className="bg-sky-600/20 ring-1 ring-sky-700/40 px-3 py-2 rounded-lg text-zinc-200">
                      <div className="flex items-center gap-2">
                        <div className="">
                          <span className="text-white/80 font-light text-sm inline-block mb-2">
                            Thinking
                          </span>
                          <div className="flex space-x-1 mb-2">
                            <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                            <div
                              className="w-1 h-1 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input box */}
            <div className="px-4 pt-1 pb-4 gap-3 rounded-2xl flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-zinc-800 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-3 py-2 transition-all duration-500 placeholder:text-sm text-sm flex-1"
                placeholder="Hey there, what skills are you best at?"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-zinc-800 text-zinc-200 hover:text-zinc-800 hover:bg-sky-600 px-2 py-1 rounded-lg text-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoSend className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ReadMoreText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLines: PropTypes.number,
};

ReadMoreText.defaultProps = {
  maxLines: 5,
};

export default Chat;
