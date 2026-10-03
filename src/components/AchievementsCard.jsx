// Node modules
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import Badge from "./ui/Badge";

const AchievementsCard = ({ imgSrc, title, date, tags, desc, achiId }) => {
  const sentences = (desc || "")
    .split(". ")
    .filter((sentence) => sentence.trim() !== "");

  return (
    <article className="card card-flush group relative flex flex-col transition-transform duration-100 hover:-rotate-1 hover:shadow-hard">
      <figure className="relative border-b-2 border-ink">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="w-full h-52 object-cover"
        />

        {date && (
          <Badge tone="postit" className="absolute left-3 top-3 z-10">
            {date}
          </Badge>
        )}
      </figure>

      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="title-1">
          {achiId ? (
            <Link
              to={`/achievement/${achiId}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {sentences.length > 0 && (
          <div className="text-ink-soft text-lg space-y-1">
            {sentences.map((sentence) => (
              <p key={sentence}>{sentence.trim().replace(/\.$/, "")}</p>
            ))}
          </div>
        )}

        {(tags || []).length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-2">
            {tags.slice(0, 2).map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

AchievementsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  desc: PropTypes.string,
  achiId: PropTypes.string,
};

export default AchievementsCard;