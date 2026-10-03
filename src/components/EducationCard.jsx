import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const EducationCard = ({
  as: Tag = "li",
  year,
  name,
  perc,
  instName,
  instLogo,
  instLink,
  desc,
  skills,
}) => {
  return (
    <Tag className="mb-10 relative pr-8">
      <a
        href={instLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex items-center justify-center w-12 h-12 -end-6 top-1
          bg-paper-card border-2 border-ink rounded-wobbly-sm shadow-hard-sm
          cursor-pointer transition-transform duration-100"
        aria-label={`Visit ${instName}`}
      >
        <img src={instLogo} alt={instName} loading="lazy" />
      </a>
      <Card tone="paper" className="p-4 sm:p-5 shadow-hard hover:shadow-hard transition-all hover:rotate-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="w-full">
            <div className="flex gap-2 items-center flex-wrap">
              <p className="font-display font-bold text-marker">{name}</p>
              <Badge tone="postit">{perc}</Badge>
            </div>
            <p className="font-hand text-lg text-ink-soft mt-1">{instName}</p>
            <div className="mt-2 w-full">
              <p className="font-hand text-lg text-ink-soft">{desc}</p>
              <div className="flex items-center justify-start text-ink-soft w-full gap-2 mt-4">
                <TbBulb
                  size={20}
                  className="hidden md:flex items-center justify-center text-gold group-hover:scale-110 group-hover:animate-pulse duration-300 transition-all"
                />
                <div className="flex items-center flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-postit"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <time className="font-hand text-lg text-ink-soft sm:w-fit sm:text-center w-full">
            {year}
          </time>
        </div>
      </Card>
    </Tag>
  );
};

EducationCard.propTypes = {
  as: PropTypes.elementType,
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  perc: PropTypes.string.isRequired,
  instName: PropTypes.string.isRequired,
  instLogo: PropTypes.string.isRequired,
  instLink: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
};

export default EducationCard;
