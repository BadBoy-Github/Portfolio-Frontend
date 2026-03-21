import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);

  const terminalPath = "C:\\Users\\elayabarathi >";

  const terminalLines = [
    {
      id: 1,
      text: " Initiating connection...",
      delay: 0,
      color: "",
      isCommand: true,
    },
    {
      id: 2,
      text: " Searching for requested resource...",
      delay: 800,
      color: "",
      isCommand: true,
    },
    {
      id: 3,
      text: " Checking route configuration...",
      delay: 1600,
      color: "",
      isCommand: true,
    },
    {
      id: 4,
      text: " Verifying file existence...",
      delay: 2400,
      color: "",
      isCommand: true,
    },
    { id: 5, text: "", delay: 3200, color: "" },
    {
      id: 6,
      text: "ERROR 404",
      delay: 3500,
      color: "text-red-500 font-extrabold text-lg",
    },
    {
      id: 7,
      text: "The page/file you want to access is not available.",
      delay: 4000,
      color: "text-red-400",
    },
    {
      id: 8,
      text: "Please check the path and try again.",
      delay: 4500,
      color: "text-yellow-500",
    },
    { id: 9, text: "", delay: 5000, color: "" },
    {
      id: 10,
      text: " Session terminated.",
      delay: 5500,
      color: "",
      isCommand: true,
    },
  ];

  const reloadTerminal = () => {
    // Clear all timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset state
    setLines([]);
    setAnimationComplete(false);
    setShowCursor(true);

    // Restart animation
    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    terminalLines.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setLines((prev) => {
          if (prev.some((p) => p.id === line.id)) {
            return prev;
          }
          return [...prev, line];
        });

        if (line.id === 10) {
          setTimeout(() => setAnimationComplete(true), 100);
        }
      }, line.delay);
      timeoutsRef.current.push(timeoutId);
    });
  };

  useEffect(() => {
    // Clear any existing timeouts on mount
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Blink cursor effect
    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    // Add lines progressively
    terminalLines.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setLines((prev) => {
          // Check if this line already exists
          if (prev.some((p) => p.id === line.id)) {
            return prev;
          }
          return [...prev, line];
        });

        // Mark animation complete when last line is added
        if (line.id === 10) {
          setTimeout(() => setAnimationComplete(true), 100);
        }
      }, line.delay);
      timeoutsRef.current.push(timeoutId);
    });

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-2xl">
        {/* Terminal Window */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-zinc-500 text-sm font-mono">
                bash — 404
              </span>
            </div>
            <button
              onClick={reloadTerminal}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              title="Reload terminal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm min-h-[400px]">
            {/* ASCII Art Header */}

            {/* Terminal Output */}
            <div className="space-y-1">
              {lines.map((line) => (
                <div key={line.id} className={`${line.color} break-words`}>
                  {line.isCommand ? (
                    <>
                      <span className="text-sky-400">{terminalPath}</span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                  {line.id === lines.length &&
                    showCursor &&
                    !animationComplete && (
                      <span className="inline-block w-2 h-4 bg-zinc-400 ml-1 animate-pulse"></span>
                    )}
                </div>
              ))}
            </div>

            {/* Action Buttons - shown after animation */}
            {animationComplete && (
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                >
                  <span>←</span>
                  <span>Return Home</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
