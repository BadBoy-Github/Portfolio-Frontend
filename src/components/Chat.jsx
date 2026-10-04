import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiExclamationMarkBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ReadMoreText = ({ text, maxLines = 5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const lineHeight = 20;
    const maxHeight = maxLines * lineHeight;
    if (textRef.current) {
      const actualHeight = textRef.current.scrollHeight;
      setNeedsExpansion(actualHeight > maxHeight);
    }
  }, [text, maxLines]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

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
          type="button"
          onClick={toggleExpanded}
          className="font-hand text-lg text-marker hover:text-ink mt-1 transition-colors duration-200"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

ReadMoreText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLines: PropTypes.number,
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I am Portfolio-GPT, a friendly Chatbot that lets you interact with Elayabarathi M V's portfolio and CV. How can I help you?",
      source: "local",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [isChatHovered, setIsChatHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const scrollChat = (direction) => {
    if (chatContainerRef.current) {
      const amount = 200;
      chatContainerRef.current.scrollTop += direction === 'up' ? -amount : amount;
    }
  };

  const handleWheel = useCallback((e) => {
    if (!isChatHovered) return;
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY;
    }
  }, [isChatHovered]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [handleWheel]);

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
    } catch {
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

  const renderSourceIndicator = (source) => {
    switch (source) {
      case "ai":
        return (
          <div className="font-hand text-base text-ballpoint mt-1 flex items-center gap-1">
            🤖 AI Powered
          </div>
        );
      case "local":
        return (
          <div className="font-hand text-base text-gold mt-1 flex items-center gap-1">
            ⚡ Local Response
          </div>
        );
      case "error":
        return (
          <div className="font-hand text-base text-marker mt-1 flex items-center gap-1">
            ⚠️ API Error
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="chatbot" className="section relative">
      <h2 className="headline-2">Talk With My Portfolio</h2>
      <p className="text-ink-soft mt-3 mb-8 max-w-[50ch]">
        Explore my portfolio, skills, and resume in a conversational way
      </p>

      <Card tone="paper" className="p-6 md:p-10 shadow-hard">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-4">
          {/* Left side */}
          <div className="relative">
            <h1 className="text-xl font-semibold text-marker">
              About the Chatbot
            </h1>
            <p className="mt-3 text-ink-soft leading-relaxed">
              This chatbot is designed to make exploring my portfolio more
              interactive. You can ask questions about my{" "}
              <span className="text-marker">skills</span>,{" "}
              <span className="text-marker">projects</span>, or even my{" "}
              <span className="text-marker">resume</span>, and it will guide
              you to the right information.
            </p>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Access my <span className="text-marker">resume</span> or{" "}
              <span className="text-marker">contact me</span> for professional
              inquiries and collaborations.
            </p>

            <div className="hidden absolute left-2 bottom-0 lg:flex flex-row items-end justify-center gap-2 transition-all duration-300">
              <div className="flex flex-col items-center gap-2">
                <Link
                  to="/admin-login"
                  className="icon-btn icon-btn-quiet"
                  aria-label="Admin sign in"
                  title="Admin"
                >
                  <FaUser className="size-4" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="icon-btn icon-btn-marker"
                  aria-expanded={isOpen}
                  aria-controls="response-system-card"
                  aria-label={
                    isOpen
                      ? "Hide response system details"
                      : "Show response system details"
                  }
                >
                  {isOpen ? (
                    <IoClose className="size-4" aria-hidden="true" />
                  ) : (
                    <PiExclamationMarkBold className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div
                id="response-system-card"
                className={`icon-note transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 scale-100 translate-x-0 block"
                    : "opacity-0 scale-95 translate-x-4 hidden"
                }`}
              >
                <span className="text-marker font-display font-bold block mb-1">
                  Response System
                </span>
                <span className="text-ballpoint">🤖 AI Powered</span> - Advanced
                responses from AI model
                <br />
                <span className="text-gold">⚡ Local Response</span> - Fast
                fallback responses
                <br />
                <span className="text-marker">⚠️ API Error</span> - Using
                backup system
              </div>
            </div>

            <div className="flex items-end justify-start gap-4 mt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                className="btn btn-primary"
              >
                <button type="button" className="text-xs md:text-sm">Download Resume</button>
                <MdOutlineFileDownload className="hidden md:block size-[20px]" />
              </a>
              <Link to="/contact" className="btn btn-outline">
                <button type="button" className="text-xs md:text-sm">Contact Me</button>
                <LuMessagesSquare className="hidden md:block size-[20px]" />
              </Link>
            </div>
          </div>

          {/* Chat window */}
          <Card
            tone="paper"
            decoration="tape"
            className="w-full h-[450px] flex flex-col justify-between gap-2 shadow-hard hover:shadow-hard transition-all duration-500"
            onMouseEnter={() => setIsChatHovered(true)}
            onMouseLeave={() => setIsChatHovered(false)}
          >
            <div className="h-full rounded-wobbly-sm p-4 w-full text-sm md:text-base relative">
              <div
                ref={chatContainerRef}
                className="h-[350px] overflow-hidden flex flex-col px-2 w-full"
              >
                {messages.map((msg, i) =>
                  msg.sender === "bot" ? (
                    <div
                      className="flex items-start gap-3 mr-0 md:mr-24 my-2"
                      key={i}
                    >
                      <div className="flex items-center justify-center bg-marker p-2 rounded-full mt-1 flex-shrink-0 text-ink">
                        <RiRobot2Fill className="size-5" />
                      </div>
                      <div className="bg-paper/80 ring-1 ring-ink/10 px-3 py-2 rounded-wobbly-sm text-ink break-words flex-1 min-w-0">
                        <ReadMoreText text={msg.text} maxLines={5} />
                        {renderSourceIndicator(msg.source)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-row-reverse items-start gap-3 ml-0 md:ml-24 my-2"
                      key={i}
                    >
                      <div className="flex items-center justify-center bg-emerald-700 p-2 rounded-full mt-1 flex-shrink-0">
                        <FaUser className="size-5" />
                      </div>
                      <div className="bg-emerald-600/20 ring-1 ring-emerald-700/40 px-3 py-2 rounded-wobbly-sm text-ink break-words min-w-0 w-fit">
                        {msg.text}
                      </div>
                    </div>
                  ),
                )}

                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-marker p-2 rounded-full text-ink">
                      <RiRobot2Fill className="size-5" />
                    </div>
                    <div className="bg-paper/80 ring-1 ring-ink/10 px-3 py-2 rounded-wobbly-sm text-ink">
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="text-ink/80 font-light text-sm inline-block mb-2">
                            Thinking
                          </span>
                          <div className="flex space-x-1 mb-2 ml-1">
                            <div className="w-1 h-1 bg-ink rounded-full animate-bounce"></div>
                            <div
                              className="w-1 h-1 bg-ink rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-ink rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Scroll Buttons */}
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => scrollChat('up')}
                  className="bg-paper/80 hover:bg-paper text-ink p-2 rounded-wobbly-sm shadow-hard transition-colors"
                  aria-label="Scroll up"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M10 14l-5-5h10l-5 5z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollChat('down')}
                  className="bg-paper/80 hover:bg-paper text-ink p-2 rounded-wobbly-sm shadow-hard transition-colors"
                  aria-label="Scroll down"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M10 6l5 5H5l5-5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Input box */}
            <form className="px-4 pt-1 pb-4 gap-3 rounded-wobbly-sm flex" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input
                type="text"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-paper/80 text-ink outline-none outline-ink/20 hover:outline-marker active:outline-marker rounded-wobbly-sm px-3 py-2 transition-all duration-300 placeholder:text-ink-soft/60 text-sm flex-1"
                placeholder="Hey there, what skills are you best at?"
              />
              <button
                type="submit"
                onClick={handleSend}
                disabled={loading}
                className="bg-paper/80 text-ink hover:text-paper hover:bg-marker outline-none outline-ink/20 hover:outline-marker active:outline-marker px-2 py-1 rounded-wobbly-sm text-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoSend className="size-4" />
              </button>
            </form>
          </Card>
        </div>
      </Card>
    </section>
  );
};

export default Chat;
