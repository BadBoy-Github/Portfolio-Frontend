// Components
import CertificationsCard from "./CertificationsCard";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const reviews = [
  {
    title: "React JS",
    imgSrc: "/images/certificates/React JS.jpg",
    company: "LetsUpgrade",
  },
  {
    title: "JavaScript",
    imgSrc: "/images/certificates/JavaScript.jpg",
    company: "Learnz Development Hub",
  },
  {
    title: "HTML",
    imgSrc: "/images/certificates/HTML.jpg",
    company: "Mimo",
  },
  {
    title: "CSS",
    imgSrc: "/images/certificates/CSS.jpg",
    company: "Mimo",
  },
  {
    title: "MERN Stack",
    imgSrc: "/images/certificates/MERN Stack.jpg",
    company: "SimpleLearn",
  },
  {
    title: "SEO",
    imgSrc: "/images/certificates/SEO.jpg",
    company: "Programming Hub",
  },
  {
    title: "Git & GitHub",
    imgSrc: "/images/certificates/Git & GitHub.jpg",
    company: "LetsUpgrade",
  },
  {
    title: "Python",
    imgSrc: "/images/certificates/Python.jpg",
    company: "Mimo",
  },
  {
    title: "Generative AI",
    imgSrc: "/images/certificates/Generative AI.jpg",
    company: "Guvi",
  },
  {
    title: "Canva",
    imgSrc: "/images/certificates/Canva.jpg",
    company: "LetsUpgrade",
  },
  {
    title: "Digital Marketing Fundamentals",
    imgSrc: "/images/certificates/Digital Marketing Fundamentals.jpg",
    company: "IIDE The Digital School",
  },
  {
    title: "Business Analysis",
    imgSrc: "/images/certificates/Business Analysis.jpg",
    company: "Coursera",
  },
  {
    title: "Excel",
    imgSrc: "/images/certificates/Excel.jpg",
    company: "LetsUpgrade",
  },
  {
    title: "Excel Data Analysis",
    imgSrc: "/images/certificates/Excel Data Analysis.jpg",
    company: "Coursera",
  },
  {
    title: "Campus Ambassador",
    imgSrc: "/images/certificates/Campus Ambassador.jpg",
    company: "E-CELL IIT Guwahati",
  },
  {
    title: "Short Film Making",
    imgSrc: "/images/certificates/Short Film Making.jpg",
    company: "K S Rangasamy College of Technology",
  },
  {
    title: "Short Video Making",
    imgSrc: "/images/certificates/Short Video Making.jpg",
    company: "K S Rangasamy College of Technology",
  },
  {
    title: "Logo Design",
    imgSrc: "/images/certificates/Logo Design.jpg",
    company: "K S Rangasamy College of Technology",
  },
  {
    title: "Paper Presentation",
    imgSrc: "/images/certificates/Paper Presentation.jpg",
    company: "Velalar College of Engineering and Technology",
  },
];

const Certifications = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 432;
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
  }

  const scrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }

  return (
    <section id="certificates" className="section relative">
      <div className="px-4 mx-auto lg:px-8 xl:max-w-6xl">
        <h2 className="headline-2 mb-8">Licenses & Certifications</h2>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-40 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={scrollToStart}
          className="absolute left-28 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center opacity-50"
        >
          <FaAnglesLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-40 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center"
        >
          <FaChevronRight />
        </button>
        <button
          onClick={scrollToEnd}
          className="absolute right-28 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center opacity-50"
        >
          <FaAnglesRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 w-full scroll-smooth hide-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {reviews.map(({ title, imgSrc, company }, key) => (
            <CertificationsCard
              key={key}
              title={title}
              imgSrc={imgSrc}
              company={company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
