// Node modules
import PropTypes from "prop-types";

import { FaGithub } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";

const ProjectCard = ({
  imgSrc,
  title,
  tags,
  projectLink,
  classes,
  code,
  live,
  gitUrl,
}) => {
  return (
    <div
      className={
        "relative cursor-pointer p-4 rounded-2xl shadow-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] " +
        classes
      }
    >
      <figure className="img-box aspect-square rounded-lg mb-4 relative">
        {code == "True" && (
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 z-20 top-3 rounded-full h-8 w-8 transform ease-in-out bg-zinc-700 p-1 flex  transition-all duration-700 opacity-50 hover:opacity-75 hover:w-[102px]  group/githov scale-110 ring-1 ring-zinc-800/5 ring-inset overflow-hidden"
          >
            <div className="flex items-center justify-end">
              <FaGithub className="size-6 absolute p-1 rounded-full right-1 transform transition-transform duration-700 ease-in-out group-hover/githov:translate-x-[-70px] z-30 bg-zinc-800" />
              <div
                className="absolute right-2 text-sm text-zinc-200 opacity-0 translate-x-2 group-hover/githov:opacity-100 
                group-hover/githov:translate-x-0 transition-all delay-200 flex items-center justify-center"
              >
                <p>GitHub</p>
                <IoArrowForwardOutline className="size-4 text-zinc-300 group-hover/githov:-rotate-45 opacity-75 transition-all duration-500 delay-150" />
              </div>
            </div>
          </a>
        )}
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="img-cover rounded-xl w-full h-full"
        />
      </figure>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="title-1 mb-3">{title}</h3>

          <div className="flex flex-wrap items-center gap-2">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center px-3 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            arrow_outward
          </span>
        </div>
      </div>
      {live == "True" && (
        <a href={projectLink} target="_blank" className="absolute inset-0"></a>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projectLink: PropTypes.string.isRequired,
  classes: PropTypes.string,
  code: PropTypes.string,
  live: PropTypes.string,
  gitUrl: PropTypes.string,
};

export default ProjectCard;
