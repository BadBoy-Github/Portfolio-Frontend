import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";

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
          className="absolute flex items-center justify-center w-10 h-10 bg-muted rounded-full -end-5 ring-8 ring-background cursor-pointer hover:ring-terminal-green/50 transition-all duration-300"
        >
          <img
            className="rounded-full shadow-lg bg-error/0"
            src={instLogo}
            alt={instName}
            loading="lazy"
          />
        </a>
        <div className="items-center justify-between card p-4 sm:p-5 shadow-xl sm:flex">
          <div className="text-sm font-medium text-muted-foreground w-full">
            <div className="flex gap-1 items-center">
              <p className="group-hover:text-accent-secondary transition-colors duration-300">
                {name}
                {"  "}
              </p>
              <span className="bg-muted text-muted-foreground text-xs font-normal ml-1 me-2 px-2.5 py-0.5 rounded-md group-hover:text-foreground transition-all duration-300 font-mono">
                {perc}
              </span>
            </div>
            <p className="font-semibold text-foreground mt-2 font-display">
              {instName}
            </p>
            <div className="mt-2 w-[90%]">
              <p className="text-sm font-normal text-muted-foreground">{desc}</p>
              <div className="flex items-center justify-start text-muted-foreground w-full gap-2 mt-4">
                <TbBulb
                  size={20}
                  className="hidden md:flex items-center justify-center group-hover:text-gold group-hover:scale-110 group-hover:animate-pulse duration-300 transition-all"
                />
                <div className="flex items-center flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-md bg-muted text-foreground font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <time className="mb-1 text-xs font-normal text-muted-foreground sm:order-last sm:mb-0 sm:w-fit sm:text-center w-full">
            {year}
          </time>
        </div>
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
