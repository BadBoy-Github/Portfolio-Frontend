// Node modules
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import Badge from "./ui/Badge";

const CertificationsCard = ({
  imgSrc,
  title,
  company,
  logo,
  certNumber,
  certId,
}) => {
  return (
    <article className="card card-paper group relative flex flex-col transition-transform duration-100 hover:-rotate-1 hover:shadow-hard h-full">
      <figure className="relative border-b-2 border-ink">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="w-full h-56 object-cover"
        />

        {certNumber && (
          <Badge tone="postit" className="absolute left-3 top-3 z-10">
            #{certNumber}
          </Badge>
        )}
      </figure>

      <div className="p-5 flex items-start justify-between gap-3 flex-grow">
        <div>
          <h3 className="title-1">
            {certId ? (
              <Link
                to={`/certificate/${certId}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>

          <p className="text-ink-soft text-lg">{company}</p>
        </div>

        {logo && (
          <span className="w-11 h-11 grid place-items-center rounded-wobbly-sm bg-paper-deep border-2 border-ink overflow-hidden shrink-0 group-hover:rotate-12 transition-transform duration-100">
            <img src={logo} alt="" className="w-6 h-6 object-contain" />
          </span>
        )}
      </div>
    </article>
  );
};

CertificationsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  logo: PropTypes.string,
  certNumber: PropTypes.number,
  certId: PropTypes.string,
};

export default CertificationsCard;