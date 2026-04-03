import { Link, useNavigate } from "react-router-dom";
import { certificates } from "../data/CertificateData";
import CertificationsCard from "./CertificationsCard";

const HomepageCertificates = () => {
  const navigate = useNavigate();
  const displayCertificates = certificates.slice(0, 5);
  const remainingCount = certificates.length - 5;

  return (
    <section id="certificates" className="section relative">
      <h2 className="headline-2">My Certification Milestones</h2>
      <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
        A journey through certifications that validate my skills and growth
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayCertificates.map((cert, index) => (
          <Link key={index} to={`/certificate/${cert.id}`}>
            <CertificationsCard
              title={cert.title}
              imgSrc={cert.imgSrc}
              company={cert.company}
              logo={cert.logo}
              certNumber={certificates.length - index}
            />
          </Link>
        ))}

        {/* See All Card */}
        {remainingCount > 0 && (
          <div
            onClick={() => navigate("/certificates")}
            className=" bg-zinc-800 hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-sky-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-rounded text-4xl text-sky-400">
                add_circle
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              See All Certificates
            </h3>
            <p className="text-zinc-400 text-sm">
              View {remainingCount} more certificates
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageCertificates;
