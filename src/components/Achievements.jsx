
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
      "#Communication",
    ],
    date: "2023",
    imgSrc: "/img/achievements/sip.webp",
    desc: "Served as one of the two overall coordinators for the Biotechnology department during the 2023 Student Induction Program at K.S. Rangasamy College of Technology (Autonomous), leading event planning, volunteer team formation, and execution. Successfully introduced incoming students to the department's vision, opportunities, and academic culture, resulting in increased registration and improved student engagement.",
  },
  {
    title: "Expo Stall Organizer",
    tags: [
      "#Event Management",
      "#Public Engagement",
      "#Trade Networking",
      "#Institutional Representation",
      "#Sustainable Promotion",
    ],
    date: "2023",
    imgSrc: "/img/achievements/madurai.webp",
    desc: "Represented KSRCT at the 3rd Edition of Vibrant Tamil Nadu - International Agro Food Products Expo in Madurai, where I organized and managed a millet-focused stall. Showcased nutritious millet-based innovations, facilitated trade and networking through the MSME Business Incubator, and engaged with diverse stakeholders to promote sustainable food practices and institutional entrepreneurship.",
  },
  {
    title: "Dakshaa T23 Coordinator",
    tags: [
      "#Event Coordination",
      "#Workshop Management",
      "#Team Leadership",
      "#Academic Event Planning",
      "#Multitasking",
    ],
    date: "2023",
    imgSrc: "/img/achievements/dakshaa.webp",
    desc: "Served as the Biotechnology Department Student Coordinator for DAKSHAA T23, a two-day national-level techno fest hosted by K.S. Rangasamy College of Technology. Led the coordination of technical workshops, paper presentations, and creative competitions, while facilitating team collaboration and ensuring smooth execution of both academic and interactive segments.",
  },
  {
    title: "Certified Public Speaker",
    tags: [
      "#Public Speaking",
      "#Audience Engagement",
      "#Body Language Control",
      "#Confidence Building",
      "#Persuasive Communication",
    ],
    date: "2023",
    imgSrc: "/img/achievements/eps.webp",
    desc: "Earned certification in public speaking after completing a 30-hour “Effective Public Speaking 2.0” workshop conducted by JCI Erode Galaxy. Trained in persuasive communication, body language, and audience engagement. Recognized as the Best Outstanding Person for the final speech, demonstrating strong confidence, clarity, and stage presence.",
  },
  {
    title: "Logo Design - 2nd Place",
    tags: [
      "#Graphic Design",
      "#Visual Storytelling",
      "#Brand Identity Creation",
      "#Attention to Detail",
      "#Creative Thinking",
    ],
    date: "2023",
    imgSrc: "/img/achievements/logo.webp",
    desc: "Won 2nd prize in the Logo Creation competition conducted by the KSRCT Cultural Club. The design process emphasized brand identity, visual balance, and symbolic storytelling. This achievement showcased my passion for design, attention to detail, and ability to communicate ideas effectively through visual elements.",
  },
  {
    title: "Short Video - 2nd Place",
    tags: [
      "#Video Editing",
      "#Direction",
      "#Cinematography",
      "#Visual Storytelling",
      "#Team Collaboration",
    ],
    date: "2023",
    imgSrc: "/img/achievements/video.webp",
    desc: "Won 2nd prize in the “Glimpse of KSR” short video competition organized by the KSRCT Cultural Club. Contributed as both director and editor, crafting a compelling visual narrative that highlighted the academic excellence and vibrant culture of KSRCT. This project showcased strengths in storytelling, cinematography, and post-production, all within a concise and impactful format.",
  },
  {
    title: "Joint Secretary - PMC & PAC",
    tags: [
      "#Leadership",
      "#Event Coordination",
      "#Campaign Planning",
      "#Student Outreach",
      "#Club Administration",
    ],
    date: "2022-2023",
    imgSrc: "/img/achievements/js.webp",
    desc: "Appointed Joint Secretary of the Press and Media Club (PMC) and Public Awareness Club (PAC) under the Department of Biotechnology at KSRCT. Played a key role in coordinating student-led initiatives, organizing awareness campaigns and workshops, and fostering active engagement through collaborative and impactful events.",
  },
  {
    title: "Paper Presentation - 1st Place",
    tags: [
      "#Research & Analysis",
      "#Scientific Communication",
      "#Data Interpretation",
      "#Innovation in Technology",
      "#Presentation Skills",
    ],
    date: "2022",
    imgSrc: "/img/achievements/paper.webp",
    desc: "Won 1st place in a national-level paper presentation at ECLECTIC 2K22, organized by the Department of ECE, Velalar College of Engineering and Technology. Presented a research project titled “Growth of Turmeric using 5G Nano Zinc,” which explored the role of nano-technology in enhancing sustainable agricultural practices. Demonstrated strong skills in scientific research, data analysis, and public communication.",
  },
  {
    title: "Short Film - 1st Place",
    tags: [
      "#Film Direction",
      "#Scriptwriting",
      "#Environmental Awareness Messaging",
      "#Post-Production Editing",
      "#Team Management",
    ],
    date: "2022",
    imgSrc: "/img/achievements/film.webp",
    desc: "Co-directed the short film “Suzhal Kathal Sugam,” which won 1st prize in a campus-wide competition organized by the Department of Biotechnology at KSRCT. Led scriptwriting, direction, and video editing, contributing to a thought-provoking narrative on the environmental impact of COVID-19. The project highlighted strong storytelling, teamwork, and post-production skills.",
  },
  {
    title: "Certified Typewriting - English",
    tags: [
      "#Typing Speed",
      "#Accuracy",
      "#Documentation Handling",
      "#Clerical Efficiency",
      "#Keyboard Proficiency",
    ],
    date: "2014",
    imgSrc: "/img/achievements/type.webp",
    desc: "Completed a certified course in typewriting (Lower Grade, English) conducted by The Erode District Commerce Institutes' Association, earning 2nd class honors. Gained foundational proficiency in typing speed and accuracy, contributing to efficient clerical and documentation skills.",
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

        {/* Scrollable container with 1 row of horizontally scrolling achievements */}
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
