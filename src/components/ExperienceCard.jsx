import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import { TbCertificate } from "react-icons/tb";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const ExperienceCard = ({
  year,
  name,
  role,
  instName,
  instLink,
  instLogo,
  desc,
  imgSrc,
  certifi,
  skills,
}) => {
  const openImage = () => {
    if (certifi) {
      window.open(imgSrc, "_blank");
    }
  };

  return (
    <>
      <li className="mb-10 relative pl-8">
        <a
          href={instLink}
          target="_blank"
          className="absolute flex items-center justify-center w-10 h-10 bg-marker rounded-full -start-5 ring-8 ring-paper cursor-pointer"
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
                <p className="font-semibold text-ink">{name}</p>
                <Badge tone="marker">{role}</Badge>
              </div>
              <p className="font-semibold text-ink mt-2">{instName}</p>
              <div className="mt-2 w-[90%]">
                <p className="text-sm font-normal text-ink-soft">{desc}</p>
                <div className="flex items-center mt-4 gap-4 flex-wrap">
                  {certifi && (
                    <div
                      onClick={openImage}
                      className="hidden bg-paper/80 size-8 lg:flex items-center justify-center rounded-wobbly-sm cursor-pointer hover:scale-110 transition-all relative group/certhov border-2 border-ink text-marker"
                    >
                      <TbCertificate className="size-4" />
                      <span className="absolute w-[110px] -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-wobbly-sm bg-marker text-ink py-2 text-xs shadow-hard transition-all duration-300 ease-in-out group-hover/certhov:scale-90 text-center">
                        View Certificate
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-start text-ink-soft w-full gap-2">
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
            </div>
            <time className="text-xs font-normal text-ink-soft sm:w-fit sm:text-center w-full flex-shrink-0">
              {year}
            </time>
          </div>
        </Card>
      </li>
    </>
  );
};

ExperienceCard.propTypes = {
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  instName: PropTypes.string.isRequired,
  instLogo: PropTypes.string.isRequired,
  instLink: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  certifi: PropTypes.bool.isRequired,
  skills: PropTypes.array.isRequired,
};

export default ExperienceCard;
