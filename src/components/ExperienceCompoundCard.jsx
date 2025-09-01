
import { TbBulb } from "react-icons/tb";
import PropTypes from "prop-types";
import { TbCertificate } from "react-icons/tb";

const ExperienceCompoundCard = ({
  year,
  name,
  role,
  desc,
  imgSrc,
  skills,
}) => {

  const openImage = () => {
    window.open(imgSrc, "_blank");
  };

  return (
    <>
      <li className="">
        <div className="items-center justify-between p-6 rounded-2xl sm:flex transition-all group hover:scale-[101%]  bg-zinc-900/50 shadow-xl">
          <time className="mb-1 text-xs font-normal text-zinc-400  sm:order-last sm:mb-0 sm:w-fit sm:text-center">
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

            <div className=" mt-2 w-[90%] ">
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

ExperienceCompoundCard.propTypes = {
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
};

export default ExperienceCompoundCard;
