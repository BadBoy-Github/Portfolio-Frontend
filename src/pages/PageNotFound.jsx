import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const PageNotFound = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);

  const terminalPath = "C:\\Users\\elayabarathi >";

  const terminalLines = [
    { id: 1, text: "Initiating connection...", delay: 0, color: "", isCommand: true },
    { id: 2, text: "Searching for requested resource...", delay: 800, color: "", isCommand: true },
    { id: 3, text: "Checking route configuration...", delay: 1600, color: "", isCommand: true },
    { id: 4, text: "Verifying file existence...", delay: 2400, color: "", isCommand: true },
    { id: 5, text: "", delay: 3200, color: "" },
    { id: 6, text: "ERROR 404", delay: 3500, color: "text-error font-mono text-lg" },
    { id: 7, text: "The page/file you want to access is not available.", delay: 4000, color: "text-muted-foreground" },
    { id: 8, text: "Please check the path and try again.", delay: 4500, color: "text-terminal-amber" },
    { id: 9, text: "", delay: 5000, color: "" },
    { id: 10, text: "Session terminated.", delay: 5500, color: "", isCommand: true },
  ];

  const reloadTerminal = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setLines([]);
    setAnimationComplete(false);
    setShowCursor(true);

    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    terminalLines.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setLines((prev) => {
          if (prev.some((p) => p.id === line.id)) return prev;
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
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    terminalLines.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setLines((prev) => {
          if (prev.some((p) => p.id === line.id)) return prev;
          return [...prev, line];
        });
        if (line.id === 10) {
          setTimeout(() => setAnimationComplete(true), 100);
        }
      }, line.delay);
      timeoutsRef.current.push(timeoutId);
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="flex items-center gap-2">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="ml-4 text-muted-foreground text-sm font-mono">
                bash — 404
              </span>
            </div>
            <button
              onClick={reloadTerminal}
              className="text-muted-foreground hover:text-terminal-green transition-colors p-1 font-mono"
              title="Reload terminal"
            >
              &#x21bb;
            </button>
          </div>

          <div className="terminal-body min-h-[400px]">
            <div className="space-y-1">
              {lines.map((line) => (
                <div key={line.id} className={`${line.color} break-words`}>
                  {line.isCommand ? (
                    <>
                      <span className="text-accent-secondary">{terminalPath}</span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                  {line.id === lines.length &&
                    showCursor &&
                    !animationComplete && (
                      <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-blink"></span>
                    )}
                </div>
              ))}
            </div>

            {animationComplete && (
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-secondary text-accent-foreground rounded-lg hover:shadow-glow-blue transition-all duration-200 group"
                >
                  <IoHome className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
