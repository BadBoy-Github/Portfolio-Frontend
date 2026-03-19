import { useNavigate } from "react-router-dom";
import { certificates } from "../data/CertificateData";

const HomepageCertificates = () => {
  const navigate = useNavigate();
  const displayCertificates = certificates.slice(0, 3);
  const remainingCount = certificates.length - 3;

  const handleCertClick = (certId) => {
    navigate(`/certificate/${certId}`);
  };

  return (
    <section className="section" id="certification">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2">My Certification Milestones</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          A journey through certifications that validate my skills and growth
        </p>
        <div className="grid grid-cols-2 gap-3">
          {displayCertificates.map((cert, index) => (
            <div
              key={index}
              onClick={() => handleCertClick(cert.id)}
              className="min-w-[320px] lg:min-w-[420px] bg-zinc-800 hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mt-auto">
                <div>
                  <p className="flex items-center gap-2 text-white font-semibold">
                    {cert.title}
                    <span className="text-xs text-zinc-400">
                      #{certificates.length - index}
                    </span>
                  </p>
                  <p className="text-xs text-zinc-400 tracking-wider">
                    {cert.company}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-700 group-hover:scale-125 group-hover:rotate-[45deg] transition-all duration-700">
                  <img
                    src={cert.logo}
                    alt="Logo"
                    className="w-6 h-6 object-cover p-0.5 transition-all duration-700"
                  />
                </div>
              </div>
              <figure className="rounded-lg bg-zinc-700 mt-4 hover:scale-[101%] transition-transform duration-300">
                <img
                  src={cert.imgSrc}
                  width={44}
                  height={44}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-60 object-cover bg-zinc-400/20 rounded-lg"
                />
              </figure>
            </div>
          ))}

          {/* See All Card */}
          {remainingCount > 0 && (
            <div
              onClick={() => navigate("/certificates")}
              className="min-w-[320px] lg:min-w-[420px] bg-zinc-800 hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl flex flex-col items-center justify-center cursor-pointer group"
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
      </div>
    </section>
  );
};

export default HomepageCertificates;
