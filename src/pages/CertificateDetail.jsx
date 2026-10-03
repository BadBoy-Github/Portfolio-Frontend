import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CertificateDetail = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [otherCertificates, setOtherCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [certRes, allRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/certificates/${id}`),
          fetch(`${BACKEND_URL}/api/certificates`),
        ]);
        if (!certRes.ok) throw new Error("Certificate not found");
        const certData = await certRes.json();
        const allData = await allRes.json();
        setCertificate(certData.data);
        setOtherCertificates(allData.data.filter((c) => c.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Certificate Not Found
          </h1>
          <Link to="/certificates" className="text-accent-secondary hover:underline">
            Go back to all certificates
          </Link>
        </div>
      </div>
    );
  }

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
        <meta property="og:description" content={`${certificate.title} certification from ${certificate.company}`} />
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
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-secondary transition-colors mb-8"
          >
            <IoArrowBack className="size-5" />
            <span>Back to All Certificates</span>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="headline-1 text-foreground">
                {certificate.title}
              </h1>
              <p className="body-text text-accent-secondary mt-3">
                {certificate.company}
              </p>
              <p className="text-muted-foreground mt-2 font-mono">Year: {certificate.year}</p>
            </div>

            <div className="cursor-pointer group card w-fit mx-auto rounded-3xl border border-border">
              <div className="relative rounded-xl overflow-hidden p-4">
                <img
                  src={certificate.imgSrc}
                  alt={certificate.title}
                  loading="lazy"
                  className="w-full max-h-[500px] object-contain rounded-xl"
                />
              </div>
            </div>

            <div className="card rounded-xl p-6 my-8 border border-border">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Technologies Learned
              </h2>
              <div className="flex flex-wrap gap-2">
                {(certificate.technologiesLearned || []).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-secondary/20 text-accent-secondary rounded-full text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="card rounded-xl p-6 mb-8 border border-border">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                About This Certificate
              </h2>
              <p className="text-muted-foreground leading-relaxed blog-content">
                {certificate.description}
              </p>
            </div>
          </div>

          <div className="mt-16 relative">
            <h2 className="headline-2 text-foreground">
              Other <span className="gold-text">Certificates</span>
            </h2>
            <button
              onClick={() =>
                document
                  .getElementById("other-certificates-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-muted/90 hover:bg-border text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("other-certificates-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-muted/90 hover:bg-border text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
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
                  className="min-w-[280px] md:min-w-[320px] card rounded-xl overflow-hidden hover:shadow-glow-gold transition-all group"
                >
                  <img
                    src={cert.imgSrc}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-accent-secondary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{cert.company}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{cert.year}</p>
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
