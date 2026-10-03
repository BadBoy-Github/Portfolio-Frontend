import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaGithub } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";

const ProjectCard = ({
  imgSrc,
  title,
  techUsed,
  projectLink,
  classes,
  code,
  live,
  gitUrl,
  projectId,
  displayTags,
}) => {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);

  const handleCardClick = (e) => {
    const target = e.target;
    const isGithubLink = target.closest("a")?.href?.includes("github");
    const isLiveLink = target.closest(".live-link");

    if (isGithubLink || isLiveLink) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (projectId) {
      e.preventDefault();
      setTimeout(() => navigate(`/project/${projectId}`), 150);
    }
  };

  return (
    <div
      className={
        "relative cursor-pointer p-4 rounded-2xl shadow-xl bg-card hover:bg-card/80 active:bg-card/70 ring-1 ring-inset ring-border/50 transition-all group hover:scale-[101%] overflow-hidden card" +
        classes
      }
      onClick={handleCardClick}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-terminal-green/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      <figure className="img-box aspect-square rounded-xl mb-4 relative">
        {gitUrl && (
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} source code on GitHub`}
            className="absolute right-3 z-20 top-3 rounded-full h-8 w-8 transform ease-in-out bg-muted p-1 flex transition-all duration-300 opacity-50 hover:opacity-75 hover:w-[102px] group/githov scale-110 ring-1 ring-border/10 ring-inset overflow-hidden"
          >
            <div className="flex items-center justify-end">
              <FaGithub className="size-6 absolute p-1 rounded-full right-1 transform transition-transform duration-[380ms] ease-in-out group-hover/githov:translate-x-[-70px] z-30 bg-card" />
              <div
                className="absolute right-2 text-sm text-foreground opacity-0 translate-x-2 group-hover/githov:opacity-100 
                group-hover/githov:translate-x-0 transition-all delay-200 flex items-center justify-center"
              >
                <p>GitHub</p>
                <IoArrowForwardOutline className="size-4 text-muted-foreground group-hover/githov:-rotate-45 opacity-75 transition-all duration-500 delay-150" />
              </div>
            </div>
          </a>
        )}
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="img-cover rounded-xl w-full h-full cursor-pointer transition-all duration-300"
        />
      </figure>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="title-1 mb-3 text-foreground group-hover:text-accent-secondary transition-colors">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {(displayTags || []).map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm text-muted-foreground bg-muted/50 grid items-center px-3 rounded-lg transition-all duration-300 hover:bg-terminal-green/20 hover:text-terminal-green hover:scale-105 font-mono"
                style={{
                  animationDelay: `${key * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {projectLink ? (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live demo`}
            className="live-link w-11 h-11 rounded-lg grid place-items-center bg-accent-secondary text-accent-foreground shrink-0 hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              arrow_outward
            </span>
          </a>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  techUsed: PropTypes.array.isRequired,
  projectLink: PropTypes.string,
  classes: PropTypes.string,
  code: PropTypes.string,
  live: PropTypes.string,
  gitUrl: PropTypes.string,
  projectId: PropTypes.string,
  displayTags: PropTypes.array,
};

export default ProjectCard;
