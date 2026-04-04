import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { certificates } from "../data/CertificateData";

import { IoClose } from "react-icons/io5";

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

  return (
    <>
      <Helmet>
        <title>{certificate.title} | Elayabarathi M V</title>
        <meta
          name="description"
          content={`${certificate.title} certification from ${certificate.company} - Earned in ${certificate.year}`}
        />
        <meta
          name="keywords"
          content={`certificate, ${certificate.title}, ${certificate.company}, ${certificate.year}`}
        />
        <meta
          property="og:title"
          content={`${certificate.title} | Certificate`}
        />
        <meta
          property="og:description"
          content={`${certificate.title} certification from ${certificate.company}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://elayabarathimv.vercel.app/certificate/${certificate.id}`}
        />
        <meta property="og:image" content={certificate.imgSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${certificate.title} | Certificate`}
        />
        <meta
          name="twitter:description"
          content={`${certificate.title} certification from ${certificate.company}`}
        />
        <link
          rel="canonical"
          href={`https://elayabarathimv.vercel.app/certificate/${certificate.id}`}
        />
      </Helmet>
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
            <div className="cursor-pointer group bg-zinc-800 w-fit mx-auto rounded-3xl">
              <div className="relative rounded-xl overflow-hidden p-4">
                <img
                  src={certificate.imgSrc}
                  alt={certificate.title}
                  loading="lazy"
                  className="w-full max-h-[500px] object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Technologies Learned */}
            <div className="bg-zinc-800 rounded-xl p-6 my-8">
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
          <div className="mt-16 relative">
            <h2 className="text-2xl font-bold text-white mb-6">
              Other Certificates
            </h2>
            {/* Left Scroll Button */}
            <button
              onClick={() =>
                document
                  .getElementById("other-certificates-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            {/* Right Scroll Button */}
            <button
              onClick={() =>
                document
                  .getElementById("other-certificates-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <IoChevronForward className="size-6" />
            </button>
            <div
              id="other-certificates-scroll"
              className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
            >
              {otherCertificates.map((cert) => (
                <Link
                  key={cert.id}
                  to={`/certificate/${cert.id}`}
                  className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
                >
                  <img
                    src={cert.imgSrc}
                    alt={cert.title}
                    loading="lazy"
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
    </>
  );
};

export default CertificateDetail;
