import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "../components/Button";

const TERMINAL_PATH = "C:\\Users\\elayabarathi >";

const TERMINAL_LINES = [
  { id: 1, text: " Initiating connection...", delay: 0, color: "", isCommand: true },
  { id: 2, text: " Searching for requested resource...", delay: 800, color: "", isCommand: true },
  { id: 3, text: " Checking route configuration...", delay: 1600, color: "", isCommand: true },
  { id: 4, text: " Verifying file existence...", delay: 2400, color: "", isCommand: true },
  { id: 5, text: "", delay: 3200, color: "" },
  { id: 6, text: "ERROR 404", delay: 3500, color: "font-display text-3xl text-marker" },
  { id: 7, text: "The page/file you want to access is not available.", delay: 4000, color: "text-ink" },
  { id: 8, text: "Please check the path and try again.", delay: 4500, color: "text-ink-soft" },
  { id: 9, text: "", delay: 5000, color: "" },
  { id: 10, text: " Session terminated.", delay: 5500, color: "", isCommand: true },
];

const PageNotFound = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);

  const runTerminal = useCallback(() => {
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

    TERMINAL_LINES.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setLines((prev) =>
          prev.some((p) => p.id === line.id) ? prev : [...prev, line],
        );

        if (line.id === 10) {
          const completeId = setTimeout(() => setAnimationComplete(true), 100);
          timeoutsRef.current.push(completeId);
        }
      }, line.delay);
      timeoutsRef.current.push(timeoutId);
    });
  }, []);

  useEffect(() => {
    runTerminal();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [runTerminal]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="card rounded-wobbly-lg -rotate-1 overflow-hidden">
          <span className="tape" aria-hidden="true" />

          <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-ink/20">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-wobbly-sm bg-marker border-2 border-ink" />
              <span className="w-4 h-4 rounded-wobbly-sm bg-postit border-2 border-ink" />
              <span className="w-4 h-4 rounded-wobbly-sm bg-ballpoint border-2 border-ink" />
              <span className="ml-4 text-ink-faint text-base font-mono">
                not-found.md
              </span>
            </div>

            <button
              type="button"
              onClick={runTerminal}
              aria-label="Replay the 404 sequence"
              title="Replay"
              className="w-10 h-10 grid place-items-center text-ink-soft border-2 border-ink rounded-wobbly-sm bg-paper-card transition-transform duration-100 hover:bg-postit hover:text-ink hover:rotate-6"
            >
              <RotateCcw size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <div className="p-6 font-hand text-lg md:text-xl min-h-[400px]">
            <div className="space-y-2">
              {lines.map((line) => (
                <div key={line.id} className={`${line.color} break-words`}>
                  {line.isCommand ? (
                    <>
                      <span className="font-mono text-base text-ballpoint">
                        {TERMINAL_PATH}
                      </span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                  {line.id === lines.length && showCursor && !animationComplete && (
                    <span className="inline-block w-2 h-5 bg-ink ml-1 align-middle animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {animationComplete && (
              <div className="mt-10">
                <Button href="/" icon={ArrowLeft}>
                  Return Home
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;