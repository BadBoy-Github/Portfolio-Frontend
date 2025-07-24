// Components
import CertificationsCard from "./CertificationsCard";
import { useRef, useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const certificates = [
  {
    title: "React JS",
    imgSrc: "/images/certificates/React JS.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/react.png",
  },
  {
    title: "Tailwind CSS",
    imgSrc: "/images/certificates/Tailwind CSS.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/tailwind.png",
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
    title: "JavaScript",
    imgSrc: "/images/certificates/JavaScript.jpg",
    company: "Learnz Development Hub",
    logo: "/images/certificates/javascript.png",
  },
  {
    title: "JavaScript",
    imgSrc: "/images/certificates/js.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/javascript.png",
  },
  {
    title: "Wordpress",
    imgSrc: "/images/certificates/Wordpress.jpg",
    company: "Coursera",
    logo: "/images/certificates/wordpress.png",
  },
  {
    title: "MERN Stack",
    imgSrc: "/images/certificates/MERN Stack.jpg",
    company: "SimpliLearn",
    logo: "/images/certificates/mern.png",
  },
  {
    title: "SEO",
    imgSrc: "/images/certificates/SEO1.jpg",
    company: "Coursera",
    logo: "/images/certificates/seo.png",
  },
  {
    title: "SEO",
    imgSrc: "/images/certificates/SEO.jpg",
    company: "Programming Hub",
    logo: "/images/certificates/seo.png",
  },
  {
    title: "Generative AI",
    imgSrc: "/images/certificates/Generative AI.jpg",
    company: "Guvi",
    logo: "/images/certificates/ai.png",
  },
  {
    title: "Git & GitHub",
    imgSrc: "/images/certificates/Git & GitHub.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/github.png",
  },
  {
    title: "Git",
    imgSrc: "/images/certificates/Git.jpg",
    company: "Programming Hub",
    logo: "/images/certificates/git.png",
  },
  {
    title: "Frontend Development",
    imgSrc: "/images/certificates/Frontend.jpg",
    company: "SimpliLearn",
    logo: "/images/certificates/frontend.png",
  },
  {
    title: "Python",
    imgSrc: "/images/certificates/Python.jpg",
    company: "Mimo",
    logo: "/images/certificates/python.png",
  },
  {
    title: "Python Dev",
    imgSrc: "/images/certificates/Python Dev.jpg",
    company: "Mimo",
    logo: "/images/certificates/python.png",
  },
  {
    title: "ChatGPT for Everyone",
    imgSrc: "/images/certificates/ChatGPT.jpg",
    company: "Guvi",
    logo: "/images/certificates/chatgpt.png",
  },
  {
    title: "Tech Career Kickstart",
    imgSrc: "/images/certificates/techcareer.jpg",
    company: "SimpliLearn",
    logo: "/images/certificates/techcareer.png",
  },
  {
    title: "Canva",
    imgSrc: "/images/certificates/Canva.jpg",
    company: "LetsUpgrade",
    logo: "/images/certificates/canva.png",
  },
  {
    title: "Video Editing with Canva",
    imgSrc: "/images/certificates/Canva Video.jpg",
    company: "Coursera",
    logo: "/images/certificates/videoediting.png",
  },
  {
    title: "Social Media Management",
    imgSrc: "/images/certificates/Social Media Management.jpg",
    company: "Great Learning",
    logo: "/images/certificates/socialmedia.png",
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
    title: "Investment Risk Management",
    imgSrc: "/images/certificates/IRM.jpg",
    company: "Coursera",
    logo: "/images/certificates/irm.png",
  },
  {
    title: "Power BI",
    imgSrc: "/images/certificates/Power BI.jpg",
    company: "Great Learning",
    logo: "/images/certificates/powerbi.png",
  },
  {
    title: "Introduction to Microsoft Excel",
    imgSrc: "/images/certificates/Excel1.jpg",
    company: "Coursera",
    logo: "/images/certificates/excel.png",
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
    title: "Google Ads for Beginners",
    imgSrc: "/images/certificates/Google Ads.jpg",
    company: "Coursera",
    logo: "/images/certificates/googleads.png",
  },
  {
    title: "Video Editing",
    imgSrc: "/images/certificates/Video Editing.jpg",
    company: "Great Learning",
    logo: "/images/certificates/videoediting.png",
  },
];

const Certifications = () => {

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
    <section id="certification" className="section ">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 mb-8 reveal-up">
          My Certification Milestones
        </h2>

        {/* Arrows */}
        <div className="hidden lg:flex justify-between items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center reveal-up left-0 top-[52%]"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollToStart}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 reveal-up -left-14 top-[52%]"
          >
            <FaAnglesLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center reveal-up right-0 top-[52%]"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={scrollToEnd}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 reveal-up -right-14 top-[52%]"
          >
            <FaAnglesRight />
          </button>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth rounded-xl"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex flex-row gap-4 w-fit min-w-full">
            {/** Split into columns, each column contains 2 rows */}
            {Array.from({ length: Math.ceil(certificates.length / 2) }).map(
              (_, colIdx) => {
                const topIdx = colIdx * 2;
                const bottomIdx = colIdx * 2 + 1;

                const topCert = certificates[topIdx];
                const bottomCert = certificates[bottomIdx];

                return (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-4 min-w-[320px] lg:min-w-[420px]"
                  >
                    {topCert && (
                      <CertificationsCard
                        key={`cert-top-${colIdx}`}
                        title={topCert.title}
                        imgSrc={topCert.imgSrc}
                        company={topCert.company}
                        logo={topCert.logo}
                        certNumber={certificates.length - topIdx}
                      />
                    )}
                    {bottomCert && (
                      <CertificationsCard
                        key={`cert-bottom-${colIdx}`}
                        title={bottomCert.title}
                        imgSrc={bottomCert.imgSrc}
                        company={bottomCert.company}
                        logo={bottomCert.logo}
                        certNumber={certificates.length - bottomIdx}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
