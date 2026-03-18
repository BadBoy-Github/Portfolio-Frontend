import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { certificates } from "./data/CertificateData";

const CertificateDetail = () => {
  const { id } = useParams();
  const certificate = certificates.find((c) => c.id === id);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Certificate Not Found
          </h1>
          <Link to="/certificates" className="text-sky-400 hover:underline">
            Go back to all certificates
          </Link>
        </div>
      </div>
    );
  }

  // Get other certificates
  const otherCertificates = certificates.filter((c) => c.id !== id);

  const openImage = () => {
    window.open(certificate.imgSrc, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/certificates"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Certificates</span>
        </Link>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Certificate Title and Year */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {certificate.title}
            </h1>
            <p className="text-xl text-zinc-400">{certificate.company}</p>
            <p className="text-zinc-500 mt-2">Year: {certificate.year}</p>
          </div>

          {/* Certificate Image */}
          <div className="mb-8 cursor-pointer group" onClick={openImage}>
            <div className="relative rounded-xl overflow-hidden bg-zinc-800">
              <div className="hidden group-hover:flex absolute inset-0 bg-zinc-900/60 items-center justify-center z-10">
                <AiOutlineFullscreen className="w-16 h-16 text-white" />
              </div>
              <img
                src={certificate.imgSrc}
                alt={certificate.title}
                className="w-full max-h-[500px] object-contain"
              />
            </div>
            <p className="text-center text-zinc-500 text-sm mt-2">
              Click to view full size
            </p>
          </div>

          {/* Technologies Learned */}
          <div className="bg-zinc-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Technologies Learned
            </h2>
            <div className="flex flex-wrap gap-2">
              {certificate.technologiesLearned.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sky-600/20 text-sky-400 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-zinc-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              About This Certificate
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              {certificate.description}
            </p>
          </div>
        </div>

        {/* Other Certificates Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Other Certificates
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {otherCertificates.slice(0, 10).map((cert) => (
              <Link
                key={cert.id}
                to={`/certificate/${cert.id}`}
                className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
              >
                <img
                  src={cert.imgSrc}
                  alt={cert.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">{cert.company}</p>
                  <p className="text-xs text-zinc-500 mt-2">{cert.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
