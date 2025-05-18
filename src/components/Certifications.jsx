// Components
import CertificationsCard from "./CertificationsCard";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const certificates = [
  {
    title: "React JS",
    imgSrc: "/images/certificates/React JS.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/react.png",
  },
  {
    title: "JavaScript",
    imgSrc: "/images/certificates/JavaScript.jpg",
    company: "Learnz Development Hub",
    logo: "/images/certificates/javascript.png",
  },
  {
    title: "HTML",
    imgSrc: "/images/certificates/HTML.jpg",
    company: "Mimo",
    logo: "/images/certificates/html.png",
  },
  {
    title: "CSS",
    imgSrc: "/images/certificates/CSS.jpg",
    company: "Mimo",
    logo: "/images/certificates/css.png",
  },
  {
    title: "MERN Stack",
    imgSrc: "/images/certificates/MERN Stack.jpg",
    company: "SimpleLearn",
    logo: "/images/certificates/mern.png",
  },
  {
    title: "SEO",
    imgSrc: "/images/certificates/SEO.jpg",
    company: "Programming Hub",
    logo: "/images/certificates/seo.png",
  },
  {
    title: "Git & GitHub",
    imgSrc: "/images/certificates/Git & GitHub.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/github.png",
  },
  {
    title: "Python",
    imgSrc: "/images/certificates/Python.jpg",
    company: "Mimo",
    logo: "/images/certificates/python.png",
  },
  {
    title: "Generative AI",
    imgSrc: "/images/certificates/Generative AI.jpg",
    company: "Guvi",
    logo: "/images/certificates/ai.png",
  },
  {
    title: "Canva",
    imgSrc: "/images/certificates/Canva.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/canva.png",
  },
  {
    title: "Digital Marketing Fundamentals",
    imgSrc: "/images/certificates/Digital Marketing Fundamentals.jpg",
    company: "IIDE The Digital School",
    logo: "/images/certificates/marketing.png",
  },
  {
    title: "Business Analysis",
    imgSrc: "/images/certificates/Business Analysis.jpg",
    company: "Coursera",
    logo: "/images/certificates/analysis.png",
  },
  {
    title: "Excel",
    imgSrc: "/images/certificates/Excel.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/excel.png",
  },
  {
    title: "Excel Data Analysis",
    imgSrc: "/images/certificates/Excel Data Analysis.jpg",
    company: "Coursera",
    logo: "/images/certificates/data analysis.png",
  },
  {
    title: "Campus Ambassador",
    imgSrc: "/images/certificates/Campus Ambassador.jpg",
    company: "E-CELL IIT Guwahati",
    logo: "/images/certificates/ambassador.png",
  },
  {
    title: "Short Film Making",
    imgSrc: "/images/certificates/Short Film Making.jpg",
    company: "K S Rangasamy College of Technology",
    logo: "/images/certificates/film.png",
  },
  {
    title: "Short Video Making",
    imgSrc: "/images/certificates/Short Video Making.jpg",
    company: "K S Rangasamy College of Technology",
    logo: "/images/certificates/video.png",
  },
  {
    title: "Logo Design",
    imgSrc: "/images/certificates/Logo Design.jpg",
    company: "K S Rangasamy College of Technology",
    logo: "/images/certificates/logo.png",
  },
  {
    title: "Paper Presentation",
    imgSrc: "/images/certificates/Paper Presentation.jpg",
    company: "Velalar College of Engineering and Technology",
    logo: "/images/certificates/paper presentation.png",
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
      <div className="px-4 mx-auto lg:px-8 xl:max-w-6xl container">
        <h2 className="headline-2 mb-8 reveal-up">Licenses & Certifications</h2>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-40 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center reveal-up"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={scrollToStart}
          className="absolute left-28 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center opacity-50 reveal-up"
        >
          <FaAnglesLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-40 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center reveal-up"
        >
          <FaChevronRight />
        </button>
        <button
          onClick={scrollToEnd}
          className="absolute right-28 top-2/3 z-10 p-2 bg-black rounded-full flex items-center justify-center opacity-50 reveal-up"
        >
          <FaAnglesRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 w-full scroll-smooth hide-scrollbar rounded-xl"
          style={{ scrollBehavior: "smooth" }}
        >
          {certificates.map(({ title, imgSrc, company, logo }, key) => (
            <CertificationsCard
              key={key}
              title={title}
              imgSrc={imgSrc}
              company={company}
              logo={logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
