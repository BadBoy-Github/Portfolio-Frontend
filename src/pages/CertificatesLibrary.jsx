import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CertificationsCard from "../components/CertificationsCard";
import FilterBar from "../components/ui/FilterBar";
import SectionHeading from "../components/ui/SectionHeading";

const sTags = ["React", "JavaScript", "HTML", "CSS", "Java", "Python"];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CertificatesLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/certificates`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCertificates(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const filteredCerts = certificates.filter((cert) => {
    const tagMatch =
      selectedTag === "all" ||
      cert.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
      cert.company.toLowerCase().includes(selectedTag.toLowerCase()) ||
      (cert.technologiesLearned || []).some(
        (tech) => tech.toLowerCase() === selectedTag.toLowerCase(),
      );

    const searchMatch =
      searchQuery === "" ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.technologiesLearned || []).some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return tagMatch && searchMatch;
  });

  const handleTagSelect = (tag) => {
    setSearchQuery("");
    setSelectedTag(tag);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("all");
  };

  const clearSearch = () => {
    setSearchQuery("");
    const input = document.getElementById("cert_search");
    if (input) input.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-accent-red mb-2">Failed to load certificates</h2>
          <p className="text-ink-soft">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Certificates & Certifications | Full Stack Developer Portfolio
        </title>
        <meta
          name="description"
          content="Browse my professional certifications and achievements from top tech companies. View certifications in web development, React, JavaScript, and more."
        />
        <meta
          name="keywords"
          content="certifications, professional certificates, web development certification, React certification, JavaScript certification, tech certificates"
        />
        <meta
          property="og:title"
          content="Certificates & Certifications | Full Stack Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Browse my professional certifications and achievements from top tech companies."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://elayabarathimv.vercel.app/certificates"
        />
        <link
          rel="canonical"
          href="https://elayabarathimv.vercel.app/certificates"
        />
      </Helmet>
      <div className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="All Certificates"
            lead="Browse my certifications and achievements"
          />

          <FilterBar
            tags={sTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onSearchClear={clearSearch}
            countLabel={`${filteredCerts.length} certificates`}
            searchPlaceholder="Search certificates..."
            searchId="cert_search"
          />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert, index) => (
              <Link key={cert.id} to={`/certificate/${cert.id}`}>
                <CertificationsCard
                  title={cert.title}
                  imgSrc={cert.imgSrc}
                  company={cert.company}
                  logo={cert.logo}
                  certNumber={certificates.length - index}
                />
              </Link>
            ))}

            {filteredCerts.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>
                <h3 className="text-xl font-semibold text-ink mt-2">
                  No certificates found
                </h3>
                <p className="text-ink-soft mt-2">
                  Try a different search term or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatesLibrary;
