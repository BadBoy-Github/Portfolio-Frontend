
import AchievementsCard from "./AchievementsCard";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const certificates = [
  {
    title: "Student Induction Program 2023",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/achievements/sip.jpg",
    logo: "/images/certificates/react.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Madurai Stall",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/Tailwind CSS.jpg",
    logo: "/images/certificates/tailwind.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Dakshaa T23",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/HTML.jpg",
    logo: "/images/certificates/html.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Logo Creation 2nd prize",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Short Video 2nd prize",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Paper presentation 1st prize",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Joint Secretary PMC and PAC",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Short Film 1st prize",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Certified Public Speaker",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
  },
  {
    title: "Type writter",
    tags: ["Leadership", "Communication", "Teamwork"],
    imgSrc: "/images/certificates/CSS.jpg",
    logo: "/images/certificates/css.png",
    desc: "A comprehensive program designed to enhance student skills in leadership, communication, and teamwork.",
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

        {/* Scrollable container with 1 row of horizontally scrolling certificates */}
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth rounded-xl"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex flex-row gap-4 w-fit min-w-full">
            {certificates.map((cert, index) => (
              <div key={index} className="min-w-[320px] lg:min-w-[420px]">
                <AchievementsCard
                  title={cert.title}
                  imgSrc={cert.imgSrc}
                  desc={cert.desc}
                  tags={cert.tags}
                  logo={cert.logo}
                  certNumber={certificates.length - index}
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
