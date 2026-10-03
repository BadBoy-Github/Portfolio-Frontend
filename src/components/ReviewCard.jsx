// Node modules
import PropTypes from "prop-types";
import { Star } from "lucide-react";

const GOLD = "#b45309";

const ReviewCard = ({ content, imgSrc, name, company, rating = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Number(rating));

  return (
    <figure className="relative flex flex-col bg-paper-card border-2 border-ink rounded-wobbly-md shadow-paper p-6 md:p-8 transition-transform duration-100 hover:-rotate-1 hover:shadow-hard">
      <span
        className="absolute -bottom-3 left-12 w-6 h-6 rotate-45 bg-paper-card border-r-2 border-b-2 border-ink"
        aria-hidden="true"
      />

      <div className="flex items-center gap-1 mb-4">
        {stars.map((filled, index) => (
          <Star
            key={index}
            size={22}
            strokeWidth={2.5}
            aria-hidden="true"
            style={filled ? { color: GOLD, fill: GOLD } : undefined}
            className={!filled ? "fill-transparent text-ink-faint" : ""}
          />
        ))}
      </div>

      <blockquote className="text-lg md:text-xl text-ink leading-relaxed mb-8">
        {content}
      </blockquote>

      <figcaption className="flex items-center gap-3 mt-auto">
        <figure className="img-box w-12 h-12 shrink-0 rounded-wobbly-sm">
          <img
            src={imgSrc}
            width={44}
            height={44}
            alt={name}
            loading="lazy"
            className="img-cover"
          />
        </figure>

        <div>
          <p className="font-display text-lg text-ink">{name}</p>
          <p className="text-ink-soft text-base">{company}</p>
        </div>
      </figcaption>
    </figure>
  );
};

ReviewCard.propTypes = {
  content: PropTypes.string,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  company: PropTypes.string,
  rating: PropTypes.number,
};

export default ReviewCard;