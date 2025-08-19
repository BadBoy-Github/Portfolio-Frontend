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
    imgSrc: "/img/certificates/React JS.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/react.webp",
  },
  {
    title: "Tailwind CSS",
    imgSrc: "/img/certificates/Tailwind CSS.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/tailwind.webp",
  },
  {
    title: "HTML",
    imgSrc: "/img/certificates/HTML1.webp",
    company: "Mimo",
    logo: "/img/certificates/html.webp",
  },
  {
    title: "CSS",
    imgSrc: "/img/certificates/CSS1.webp",
    company: "Mimo",
    logo: "/img/certificates/css.webp",
  },
  {
    title: "JavaScript",
    imgSrc: "/img/certificates/JavaScript1.webp",
    company: "Learnz Development Hub",
    logo: "/img/certificates/javascript.webp",
  },
  {
    title: "JavaScript",
    imgSrc: "/img/certificates/js.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/javascript.webp",
  },
  {
    title: "Wordpress",
    imgSrc: "/img/certificates/Wordpress1.webp",
    company: "Coursera",
    logo: "/img/certificates/wordpress.webp",
  },
  {
    title: "MERN Stack",
    imgSrc: "/img/certificates/MERN Stack.webp",
    company: "SimpliLearn",
    logo: "/img/certificates/mern.webp",
  },
  {
    title: "SEO",
    imgSrc: "/img/certificates/SEO2.webp",
    company: "Coursera",
    logo: "/img/certificates/seo.webp",
  },
  {
    title: "SEO",
    imgSrc: "/img/certificates/SEO1.webp",
    company: "Programming Hub",
    logo: "/img/certificates/seo.webp",
  },
  {
    title: "Generative AI",
    imgSrc: "/img/certificates/Generative AI.webp",
    company: "Guvi",
    logo: "/img/certificates/ai.webp",
  },
  {
    title: "Git & GitHub",
    imgSrc: "/img/certificates/Git & GitHub.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/github.webp",
  },
  {
    title: "Git",
    imgSrc: "/img/certificates/Git1.webp",
    company: "Programming Hub",
    logo: "/img/certificates/git.webp",
  },
  {
    title: "Frontend Development",
    imgSrc: "/img/certificates/Frontend1.webp",
    company: "SimpliLearn",
    logo: "/img/certificates/frontend.webp",
  },
  {
    title: "Python",
    imgSrc: "/img/certificates/Python1.webp",
    company: "Mimo",
    logo: "/img/certificates/python.webp",
  },
  {
    title: "Python Dev",
    imgSrc: "/img/certificates/Python Dev.webp",
    company: "Mimo",
    logo: "/img/certificates/python.webp",
  },
  {
    title: "ChatGPT for Everyone",
    imgSrc: "/img/certificates/ChatGPT1.webp",
    company: "Guvi",
    logo: "/img/certificates/chatgpt.webp",
  },
  {
    title: "Tech Career Kickstart",
    imgSrc: "/img/certificates/techcareer1.webp",
    company: "SimpliLearn",
    logo: "/img/certificates/techcareer.webp",
  },
  {
    title: "Canva",
    imgSrc: "/img/certificates/Canva1.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/canva.webp",
  },
  {
    title: "Video Editing with Canva",
    imgSrc: "/img/certificates/Canva Video.webp",
    company: "Coursera",
    logo: "/img/certificates/videoediting.webp",
  },
  {
    title: "Social Media Management",
    imgSrc: "/img/certificates/Social Media Management.webp",
    company: "Great Learning",
    logo: "/img/certificates/socialmedia.webp",
  },
  {
    title: "Digital Marketing Fundamentals",
    imgSrc: "/img/certificates/Digital Marketing Fundamentals.webp",
    company: "IIDE The Digital School",
    logo: "/img/certificates/marketing.webp",
  },
  {
    title: "Business Analysis",
    imgSrc: "/img/certificates/Business Analysis.webp",
    company: "Coursera",
    logo: "/img/certificates/analysis.webp",
  },
  {
    title: "Investment Risk Management",
    imgSrc: "/img/certificates/IRM1.webp",
    company: "Coursera",
    logo: "/img/certificates/irm.webp",
  },
  {
    title: "Power BI",
    imgSrc: "/img/certificates/Power BI.webp",
    company: "Great Learning",
    logo: "/img/certificates/powerbi.webp",
  },
  {
    title: "Introduction to Microsoft Excel",
    imgSrc: "/img/certificates/Excel2.webp",
    company: "Coursera",
    logo: "/img/certificates/excel.webp",
  },
  {
    title: "Excel",
    imgSrc: "/img/certificates/Excel1.webp",
    company: "LetsUpgrade",
    logo: "/img/certificates/excel.webp",
  },
  {
    title: "Excel Data Analysis",
    imgSrc: "/img/certificates/Excel Data Analysis.webp",
    company: "Coursera",
    logo: "/img/certificates/data analysis.webp",
  },
  {
    title: "Google Ads for Beginners",
    imgSrc: "/img/certificates/Google Ads.webp",
    company: "Coursera",
    logo: "/img/certificates/googleads.webp",
  },
  {
    title: "Video Editing",
    imgSrc: "/img/certificates/Video Editing.webp",
    company: "Great Learning",
    logo: "/img/certificates/videoediting.webp",
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
        <h2 className="headline-2">My Certification Milestones</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          A journey through certifications that validate my skills and growth
        </p>

        {/* Arrows */}
        <div className="hidden lg:flex justify-between items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center opacity-75 left-0 top-[53%] group hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <FaChevronLeft className="group-hover:scale-150 transition-all duration-300" />
          </button>
          <button
            onClick={scrollToStart}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -left-14 top-[53%] group hover:opacity-75 hover:scale-110 transition-all duration-300"
          >
            <FaAnglesLeft className="group-hover:scale-150 transition-all duration-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute z-10 p-4 bg-black rounded-full flex items-center justify-center opacity-75 right-0 top-[53%] group hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <FaChevronRight className="group-hover:scale-150 transition-all duration-300" />
          </button>
          <button
            onClick={scrollToEnd}
            className="absolute z-10 p-4 bg-black/40 rounded-full flex items-center justify-center opacity-50 -right-14 top-[53%] group hover:opacity-75 hover:scale-110 transition-all duration-300"
          >
            <FaAnglesRight className="group-hover:scale-150 transition-all duration-300" />
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
