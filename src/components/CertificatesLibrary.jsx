import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CertificationsCard from "./CertificationsCard";
import { certificates } from "../data/CertificateData";

const CertificatesLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique companies for filtering
  const companies = [...new Set(certificates.map((c) => c.company))];
  const [selectedCompany, setSelectedCompany] = useState("all");

  // Filter certificates
  const filteredCerts = certificates.filter((cert) => {
    const searchMatch =
      searchQuery === "" ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.technologiesLearned.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const companyMatch =
      selectedCompany === "all" || cert.company === selectedCompany;

    return searchMatch && companyMatch;
  });

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    document.getElementById("cert_search").value = "";
  };

  return (
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

        {/* Search and Filter */}
        <div className="mb-10 bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              className={`px-3 py-2 rounded-lg text-sm ${
                selectedCompany === "all"
                  ? "bg-sky-600 text-zinc-800"
                  : "text-zinc-400 bg-zinc-50/5"
              } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
              onClick={() => setSelectedCompany("all")}
            >
              All
            </button>
            {companies.slice(0, 8).map((company, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-lg text-sm ${
                  selectedCompany === company
                    ? "bg-sky-600 text-zinc-800"
                    : "text-zinc-400 bg-zinc-50/5"
                } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                onClick={() => setSelectedCompany(company)}
              >
                {company}
              </button>
            ))}
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

        {/* Certificates Grid */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCerts.map((cert, index) => (
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

          {filteredCerts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-semibold text-zinc-300">
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
  );
};

export default CertificatesLibrary;
