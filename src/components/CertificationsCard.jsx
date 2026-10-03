
import PropTypes from "prop-types"


const CertificationsCard = ({
  imgSrc,
  title,
  company,
  logo,
  certNumber,
}) => {

  return (
    <div className="card border-t-2 border-accent-tertiary/50 hover:shadow-glow-gold transition-all duration-300 h-full flex flex-col group">
      <div className="p-5 rounded-xl flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mt-auto mb-4">
          <div>
            <p className="flex items-center gap-2">
              <span className="text-lg font-display font-semibold text-foreground">
                {title}
              </span>
              <span className="text-xs font-mono text-terminal-green">
                #{certNumber}
              </span>
            </p>
            <p className="text-xs text-muted-foreground tracking-wider font-mono">
              {company}
            </p>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent-tertiary/20 group-hover:scale-125 group-hover:rotate-[45deg] transition-all duration-700">
            <img
              src={logo}
              alt="Logo"
              className="w-6 h-6 object-cover p-0.5 transition-all duration-700 group-hover:rotate-[-45deg]"
            />
          </div>
        </div>
        <figure className="rounded-lg bg-muted relative cursor-pointer m-2 overflow-hidden">
          <img
            src={imgSrc}
            width={44}
            height={44}
            alt={title}
            loading="lazy"
            className="w-full h-60 object-cover bg-muted-foreground/20 rounded-lg group-hover:scale-[101%] transition-transform duration-300"
          />
        </figure>
      </div>
    </div>
  );
};

CertificationsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  logo: PropTypes.string,
  certNumber: PropTypes.number,
};

export default CertificationsCard;
