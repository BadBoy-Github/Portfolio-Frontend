import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import { TbCertificate } from "react-icons/tb";

const ExperienceCompoundCard = ({
  year,
  name,
  role,
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
      <div className="mb-4 last:mb-0">
        <div className="items-center justify-between card p-6 sm:flex shadow-xl">
          <time className="mb-1 text-xs font-normal text-muted-foreground sm:order-last sm:mb-0 sm:w-fit sm:text-center">
            {year}
          </time>
          <div className="text-sm font-medium text-muted-foreground w-[90%]">
            <div className="flex gap-1 items-center">
              <p className="group-hover:text-accent-secondary transition-colors duration-300">
                {name}
                {"  "}
              </p>
              <span className="bg-muted text-muted-foreground text-xs font-normal ml-1 me-2 px-2.5 py-0.5 rounded-md group-hover:text-foreground transition-all duration-300 font-mono">
                {role}
              </span>
            </div>

            <div className="mt-2 w-[90%]">
              <p className="text-sm font-normal text-muted-foreground">{desc}</p>
              <div className="flex items-center mt-4 gap-4">
                <div
                  onClick={openImage}
                  className={`hidden bg-muted size-8 lg:flex items-center justify-center rounded-lg cursor-pointer hover:scale-110 transition-all relative group/certhov ${
                    certifi ? "text-terminal-green" : "text-terminal-amber"
                  }`}
                >
                  <TbCertificate
                    className={`size-4 ${
                      certifi ? "opacity-100" : "opacity-50"
                    }`}
                  />
                  {certifi ? (
                    <span className="absolute w-[110px] -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-lg bg-terminal-green text-background py-2 text-xs shadow-md transition-all duration-300 ease-in-out group-hover/certhov:scale-90 text-center">
                      View Certificate
                    </span>
                  ) : (
                    <span className="absolute w-[110px] -top-16 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-lg bg-terminal-amber text-background py-2 text-xs shadow-md transition-all duration-300 ease-in-out group-hover/certhov:scale-90 text-center">
                      No Certificate Available
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-start text-muted-foreground w-full gap-2">
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
          </div>
        </div>
      </div>
    </>
  );
};

ExperienceCompoundCard.propTypes = {
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  certifi: PropTypes.bool.isRequired,
  skills: PropTypes.array.isRequired,
};

export default ExperienceCompoundCard;
