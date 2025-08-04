
import AchievementsCard from "./AchievementsCard";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const achievements = [
  {
    title: "Student Induction Program [2023] Organizer",
    tags: ["Leadership", "Public Speaking", "Collaborative"],
    imgSrc: "/images/achievements/sip.jpg",
    desc: "Led and facilitated key activities during the Student Induction Program 2023, focusing on onboarding new students, promoting campus culture, and encouraging leadership and communication skills among freshers.",
  },
  {
    title: "Regional Cultural Expo - Madurai",
    tags: ["Promotion", "Collaboration", "Public Engagement"],
    imgSrc: "/images/achievements/madurai.jpg",
    desc: "Represented KSRCT at the Madurai Regional Cultural Stall, overseeing presentation setup and engaging with the public to showcase local heritage and institutional innovation through interactive displays.",
  },
  {
    title: "Dakshaa T23 - Core Event Organizer",
    tags: ["Event Management", "Leadership", "Planning"],
    imgSrc: "/images/achievements/dakshaa.jpg",
    desc: "Served as a core organizer for Dakshaa T23, a major intercollegiate event. Managed logistics, supervised multiple teams, and ensured seamless execution of the event&apos;s technical and cultural activities.",
  },
  {
    title: "Intercollegiate Logo Design – 2nd Place Winner",
    tags: ["Graphic Design", "Creative Thinking", "Illustration"],
    imgSrc: "/images/achievements/logo.jpg",
    desc: "Secured 2nd place in a competitive logo creation contest hosted by KSRCT Culturals Club. Designed a concept-driven logo that reflected the theme effectively and demonstrated advanced design skills.",
  },
  {
    title: "Short Video Contest – 2nd Prize Winner",
    tags: ["Video Production", "Storytelling", "Digital Creativity"],
    imgSrc: "/images/achievements/video.jpg",
    desc: "Won 2nd prize in a short video contest, contributing as both director and editor. Focused on conveying a powerful narrative within a concise timeframe using visual storytelling and editing techniques.",
  },
  {
    title: "Paper Presentation – 1st Place Awardee",
    tags: ["Research", "Technical Communication", "Innovation"],
    imgSrc: "/images/achievements/paper.jpg",
    desc: "Achieved 1st place in a paper presentation competition for a project focused on innovative solutions in technology. Demonstrated strong research methodology, data analysis, and public presentation skills.",
  },
  {
    title: "Joint Secretary – PMC & PAC Club, KSRCT",
    tags: ["Leadership Role", "Club Management", "Strategic Coordination"],
    imgSrc: "/images/achievements/js.jpg",
    desc: "Appointed Joint Secretary of the PMC & PAC Club at KSRCT. Played a pivotal role in organizing club initiatives, coordinating meetings, and leading student engagement and outreach programs.",
  },
  {
    title: "Campus Short Film – 1st Prize Director",
    tags: ["Film Direction", "Scriptwriting", "Team Collaboration"],
    imgSrc: "/images/achievements/film.jpg",
    desc: "Directed a short film that won 1st prize at a campus-level competition. Oversaw all stages of production including script development, casting, filming, and post-production editing.",
  },
  {
    title: "Certified Effective Public Speaker",
    tags: ["Communication", "Public Speaking", "Confidence Building"],
    imgSrc: "/images/achievements/eps.jpg",
    desc: "Earned a public speaking certification for delivering structured, confident speeches in front of live audiences. Trained in persuasive communication, body language, and audience engagement.",
  },
  {
    title: "Certified Typewriting – Lower Grade, English",
    tags: ["Typing Proficiency", "Clerical Skills", "Accuracy"],
    imgSrc: "/images/achievements/type.jpg",
    desc: "Completed a certified course in typewriting (Lower Grade, English) with distinction. Acquired strong proficiency in typing speed and accuracy, useful for clerical and documentation tasks.",
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
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center left-0 top-[53%]"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollToStart}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -left-14 top-[53%]"
          >
            <FaAnglesLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center right-0 top-[53%]"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={scrollToEnd}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -right-14 top-[53%]"
          >
            <FaAnglesRight />
          </button>
        </div>

        {/* Scrollable container with 1 row of horizontally scrolling achievements */}
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth rounded-xl"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex flex-row gap-4 w-fit min-w-full">
            {achievements.map((cert, index) => (
              <div key={index} className="min-w-[320px] lg:min-w-[420px]">
                <AchievementsCard
                  title={cert.title}
                  imgSrc={cert.imgSrc}
                  desc={cert.desc}
                  tags={cert.tags}
                  logo={cert.logo}
                  certNumber={achievements.length - index}
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
