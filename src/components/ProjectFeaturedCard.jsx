// Node modules
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Components
import Badge from "./ui/Badge";
import ExpandLink from "./ui/ExpandLink";

const ProjectFeaturedCard = ({
  imgSrc,
  title,
  projectLink,
  gitUrl,
  projectId,
  displayTags,
}) => {
  return (
    <article className="card card-flush group relative flex flex-col transition-transform duration-100 hover:-rotate-1 hover:shadow-hard">
      <figure className="relative border-b-2 border-ink">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="w-full aspect-[16/7] object-cover"
        />

        {gitUrl && (
          <ExpandLink
            href={gitUrl}
            label="GitHub"
            ariaLabel={`View ${title} source code on GitHub`}
            className="absolute right-3 top-3"
          />
        )}
      </figure>

      <div className="p-5 md:p-6 flex flex-col gap-4 flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="title-1">
            {projectId ? (
              <Link
                to={`/project/${projectId}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>

          {projectLink && (
            <ExpandLink
              href={projectLink}
              icon={ArrowUpRight}
              ariaLabel={`View ${title} live demo`}
              className="shrink-0"
            />
          )}
        </div>

        {(displayTags || []).length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
            {displayTags.map((label) => (
              <Badge key={label} tone="postit">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

ProjectFeaturedCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  projectLink: PropTypes.string,
  gitUrl: PropTypes.string,
  projectId: PropTypes.string,
  displayTags: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectFeaturedCard;