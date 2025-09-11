// Node modules
import PropTypes from "prop-types";

import { FaGithub } from "react-icons/fa";

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
            className="absolute right-2 z-20 top-2 rounded-full bg-gray-800 p-1 group-hover:flex hidden transition-all duration-300 opacity-75 hover:opacity-100 hover:scale-110 ease-in-out"
          >
            <div className="group/hovtex relative flex items-center text-zinc-300">
              <FaGithub className="size-6" />
              <span className="absolute w-[70px] z-50 -top-16 left-[50%] -translate-x-[50%] origin-bottom scale-0 px-2 rounded-lg bg-zinc-800 text-zinc-300 ring-1 ring-inset ring-gray-50/5 py-2 text-sm shadow-md transition-all duration-300 ease-in-out group-hover/hovtex:scale-100">
                View on GitHub
              </span>
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
