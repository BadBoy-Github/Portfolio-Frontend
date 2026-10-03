// React
import { useState, useEffect, useRef } from "react";

// Icons
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiExclamationMarkBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
          className="text-terminal-amber hover:text-terminal-green text-sm mt-1 font-medium transition-colors duration-200"
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
      text: "Hi, I am Portfolio-GPT, a friendly Chatbot that lets you interact with Elayabarathi M V's portfolio and CV. How can I help you?",
      source: "local", // Added source for initial message
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);
  const [isChatHovered, setIsChatHovered] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Handle mouse wheel scroll on chat container
  const handleWheel = (e) => {
    if (!isChatHovered) return;

    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      // If at top and scrolling up, or at bottom and scrolling down, let page scroll
      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        // Allow page to scroll - do nothing
        return;
      }

      // Otherwise, scroll only the chat and prevent page scroll
      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY;
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Add wheel listener with capture to intercept early
    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [isChatHovered]);

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
          <div className="text-xs text-accent-secondary/70 mt-1 flex items-center gap-1">
            🤖 AI Powered
          </div>
        );
      case "local":
        return (
          <div className="text-xs text-terminal-amber/70 mt-1 flex items-center gap-1">
            ⚡ Local Response
          </div>
        );
      case "error":
        return (
          <div className="text-xs text-error/70 mt-1 flex items-center gap-1">
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
    <section id="chatbot" className="section relative">
      <span className="section-label mb-4">
        <span className="dot"></span>
        <span>Chatbot</span>
      </span>
      <h2 className="headline-2">
        Talk With My <span className="gold-text">Portfolio</span>
      </h2>
      <p className="text-muted-foreground mt-3 mb-8 max-w-[50ch]">
        Explore my portfolio, skills, and resume in a conversational way
      </p>

      <div className="bg-card/50 p-7 rounded-2xl md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-4">
        {/* Left side */}
        <div className="relative">
          <h1 className="font-display text-xl font-medium text-accent-secondary">
            About the Chatbot
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            This chatbot is designed to make exploring my portfolio more
            interactive. You can ask questions about my{" "}
            <span className="text-accent-secondary">skills</span>,
            <span className="text-accent-secondary"> projects</span>, or even my
            <span className="text-accent-secondary"> resume</span>, and it will
            guide you to the right information.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Access my <span className="text-accent-secondary">resume</span> or{" "}
            <span className="text-accent-secondary">contact me</span> for
            professional inquiries and collaborations.
          </p>

          <div className="hidden absolute left-2 bottom-0 lg:flex flex-row items-end justify-center gap-1 transition-all duration-300">
            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 transition-all duration-300"
            >
              {isOpen ? (
                <IoClose className="bg-error hover:bg-error/80 active:bg-error/70 size-6 p-1 rounded-full transition-all duration-300" />
              ) : (
                <PiExclamationMarkBold className="bg-accent-secondary hover:bg-accent-secondary/80 active:bg-accent-secondary/70 size-6 p-1 rounded-full transition-all duration-300" />
              )}
            </button>

            {/* Admin Link */}
            <Link
              to="/admin-login"
              className="w-6 h-6 p-1 rounded-full transition-all duration-300 opacity-0 hover:opacity-60 flex items-center justify-center bg-foreground"
            >
              <FaUser className="size-3 text-background" />
            </Link>

            {/* Info Panel */}
            <div
              className={`text-muted-foreground leading-relaxed text-[10px] px-3 py-2 bg-card/70 rounded-xl ring-1 ring-border/10 ring-inset transition-all duration-500 ${
                isOpen
                  ? "opacity-100 scale-100 translate-x-0 block"
                  : "opacity-0 scale-95 translate-x-4 hidden"
              }`}
            >
              <span className="text-accent-secondary font-semibold block mb-1">
                Response System
              </span>
              <span className="text-accent-secondary">🤖 AI Powered</span> -
              Advanced responses from AI model
              <br />
              <span className="text-terminal-amber">⚡ Local Response</span> -
              Fast fallback responses
              <br />
              <span className="text-error">⚠️ API Error</span> - Using backup
              system
            </div>
          </div>

          <div className=" flex items-end justify-start gap-4 mt-4">
            <a
              href="/resume.pdf"
              target="_blank"
              className="btn btn-primary"
            >
              <button className="text-xs md:text-sm">Download Resume</button>
              <MdOutlineFileDownload className="hidden md:block size-[20px]" />
            </a>
            <Link to="/contact" className="btn btn-outline">
              <button className="text-xs md:text-sm">Contact Me</button>
              <LuMessagesSquare className="hidden md:block size-[20px]" />
            </Link>
          </div>
        </div>

        {/* Chat window */}
        <div
          className="bg-card/70 w-full h-[450px] rounded-2xl flex flex-col justify-between gap-2 hover:bg-card/60 transition-all duration-500 hover:ring-1 hover:ring-border/20 hover:ring-inset"
          onMouseEnter={() => setIsChatHovered(true)}
          onMouseLeave={() => setIsChatHovered(false)}
        >
          <div className="h-full rounded-2xl p-4 w-full text-sm md:text-base">
            <div
              ref={chatContainerRef}
              className="h-[350px] overflow-y-scroll scrollbar-thin flex flex-col px-2 w-full"
            >
              {messages.map((msg, i) =>
                msg.sender === "bot" ? (
                  <div
                    className="flex items-start gap-3 mr-0 md:mr-24 my-2"
                    key={i}
                  >
                    <div className="flex items-center justify-center bg-terminal-green/30 p-2 rounded-full mt-1 flex-shrink-0">
                      <RiRobot2Fill className="size-5 text-background" />
                    </div>
                    <div className="bg-terminal-green/15 ring-1 ring-terminal-green/50 px-3 py-2 rounded-lg text-foreground break-words flex-1 min-w-0">
                      <ReadMoreText text={msg.text} maxLines={5} />
                      {renderSourceIndicator(msg.source)}
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-row-reverse items-start gap-3 ml-0 md:ml-24 my-2"
                    key={i}
                  >
                    <div className="flex items-center justify-center bg-terminal-amber/30 p-2 rounded-full mt-1 flex-shrink-0">
                      <FaUser className="size-5 text-background" />
                    </div>
                    <div className="bg-terminal-amber/15 ring-1 ring-terminal-amber/50 px-3 py-2 rounded-lg text-foreground break-words min-w-0 w-fit">
                      {msg.text}
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-terminal-green/30 p-2 rounded-full">
                    <RiRobot2Fill className="size-5 text-background" />
                  </div>
                  <div className="bg-terminal-green/15 ring-1 ring-terminal-green/50 px-3 py-2 rounded-lg text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="">
                        <span className="text-foreground/80 font-light text-sm inline-block mb-2">
                          Thinking
                        </span>
                        <div className="flex space-x-1 mb-2 ml-1">
                          <div className="w-1 h-1 bg-terminal-green rounded-full animate-bounce"></div>
                          <div
                            className="w-1 h-1 bg-terminal-green rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-terminal-green rounded-full animate-bounce"
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
          <form className="px-4 pt-1 pb-4 gap-3 rounded-2xl flex">
            <input
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-muted text-foreground font-mono outline-none border border-input rounded-lg px-3 py-2 transition-all duration-500 placeholder:text-muted-foreground focus:border-accent-secondary focus:ring-1 focus:ring-accent-secondary/30 text-sm flex-1"
              placeholder="Hey there, what skills are you best at?"
            />
            <button
              type="submit"
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-electric text-accent-foreground hover:opacity-90 hover:scale-105 outline-none focus:ring-1 focus:ring-accent-secondary/30 px-2 py-1 rounded-lg text-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-blue"
            >
              <IoSend className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
