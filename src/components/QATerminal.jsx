import { useCallback, useEffect, useRef, useState } from "react";
import { FastForward, RotateCcw } from "lucide-react";

const TERMINAL_PATH = "C:\\Users\\elayabarathi > ";

const TERMINAL_LINES = [
  { id: 1, text: "./start qa_session.sh", delay: 0, color: "", isCommand: true },
  { id: 2, text: "Starting Q&A Session...", delay: 500, color: "text-ink-soft" },
  { id: 3, text: "", delay: 1000, color: "" },

  {
    id: 4,
    text: "How did you transition from Biotechnology to Software Development?",
    delay: 1800,
    color: "text-ballpoint font-medium",
    isCommand: true,
  },
  {
    id: 5,
    text: "My journey started with a genuine curiosity for technology. I realized that biotechnology and software development share a common foundation - both require analytical thinking, problem-solving, and continuous learning. I started learning programming during my college days, and the more I learned, the more passionate I became about building digital solutions.",
    delay: 2400,
    color: "text-ink",
  },
  { id: 6, text: "", delay: 3400, color: "" },

  {
    id: 7,
    text: "As a non-CS background developer, don't you feel behind compared to CS graduates?",
    delay: 4200,
    color: "text-ballpoint font-medium",
    isCommand: true,
  },
  {
    id: 8,
    text: "Not at all! My biotechnology background is actually my unique strength. It gives me a different perspective on problem-solving and innovation. Technology is for everyone - what matters is dedication and continuous learning. I've worked hard to bridge any knowledge gaps through self-study and projects.",
    delay: 4800,
    color: "text-ink",
  },
  { id: 9, text: "", delay: 5800, color: "" },

  {
    id: 10,
    text: "How do you stay updated with the rapidly changing technology landscape?",
    delay: 6600,
    color: "text-ballpoint font-medium",
    isCommand: true,
  },
  { id: 11, text: "Continuous learning is my mantra!", delay: 7200, color: "text-ink" },
  { id: 12, text: "{", delay: 7800, color: "text-marker" },
  { id: 13, text: '  "methods": {', delay: 8000, color: "text-ink" },
  {
    id: 14,
    text: '    "1": "Building real-world projects to apply and reinforce concepts.",',
    delay: 8200,
    color: "text-ink",
  },
  {
    id: 15,
    text: '    "2": "Following tech communities, blogs, and documentation.",',
    delay: 8400,
    color: "text-ink",
  },
  {
    id: 16,
    text: '    "3": "Contributing to open source and learning from others.",',
    delay: 8600,
    color: "text-ink",
  },
  {
    id: 17,
    text: '    "4": "Staying curious and embracing new challenges."',
    delay: 8800,
    color: "text-ink",
  },
  { id: 18, text: "  }", delay: 9000, color: "text-ink" },
  { id: 19, text: "}", delay: 9200, color: "text-marker" },
  { id: 20, text: "", delay: 9600, color: "" },

  {
    id: 21,
    text: "What advice would you give to other non-CS professionals wanting to switch to tech?",
    delay: 10400,
    color: "text-ballpoint font-medium",
    isCommand: true,
  },
  { id: 22, text: "Believe in yourself and start today!", delay: 11000, color: "text-ink" },
  { id: 23, text: "{", delay: 11600, color: "text-marker" },
  { id: 24, text: '  "advice": {', delay: 11800, color: "text-ink" },
  {
    id: 25,
    text: '    "1": "Start with fundamentals - HTML, CSS, JavaScript.",',
    delay: 12000,
    color: "text-ink",
  },
  {
    id: 26,
    text: '    "2": "Build projects - it\'s the best way to learn.",',
    delay: 12200,
    color: "text-ink",
  },
  {
    id: 27,
    text: '    "3": "Don\'t compare - everyone has their own journey.",',
    delay: 12400,
    color: "text-ink",
  },
  {
    id: 28,
    text: '    "4": "Stay consistent - small progress every day adds up."',
    delay: 12600,
    color: "text-ink",
  },
  { id: 29, text: "  }", delay: 12800, color: "text-ink" },
  { id: 30, text: "}", delay: 13000, color: "text-marker" },
  { id: 31, text: "", delay: 13400, color: "" },

  { id: 32, text: "echo $MOTIVATION", delay: 14200, color: "", isCommand: true },
  {
    id: 33,
    text: '"Your background doesn\'t define your future - your actions do!"',
    delay: 14800,
    color: "text-marker font-medium",
  },
  { id: 34, text: "", delay: 15400, color: "" },
  { id: 35, text: "exit", delay: 16000, color: "", isCommand: true },
  { id: 36, text: "Session ended.", delay: 16400, color: "text-ink-faint" },
];

const LAST_LINE_ID = TERMINAL_LINES[TERMINAL_LINES.length - 1].id;

const QATerminal = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const runTerminal = useCallback(() => {
    clearTimers();

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

        if (line.id === LAST_LINE_ID) {
          const completeId = setTimeout(() => setAnimationComplete(true), 100);
          timeoutsRef.current.push(completeId);
        }
      }, line.delay);
      timeoutsRef.current.push(timeoutId);
    });
  }, [clearTimers]);

  const finishTerminal = useCallback(() => {
    clearTimers();
    setLines(TERMINAL_LINES);
    setShowCursor(false);
    setAnimationComplete(true);
  }, [clearTimers]);

  useEffect(() => {
    runTerminal();

    return clearTimers;
  }, [runTerminal, clearTimers]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const scrollTerminal = (direction) => {
    if (terminalBodyRef.current) {
      const amount = 200;
      terminalBodyRef.current.scrollTop += direction === 'up' ? -amount : amount;
    }
  };

  return (
    <section id="qa-terminal" className="section">
      <div className="relative flex flex-col h-[85vh] min-h-[420px] bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard-lg overflow-hidden -rotate-[0.5deg]">
        <span className="tape" aria-hidden="true" />

        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-dashed border-ink/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-wobbly-sm bg-marker border-2 border-ink" />
            <span className="w-4 h-4 rounded-wobbly-sm bg-postit border-2 border-ink" />
            <span className="w-4 h-4 rounded-wobbly-sm bg-ballpoint border-2 border-ink" />
            <span className="ml-3 text-ink-soft text-base font-mono">
              qa_session.sh
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!animationComplete && (
              <button
                type="button"
                onClick={finishTerminal}
                aria-label="Skip to the end of the transcript"
                title="Skip"
                className="flex items-center gap-1.5 h-10 px-3 border-2 border-ink rounded-wobbly-sm bg-paper-card text-ink text-base transition-transform duration-100 hover:bg-postit hover:rotate-3"
              >
                <FastForward size={16} strokeWidth={2.5} aria-hidden="true" />
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={runTerminal}
              aria-label="Replay the Q&A transcript"
              title="Replay"
              className="w-10 h-10 grid place-items-center border-2 border-ink rounded-wobbly-sm bg-paper-card text-ink transition-transform duration-100 hover:bg-postit hover:rotate-6"
            >
              <RotateCcw size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 min-h-0">
          <div
            ref={terminalBodyRef}
            className="h-full p-5 md:p-6 font-mono text-base md:text-lg leading-relaxed overflow-hidden flex flex-col scroll-smooth"
          >
            <div className="space-y-1">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={`${line.color} break-words whitespace-pre-wrap`}
                >
                  {line.isCommand ? (
                    <>
                      <span className="text-ink-faint">{TERMINAL_PATH}</span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                  {line.id === lines.length &&
                    showCursor &&
                    !animationComplete && (
                      <span className="inline-block w-2 h-4 bg-marker ml-1 align-middle animate-pulse" />
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => scrollTerminal('up')}
              className="bg-paper-card hover:bg-paper text-ink p-2 rounded-wobbly-sm shadow-hard transition-colors"
              aria-label="Scroll up"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M10 14l-5-5h10l-5 5z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollTerminal('down')}
              className="bg-paper-card hover:bg-paper text-ink p-2 rounded-wobbly-sm shadow-hard transition-colors"
              aria-label="Scroll down"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M10 6l5 5H5l5-5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QATerminal;