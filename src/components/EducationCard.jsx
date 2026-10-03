import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const EducationCard = ({
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
    <>
      <li className="mb-10 relative pr-8">
        <a
          href={instLink}
          target="_blank"
          className="absolute flex items-center justify-center w-10 h-10 bg-marker rounded-full -end-5 ring-8 ring-paper cursor-pointer hover:ring-marker/50 transition-all duration-300"
        >
          <img
            className="rounded-full shadow-hard-sm"
            src={instLogo}
            alt={instName}
            loading="lazy"
          />
        </a>
        <Card tone="paper" className="p-4 sm:p-5 shadow-hard hover:shadow-hard transition-all hover:rotate-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm font-medium text-ink w-full">
              <div className="flex gap-1 items-center flex-wrap">
                <p className="font-semibold text-marker">{name}</p>
                <Badge tone="postit">{perc}</Badge>
              </div>
              <p className="font-semibold text-ink mt-2">{instName}</p>
              <div className="mt-2 w-[90%]">
                <p className="text-sm font-normal text-ink-soft">{desc}</p>
                <div className="flex items-center justify-start text-ink-soft w-full gap-2 mt-4">
                  <TbBulb
                    size={20}
                    className="hidden md:flex items-center justify-center text-accent-amber group-hover:scale-110 group-hover:animate-pulse duration-300 transition-all"
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
            <time className="text-xs font-normal text-ink-soft sm:w-fit sm:text-center w-full">
              {year}
            </time>
          </div>
        </Card>
      </li>
    </>
  );
};

EducationCard.propTypes = {
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
