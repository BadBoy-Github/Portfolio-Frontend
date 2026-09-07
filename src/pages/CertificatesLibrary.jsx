import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import CertificationsCard from "../components/CertificationsCard";

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
    document.getElementById("cert_search").value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Failed to load certificates</h2>
          <p className="text-zinc-400">{error}</p>
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
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              All Certificates
            </h1>
            <p className="text-zinc-400">
              Browse my certifications and achievements
            </p>
          </div>

          <div className="mb-10 bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`p-2 rounded-lg text-sm ${
                  selectedTag === "all"
                    ? "bg-sky-600 text-zinc-800"
                    : "bg-zinc-50/5 text-zinc-400"
                } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                onClick={() => handleTagSelect("all")}
              >
                <HiOutlineMenu className="size-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {sTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-sky-600 text-zinc-800"
                        : "text-zinc-400 bg-zinc-50/5"
                    } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-zinc-400 mr-3">
                #{filteredCerts.length} certificates
              </div>

              <input
                type="text"
                id="cert_search"
                placeholder="Search certificates..."
                className="bg-zinc-800 w-full lg:w-60 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-2 py-1 transition-all duration-500"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-zinc-800 mr-1 bg-sky-600 rounded-lg p-2 ml-2 cursor-pointer hover:bg-red-600 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
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
                <h3 className="text-xl font-semibold text-zinc-300 mt-2">
                  No certificates found
                </h3>
                <p className="text-zinc-500 mt-2">
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
