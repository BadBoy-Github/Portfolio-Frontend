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
    { id: 1, text: "echo $NAME", delay: 0, color: "text-muted-foreground", isCommand: true },
    { id: 2, text: personalDetails.name, delay: 400, color: "text-terminal-green font-bold text-lg" },
    { id: 3, text: "Searching personal details...", delay: 1000, color: "text-muted-foreground", isCommand: true },
    { id: 4, text: "cat personal_details.json", delay: 1800, color: "text-muted-foreground", isCommand: true },
    { id: 5, text: `{`, delay: 2200, color: "text-terminal-amber" },
    { id: 6, text: `  "name": "${personalDetails.name}",`, delay: 2400, color: "text-muted-foreground" },
    { id: 7, text: `  "age": "${personalDetails.age} years",`, delay: 2600, color: "text-muted-foreground" },
    { id: 8, text: `  "dob": "${personalDetails.dateOfBirth}",`, delay: 2800, color: "text-muted-foreground" },
    { id: 9, text: `  "location": "${personalDetails.location}",`, delay: 3000, color: "text-muted-foreground" },
    { id: 10, text: `  "blood_group": "${personalDetails.bloodGroup}",`, delay: 3200, color: "text-muted-foreground" },
    { id: 11, text: `  "hobbies": [${personalDetails.hobbies.map((h) => `"${h}"`).join(", ")}],`, delay: 3400, color: "text-muted-foreground" },
    { id: 12, text: `  "goal": "${personalDetails.goal}"`, delay: 3600, color: "text-muted-foreground" },
    { id: 13, text: `}`, delay: 4000, color: "text-terminal-amber" },
    { id: 14, text: "", delay: 4400, color: "" },
    { id: 15, text: "Searching professional details...", delay: 4800, color: "text-muted-foreground", isCommand: true },
    { id: 16, text: "cat professional_details.json", delay: 5400, color: "text-muted-foreground", isCommand: true },
    { id: 17, text: `{`, delay: 5800, color: "text-terminal-amber" },
    { id: 18, text: `  "education": "${professionalDetails.education}",`, delay: 6000, color: "text-muted-foreground" },
    { id: 19, text: `  "status": "${professionalDetails.status}",`, delay: 6200, color: "text-muted-foreground" },
    { id: 20, text: `  "skills": [${professionalDetails.skills.map((s) => `"${s}"`).join(", ")}],`, delay: 6400, color: "text-muted-foreground" },
    { id: 21, text: `  "interests": [${professionalDetails.interests.map((i) => `"${i}"`).join(", ")}]`, delay: 6600, color: "text-muted-foreground" },
    { id: 22, text: `}`, delay: 6800, color: "text-terminal-amber" },
    { id: 23, text: "", delay: 7200, color: "" },
    { id: 24, text: "cat status.txt", delay: 7600, color: "text-muted-foreground", isCommand: true },
    { id: 25, text: professionalDetails.status, delay: 8000, color: "text-terminal-green font-bold" },
    { id: 26, text: "echo $AVAILABLE", delay: 8600, color: "text-muted-foreground", isCommand: true },
    { id: 27, text: professionalDetails.available ? "true - Open to opportunities and collaborations!" : "false", delay: 9000, color: professionalDetails.available ? "text-terminal-green" : "text-error" },
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
        if (line.id === 27) {
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
        if (line.id === 27) {
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
    <section id="about-terminal" className="section w-full mx-auto h-[90vh] flex flex-col">
      <div className="mb-8">
        <span className="section-label mb-4">
          <span className="dot"></span>
          <span>About Terminal</span>
        </span>
        <h2 className="headline-2 text-foreground mb-3">
          System <span className="gold-text">Diagnostics</span>
        </h2>
        <p className="body-text text-muted-foreground max-w-[50ch]">
          A diagnostic view into my background, skills, and professional status.
        </p>
      </div>

      <div className="terminal-window flex-1">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="ml-4 text-muted-foreground text-sm font-mono">
              bash — about
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

export default AboutTerminal;
