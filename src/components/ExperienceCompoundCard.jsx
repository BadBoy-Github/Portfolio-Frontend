import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import { TbCertificate } from "react-icons/tb";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

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
        <Card tone="paper" className="p-6 shadow-hard hover:shadow-hard transition-all hover:rotate-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="w-[90%]">
              <div className="flex gap-2 items-center flex-wrap">
                <p className="font-display font-bold text-ink transition-colors duration-300">
                  {name}
                  {"  "}
                </p>
                <Badge tone="postit">{role}</Badge>
              </div>

              <div className="mt-2 w-full">
                <p className="font-hand text-lg text-ink-soft">{desc}</p>
                <div className="flex items-center mt-4 gap-4 flex-wrap">
                  <div
                    onClick={openImage}
                    className={`hidden bg-paper/80 size-8 lg:flex items-center justify-center rounded-wobbly-sm cursor-pointer hover:scale-110 transition-all relative group/certhov border-2 border-ink ${
                      certifi ? "text-marker" : "text-ink-faint"
                    }`}
                  >
                    <TbCertificate
                      className={`size-4 ${certifi ? "opacity-100" : "opacity-50"}`}
                    />
                    {certifi ? (
                      <span className="absolute w-[110px] -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-wobbly-sm bg-marker text-ink py-2 text-xs shadow-hard transition-all duration-300 ease-in-out group-hover/certhov:scale-90 text-center">
                        View Certificate
                      </span>
                    ) : (
                      <span className="absolute w-[110px] -top-16 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-wobbly-sm bg-ink-night text-paper py-2 text-xs shadow-hard transition-all duration-300 ease-in-out group-hover/certhov:scale-90 text-center">
                        No Certificate Available
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-start text-ink-soft w-full gap-2">
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
            </div>
            <time className="font-hand text-lg text-ink-soft sm:w-fit sm:text-center w-full">
              {year}
            </time>
          </div>
        </Card>
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
