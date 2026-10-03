// Node modules
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

// Components
import CertificationsCard from "./CertificationsCard";
import SectionHeading from "./ui/SectionHeading";
import SectionState from "./ui/SectionState";
import useCollection from "../hooks/useCollection";

const HOMEPAGE_CERTIFICATES = 5;

const HomepageCertificates = () => {
  const { items, loading, error, reload } = useCollection("/api/certificates");

  const displayCertificates = items.slice(0, HOMEPAGE_CERTIFICATES);
  const remainingCount = items.length - HOMEPAGE_CERTIFICATES;

  return (
    <section id="certificates" className="section">
      <SectionHeading
        title="My Certification Milestones"
        lead="A journey through certifications that validate my skills and growth"
      />

      <SectionState
        loading={loading}
        error={error}
        label="certificates"
        onRetry={reload}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCertificates.map((cert, index) => (
            <div key={cert.id} className="flex">
              <CertificationsCard
                title={cert.title}
                imgSrc={cert.imgSrc}
                company={cert.company}
                logo={cert.logo}
                certNumber={items.length - index}
                certId={cert.id}
              />
            </div>
          ))}

          {remainingCount > 0 && (
            <Link
              to="/certificates"
              className="group flex flex-col items-center justify-center gap-4 bg-paper-card border-2 border-dashed border-ink rounded-wobbly-md p-6 text-center transition-transform duration-100 hover:rotate-1 hover:border-solid hover:shadow-hard"
            >
              <span className="w-16 h-16 grid place-items-center rounded-wobbly-sm bg-ballpoint text-paper border-2 border-ink shadow-hard-sm group-hover:rotate-12 transition-transform duration-100">
                <Plus size={28} strokeWidth={3} aria-hidden="true" />
              </span>

              <span className="font-display text-xl text-ink">See All Certificates</span>

              <span className="text-ink-soft text-lg">
                View {remainingCount} more certificates
              </span>
            </Link>
          )}
        </div>
      </SectionState>
    </section>
  );
};

export default HomepageCertificates;