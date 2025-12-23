// Components
import CertificationsCard from "./CertificationsCard";
import { useRef } from "react";

import { certificates } from "./data/CertificateData";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";



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
    <section className="section ">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2">My Certification Milestones</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          A journey through certifications that validate my skills and growth
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
