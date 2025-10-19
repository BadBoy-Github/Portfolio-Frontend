import AchievementsCard from "./AchievementsCard";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const achievements = [
  {
    title: "SIP 2023 Coordinator",
    tags: [
      "#Leadership",
      "#Event Planning",
      "#Volunteer Coordination",
      "#Student Engagement",
    ],
    date: "2023",
    imgSrc: "/img/achievements/sip.webp",
    desc: "Led Student Induction Program for Biotechnology Dept. Guided new students to adapt and engage effectively.",
  },
  {
    title: "Expo Stall Organizer",
    tags: [
      "#Public Engagement",
      "#Trade Networking",
      "#Institute Representation",
      "#Sustainable Promotion",
    ],
    date: "2023",
    imgSrc: "/img/achievements/madurai.webp",
    desc: "Represented KSRCT at Vibrant Tamil Nadu Expo. Promoted millet-based innovations and networking.",
  },
  {
    title: "Dakshaa T23 Coordinator",
    tags: [
      "#Event Coordination",
      "#Workshop Management",
      "#Team Leadership",
      "#Event Planning",
    ],
    date: "2023",
    imgSrc: "/img/achievements/dakshaa.webp",
    desc: "Coordinated national-level techno fest DAKSHAA T23. Managed workshops and team activities smoothly.",
  },
  {
    title: "Certified Public Speaker",
    tags: [
      "#Public Speaking",
      "#Audience Engagement",
      "#Body Language Control",
      "#Persuasive Communication",
    ],
    date: "2023",
    imgSrc: "/img/achievements/eps.webp",
    desc: "Completed 30-hour Effective Public Speaking 2.0. Awarded Best Outstanding Person for final speech.",
  },
  {
    title: "Logo Design - 2nd Place",
    tags: [
      "#Graphic Design",
      "#Visual Storytelling",
      "#Brand Identity Creation",
      "#Creative Thinking",
    ],
    date: "2023",
    imgSrc: "/img/achievements/logo.webp",
    desc: "Won 2nd prize in Logo Creation contest. Showcased creativity and visual storytelling skills.",
  },
  {
    title: "Short Video - 2nd Place",
    tags: [
      "#Video Editing",
      "#Cinematography",
      "#Visual Storytelling",
      "#Team Collaboration",
    ],
    date: "2023",
    imgSrc: "/img/achievements/video.webp",
    desc: "Secured 2nd place in Glimpse of KSR video contest. Highlighted campus life with creative visuals.",
  },
  {
    title: "Joint Secretary - PMC & PAC",
    tags: [
      "#Leadership",
      "#Event Coordination",
      "#Campaign Planning",
      "#Club Administration",
    ],
    date: "2022-2023",
    imgSrc: "/img/achievements/js.webp",
    desc: "Served as Joint Secretary for PMC & PAC clubs. Led awareness campaigns and student initiatives.",
  },
  {
    title: "Paper Presentation - 1st Place",
    tags: [
      "#Research & Analysis",
      "#Scientific Communication",
      "#Data Interpretation",
      "#Presentation Skills",
    ],
    date: "2022",
    imgSrc: "/img/achievements/paper.webp",
    desc: "Won 1st prize for nanotech-based agriculture paper. Demonstrated research and presentation excellence.",
  },
  {
    title: "Short Film - 1st Place",
    tags: [
      "#Film Direction",
      "#Scriptwriting",
      "#Environmental Awareness",
      "#Post-Production Editing",
    ],
    date: "2022",
    imgSrc: "/img/achievements/film.webp",
    desc: "Directed and edited award-winning short film. Highlighted COVID-19’s environmental impact.",
  },
];

const Achievements = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 436;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToStart = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="achievements" className="section">
      <div className="container mx-auto relative">
        <h2 className="headline-2">My Achievements</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          A collection of milestones that showcase my passion and impact
        </p>

        {/* Arrows */}
        <div className="hidden lg:flex justify-between items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center opacity-75 left-0 top-[53%] group hover:opacity-100 hover:scale-105 transition-all duration-300"
          >
            <FaChevronLeft className="group-hover:scale-125 transition-all duration-300" />
          </button>
          <button
            onClick={scrollToStart}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -left-14 top-[53%] group hover:opacity-75 hover:scale-105 transition-all duration-300"
          >
            <FaAnglesLeft className="group-hover:scale-125 transition-all duration-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center opacity-75 right-0 top-[53%] group hover:opacity-100 hover:scale-105 transition-all duration-300"
          >
            <FaChevronRight className="group-hover:scale-125 transition-all duration-300" />
          </button>
          <button
            onClick={scrollToEnd}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -right-14 top-[53%] group hover:opacity-75 hover:scale-105 transition-all duration-300"
          >
            <FaAnglesRight className="group-hover:scale-125 transition-all duration-300" />
          </button>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth rounded-xl"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex flex-row gap-4 w-fit min-w-full">
            {achievements.map((achi, index) => (
              <div key={index} className="min-w-[320px] lg:min-w-[420px]">
                <AchievementsCard
                  title={achi.title}
                  imgSrc={achi.imgSrc}
                  desc={achi.desc}
                  tags={achi.tags}
                  logo={achi.logo}
                  date={achi.date}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
