import { useState, useEffect, useRef } from "react";

const AboutTerminal = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const terminalPath = "C:\\Users\\elayabarathi >";

  const personalDetails = {
    name: "Elayabarathi M V",
    age: "23",
    dateOfBirth: "28-01-2003",
    maritalStatus: "Single",
    location: "Chennai, Tamil Nadu, India",
    hobbies: [
      "Web Development",
      "UI/UX Design",
      "Graphic Design",
      "Learning New Technologies",
    ],
    goal: "To build innovative solutions that make a positive impact",
    bloodGroup: "O+",
  };

  const professionalDetails = {
    education: "B.Tech Biotechnology - K.S.Rangasamy College of Technology",
    skills: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "Java",
      "Python",
      "MongoDB",
      "SQL",
      "HTML",
      "CSS",
    ],
    interests: [
      "Web Development",
      "Open Source",
      "AI/ML",
      "UI/UX Design",
      "Problem Solving",
    ],
    status: "Full Stack Developer & Software Developer",
    available: true,
  };

  const terminalLines = [
    { id: 1, text: " echo $NAME", delay: 0, color: "", isCommand: true },
    { id: 2, text: personalDetails.name, delay: 400, color: "text-ink font-bold text-lg" },
    { id: 3, text: " Searching personal details...", delay: 1000, color: "", isCommand: true },
    { id: 4, text: " cat personal_details.json", delay: 1800, color: "", isCommand: true },
    { id: 5, text: `{`, delay: 2200, color: "text-marker" },
    { id: 6, text: `  "name": "${personalDetails.name}",`, delay: 2400, color: "text-ink" },
    { id: 7, text: `  "age": "${personalDetails.age} years",`, delay: 2600, color: "text-ink" },
    { id: 8, text: `  "dob": "${personalDetails.dateOfBirth}",`, delay: 2800, color: "text-ink" },
    { id: 9, text: `  "marital_status": "${personalDetails.maritalStatus}",`, delay: 3000, color: "text-ink" },
    { id: 10, text: `  "location": "${personalDetails.location}",`, delay: 3200, color: "text-ink" },
    { id: 11, text: `  "blood_group": "${personalDetails.bloodGroup}",`, delay: 3400, color: "text-ink" },
    { id: 12, text: `  "hobbies": [${personalDetails.hobbies.map((h) => `"${h}"`).join(", ")}],`, delay: 3600, color: "text-ink" },
    { id: 13, text: `  "goal": "${personalDetails.goal}"`, delay: 3800, color: "text-ink" },
    { id: 14, text: `}`, delay: 4000, color: "text-marker" },
    { id: 15, text: "", delay: 4400, color: "" },
    { id: 16, text: " Searching professional details...", delay: 4800, color: "", isCommand: true },
    { id: 17, text: " cat professional_details.json", delay: 5400, color: "", isCommand: true },
    { id: 18, text: `{`, delay: 5800, color: "text-marker" },
    { id: 19, text: `  "education": "${professionalDetails.education}",`, delay: 6000, color: "text-ink" },
    { id: 20, text: `  "status": "${professionalDetails.status}",`, delay: 6200, color: "text-ink" },
    { id: 21, text: `  "skills": [${professionalDetails.skills.map((s) => `"${s}"`).join(", ")}],`, delay: 6400, color: "text-ink" },
    { id: 22, text: `  "interests": [${professionalDetails.interests.map((i) => `"${i}"`).join(", ")}]`, delay: 6600, color: "text-ink" },
    { id: 23, text: `}`, delay: 6800, color: "text-marker" },
    { id: 24, text: "", delay: 7200, color: "" },
    { id: 25, text: " cat status.txt", delay: 7600, color: "", isCommand: true },
    { id: 26, text: professionalDetails.status, delay: 8000, color: "text-green-600 font-bold" },
    { id: 27, text: " echo $AVAILABLE", delay: 8600, color: "", isCommand: true },
    { id: 28, text: professionalDetails.available ? "true - Open to opportunities and collaborations!" : "false", delay: 9000, color: professionalDetails.available ? "text-green-600" : "text-accent-red" },
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

        if (line.id === 28) {
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

        if (line.id === 28) {
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

  const scrollTerminal = (direction) => {
    if (terminalBodyRef.current) {
      const amount = 200;
      terminalBodyRef.current.scrollTop += direction === 'up' ? -amount : amount;
    }
  };

  return (
    <section id="about-terminal" className="w-full mx-auto section h-[90vh] flex flex-col">
      <div className="bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard-lg overflow-hidden -rotate-[0.5deg] flex flex-col flex-1 min-h-0">
        <span className="tape" aria-hidden="true" />

        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-dashed border-ink/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-wobbly-sm bg-marker border-2 border-ink" />
            <span className="w-4 h-4 rounded-wobbly-sm bg-postit border-2 border-ink" />
            <span className="w-4 h-4 rounded-wobbly-sm bg-ballpoint border-2 border-ink" />
            <span className="ml-4 text-ink-soft text-base font-mono">
              bash — about
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reloadTerminal}
              aria-label="Replay terminal"
              title="Replay"
              className="w-10 h-10 grid place-items-center text-ink-soft border-2 border-ink rounded-wobbly-sm bg-paper-card transition-transform duration-100 hover:bg-postit hover:text-ink hover:rotate-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative flex-1 min-h-0">
          <div ref={terminalBodyRef} className="h-full p-6 font-mono text-sm overflow-hidden flex flex-col scroll-smooth">
            <div className="space-y-1">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={`${line.color} break-words whitespace-pre-wrap`}
                >
                  {line.isCommand ? (
                    <>
                      <span className="text-ballpoint">{terminalPath}</span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                  {line.id === lines.length && showCursor && !animationComplete && (
                    <span className="inline-block w-2 h-4 bg-ink ml-1 animate-pulse"></span>
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

export default AboutTerminal;
