import { useState, useEffect, useRef } from "react";

const AboutTerminal = () => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);

  const terminalPath = "C:\\Users\\elayabarathi >";

  // Personal details - Update these with actual information
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

  // Professional details - Update these with actual information
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
    // Name
    {
      id: 1,
      text: " echo $NAME",
      delay: 0,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 2,
      text: personalDetails.name,
      delay: 400,
      color: "text-green-400 font-bold text-lg",
    },

    // Searching for personal details
    {
      id: 3,
      text: " Searching personal details...",
      delay: 1000,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 4,
      text: " cat personal_details.json",
      delay: 1800,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 5,
      text: `{`,
      delay: 2200,
      color: "text-yellow-400",
    },
    {
      id: 6,
      text: `  "name": "${personalDetails.name}",`,
      delay: 2400,
      color: "text-zinc-300",
    },
    {
      id: 7,
      text: `  "age": "${personalDetails.age} years",`,
      delay: 2600,
      color: "text-zinc-300",
    },
    {
      id: 8,
      text: `  "dob": "${personalDetails.dateOfBirth}",`,
      delay: 2800,
      color: "text-zinc-300",
    },
    {
      id: 9,
      text: `  "marital_status": "${personalDetails.maritalStatus}",`,
      delay: 3000,
      color: "text-zinc-300",
    },
    {
      id: 10,
      text: `  "location": "${personalDetails.location}",`,
      delay: 3200,
      color: "text-zinc-300",
    },
    {
      id: 11,
      text: `  "blood_group": "${personalDetails.bloodGroup}",`,
      delay: 3400,
      color: "text-zinc-300",
    },
    {
      id: 12,
      text: `  "hobbies": [${personalDetails.hobbies.map((h) => `"${h}"`).join(", ")}],`,
      delay: 3600,
      color: "text-zinc-300",
    },
    {
      id: 13,
      text: `  "goal": "${personalDetails.goal}"`,
      delay: 3800,
      color: "text-zinc-300",
    },
    {
      id: 14,
      text: `}`,
      delay: 4000,
      color: "text-yellow-400",
    },

    // Searching for professional details
    {
      id: 15,
      text: "",
      delay: 4400,
      color: "",
    },
    {
      id: 16,
      text: " Searching professional details...",
      delay: 4800,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 17,
      text: " cat professional_details.json",
      delay: 5400,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 18,
      text: `{`,
      delay: 5800,
      color: "text-yellow-400",
    },
    {
      id: 19,
      text: `  "education": "${professionalDetails.education}",`,
      delay: 6000,
      color: "text-zinc-300",
    },
    {
      id: 20,
      text: `  "status": "${professionalDetails.status}",`,
      delay: 6200,
      color: "text-zinc-300",
    },
    {
      id: 21,
      text: `  "skills": [${professionalDetails.skills.map((s) => `"${s}"`).join(", ")}],`,
      delay: 6400,
      color: "text-zinc-300",
    },
    {
      id: 22,
      text: `  "interests": [${professionalDetails.interests.map((i) => `"${i}"`).join(", ")}]`,
      delay: 6600,
      color: "text-zinc-300",
    },
    {
      id: 23,
      text: `}`,
      delay: 6800,
      color: "text-yellow-400",
    },

    // Status
    {
      id: 24,
      text: "",
      delay: 7200,
      color: "",
    },
    {
      id: 25,
      text: " cat status.txt",
      delay: 7600,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 26,
      text: professionalDetails.status,
      delay: 8000,
      color: "text-green-400 font-bold",
    },

    // Available
    {
      id: 27,
      text: " echo $AVAILABLE",
      delay: 8600,
      color: "text-zinc-400",
      isCommand: true,
    },
    {
      id: 28,
      text: professionalDetails.available
        ? "true - Open to opportunities and collaborations!"
        : "false",
      delay: 9000,
      color: professionalDetails.available ? "text-green-400" : "text-red-400",
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

        if (line.id === 28) {
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
        if (line.id === 28) {
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
    <div className="w-full mx-auto mt-12">
      {/* Terminal Window */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-zinc-500 text-sm font-mono">
              bash — about
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
        <div className="p-6 font-mono text-sm">
          {/* Terminal Output */}
          <div className="space-y-1">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`${line.color} break-words whitespace-pre-wrap`}
              >
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
        </div>
      </div>
    </div>
  );
};

export default AboutTerminal;
