import { useState, useEffect, useRef } from "react";

const QATerminal = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const terminalPath = "C:\\Users\\elayabarathi > ";

  const terminalLines = [
    {
      id: 1,
      text: "./start qa_session.sh",
      delay: 0,
      color: "",
      isCommand: true,
    },
    {
      id: 2,
      text: "Starting Q&A Session...",
      delay: 500,
      color: "text-muted-foreground",
    },
    {
      id: 3,
      text: "",
      delay: 1000,
      color: "",
    },
    {
      id: 4,
      text: "How did you transition from Biotechnology to Software Development?",
      delay: 1800,
      color: "text-accent-secondary font-medium",
      isCommand: true,
    },
    {
      id: 5,
      text: "My journey started with a genuine curiosity for technology. I realized that biotechnology and software development share a common foundation - both require analytical thinking, problem-solving, and continuous learning. I started learning programming during my college days, and the more I learned, the more passionate I became about building digital solutions.",
      delay: 2400,
      color: "text-muted-foreground",
    },
    {
      id: 6,
      text: "",
      delay: 3400,
      color: "",
    },
    {
      id: 7,
      text: "As a non-CS background developer, don't you feel behind compared to CS graduates?",
      delay: 4200,
      color: "text-accent-secondary font-medium",
      isCommand: true,
    },
    {
      id: 8,
      text: "Not at all! My biotechnology background is actually my unique strength. It gives me a different perspective on problem-solving and innovation. Technology is for everyone - what matters is dedication and continuous learning. I've worked hard to bridge any knowledge gaps through self-study and projects.",
      delay: 4800,
      color: "text-muted-foreground",
    },
    {
      id: 9,
      text: "",
      delay: 5800,
      color: "",
    },
    {
      id: 10,
      text: "How do you stay updated with the rapidly changing technology landscape?",
      delay: 6600,
      color: "text-accent-secondary font-medium",
      isCommand: true,
    },
    {
      id: 11,
      text: "Continuous learning is my mantra!",
      delay: 7200,
      color: "text-muted-foreground",
    },
    {
      id: 12,
      text: "{",
      delay: 7800,
      color: "text-terminal-amber",
    },
    {
      id: 13,
      text: '  "methods": {',
      delay: 8000,
      color: "text-muted-foreground",
    },
    {
      id: 14,
      text: '    "1": "Building real-world projects to apply and reinforce concepts.",',
      delay: 8200,
      color: "text-muted-foreground",
    },
    {
      id: 15,
      text: '    "2": "Following tech communities, blogs, and documentation.",',
      delay: 8400,
      color: "text-muted-foreground",
    },
    {
      id: 16,
      text: '    "3": "Contributing to open source and learning from others.",',
      delay: 8600,
      color: "text-muted-foreground",
    },
    {
      id: 17,
      text: '    "4": "Staying curious and embracing new challenges."',
      delay: 8800,
      color: "text-muted-foreground",
    },
    {
      id: 18,
      text: "  }",
      delay: 9000,
      color: "text-muted-foreground",
    },
    {
      id: 19,
      text: "}",
      delay: 9200,
      color: "text-terminal-amber",
    },
    {
      id: 20,
      text: "",
      delay: 9600,
      color: "",
    },
    {
      id: 21,
      text: "What advice would you give to other non-CS professionals wanting to switch to tech?",
      delay: 10400,
      color: "text-accent-secondary font-medium",
      isCommand: true,
    },
    {
      id: 22,
      text: "Believe in yourself and start today!",
      delay: 11000,
      color: "text-muted-foreground",
    },
    {
      id: 23,
      text: "{",
      delay: 11600,
      color: "text-terminal-amber",
    },
    {
      id: 24,
      text: '  "advice": {',
      delay: 11800,
      color: "text-muted-foreground",
    },
    {
      id: 25,
      text: '    "1": "Start with fundamentals - HTML, CSS, JavaScript.",',
      delay: 12000,
      color: "text-muted-foreground",
    },
    {
      id: 26,
      text: "    \"2\": \"Build projects - it's the best way to learn.\",",
      delay: 12200,
      color: "text-muted-foreground",
    },
    {
      id: 27,
      text: "    \"3\": \"Don't compare - everyone has their own journey.\",",
      delay: 12400,
      color: "text-muted-foreground",
    },
    {
      id: 28,
      text: '    "4": "Stay consistent - small progress every day adds up."',
      delay: 12600,
      color: "text-muted-foreground",
    },
    {
      id: 29,
      text: "  }",
      delay: 12800,
      color: "text-muted-foreground",
    },
    {
      id: 30,
      text: "}",
      delay: 13000,
      color: "text-terminal-amber",
    },
    {
      id: 31,
      text: "",
      delay: 13400,
      color: "",
    },
    {
      id: 32,
      text: "echo $MOTIVATION",
      delay: 14200,
      color: "",
      isCommand: true,
    },
    {
      id: 33,
      text: '"Your background doesn\'t define your future - your actions do!"',
      delay: 14800,
      color: "text-terminal-green font-medium",
    },
    {
      id: 34,
      text: "",
      delay: 15400,
      color: "",
    },
    {
      id: 35,
      text: "exit",
      delay: 16000,
      color: "",
      isCommand: true,
    },
    {
      id: 36,
      text: "Session ended.",
      delay: 16400,
      color: "text-muted-foreground",
    },
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
          if (prev.some((p) => p.id === line.id)) {
            return prev;
          }
          return [...prev, line];
        });

        if (line.id === 36) {
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
          if (prev.some((p) => p.id === line.id)) {
            return prev;
          }
          return [...prev, line];
        });

        if (line.id === 36) {
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

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section
      id="qa-terminal"
      className="section w-full mx-auto h-[90vh] flex flex-col"
    >
      <div className="mb-8">
        <span className="section-label mb-4">
          <span className="dot animate-pulse-glow"></span>
          <span>Q&A Terminal</span>
        </span>
        <h2 className="headline-2 text-foreground mb-3">
          A Conversation <span className="gold-text">Inquiries</span>
        </h2>
        <p className="body-text text-muted-foreground max-w-[50ch]">
          A live terminal session answering common questions about my journey
          and experience.
        </p>
      </div>

      <div className="terminal-window flex-1">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="ml-4 text-muted-foreground text-sm font-mono">
              bash — qa_session
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

        <div
          ref={terminalBodyRef}
          className="terminal-body scroll-smooth"
        >
          <div className="space-y-1">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`${line.color} break-words whitespace-pre-wrap`}
              >
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
        </div>
      </div>
    </section>
  );
};

export default QATerminal;
