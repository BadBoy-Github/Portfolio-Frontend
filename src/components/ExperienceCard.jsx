import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import { TbCertificate } from "react-icons/tb";

const ExperienceCard = ({
  year,
  name,
  role,
  instName,
  instLogo,
  instLink,
  desc,
  imgSrc,
  skills,
}) => {

   const openImage = () => {
     window.open(imgSrc, "_blank");
   };

  return (
    <>
      <li className="mb-10 ml-12">
        <a
          href={instLink}
          target="_blank"
          title={instName}
          className="absolute flex items-center justify-center w-10 h-10 bg-zinc-600 rounded-full -start-5 ring-8 ring-zinc-50/10 cursor-pointer"
        >
          <img
            className="rounded-full shadow-lg"
            src={instLogo}
            alt={instName}
          />
        </a>
        <div className="items-center justify-between p-6 ml-4 bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 rounded-2xl sm:flex ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] shadow-xl">
          <time className="mb-1 text-xs font-normal text-zinc-400  sm:order-last sm:mb-0 sm:w-fit sm:text-center w-full">
            {year}
          </time>
          <div className="text-sm font-medium text-zinc-300 w-[90%]">
            <div className="flex gap-1 items-center">
              <p className="group-hover:text-sky-400 transition-colors duration-300">
                {name}
                {"  "}
              </p>
              <span className="bg-zinc-600 text-zinc-300 text-xs font-normal ml-1 me-2 px-2.5 py-0.5 rounded-md group-hover:text-white transition-all duration-300">
                {role}
              </span>
            </div>
            <p className="font-semibold text-zinc-200 mt-2">{instName}</p>
            <div className=" mt-2 w-[90%]">
              <p className=" text-sm font-normal text-zinc-300">{desc}</p>
              <div className="flex items-center mt-4 gap-4">
                <div onClick={openImage} className="text-sky-600 bg-white size-8 flex items-center justify-center rounded-lg cursor-pointer">
                                  <TbCertificate className="size-4"/>
                                </div>
                <div className="flex items-center justify-start text-zinc-400 w-full gap-3">
                  <TbBulb
                    size={20}
                    className="flex items-center justify-center group-hover:text-yellow-500 group-hover:scale-110 group-hover:animate-pulse duration-300 transition-all"
                  />
                  <span className="w-full group-hover:text-zinc-300 transition-colors duration-300">
                    <em>{skills}</em>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  skills: PropTypes.string.isRequired,
};

export default ExperienceCard;
