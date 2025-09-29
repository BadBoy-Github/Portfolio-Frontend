// React & icons
import { useState, useEffect, useRef } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I'm a friendly Chatbot that lets you interact with the portfolio and CV. How can I help you?",
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
  // Add this to your handleSend function in Chat.jsx
  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
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
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `I'm having trouble connecting right now. Please try again later! \n Error: ${err.message}`,
        },
      ]);
    }

    setLoading(false);
    setInput("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

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
          <div>
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
            <a
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-sky-600 hover:bg-sky-400 text-zinc-800 px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 mt-4">
                Download Resume
                <span
                  className="material-symbols-rounded size-3"
                  aria-hidden="true"
                >
                  download
                </span>
              </button>
            </a>
          </div>

          {/* Chat window */}
          <div className="bg-zinc-800/70 w-full h-[400px] rounded-2xl flex flex-col justify-between gap-2 hover:bg-zinc-700/30 transition-all duration-500 hover:ring-1 hover:ring-zinc-500/10 hover:ring-inset">
            <div className="h-full rounded-2xl p-4">
              <div
                ref={chatContainerRef}
                className="h-[300px] overflow-y-scroll scrollbar-thin flex flex-col gap-4 px-2"
              >
                {messages.map((msg, i) =>
                  msg.sender === "bot" ? (
                    <div
                      className="flex items-center gap-3"
                      key={i}
                    >
                      <div className="flex items-center justify-center bg-sky-700 p-2 rounded-full">
                        <RiRobot2Fill className="size-5" />
                      </div>
                      <p className="bg-sky-600/20 ring-1 ring-sky-700/40 px-2 py-1 rounded-lg text-zinc-200">
                        {msg.text}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="flex flex-row-reverse items-center gap-3"
                      key={i}
                    >
                      <div className="flex items-center justify-center bg-emerald-700 p-2 rounded-full">
                        <FaUser className="size-5" />
                      </div>
                      <p className="bg-emerald-600/20 ring-1 ring-emerald-700/40 px-2 py-1 rounded-lg text-zinc-200">
                        {msg.text}
                      </p>
                    </div>
                  )
                )}

                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-sky-700 p-2 rounded-full">
                      <RiRobot2Fill className="size-5" />
                    </div>
                    <p className="bg-sky-600/20 ring-1 ring-sky-700/40 px-2 py-1 rounded-lg text-zinc-200 animate-pulse">
                      Typing...
                    </p>
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
                className="bg-zinc-800 text-zinc-200 hover:text-zinc-800 hover:bg-sky-600 px-2 py-1 rounded-lg text-sm transition-all duration-300 flex items-center justify-center"
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

export default Chat;
