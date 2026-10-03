import PropTypes from "prop-types";

const ReviewCard = ({
    content,
    imgSrc,
    name,
    company,
    rating = 5
}) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < Number(rating));

    return (
      <div className="card border-t-2 border-accent-tertiary/50 hover:translate-y-[-4px] hover:shadow-glow-gold transition-all duration-300 p-5 min-w-[320px] flex flex-col lg:min-w-[420px] group">
        <div className="mb-6 relative">
          <span className="quote-mark absolute -top-8 -left-2 opacity-20">
            &ldquo;
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3 mt-2">
          {stars.map((filled, key) => (
            <span
              key={key}
              className={`material-symbols-rounded text-[18px] cursor-pointer group-hover:scale-110 transition-all duration-300 ${filled ? 'text-accent-tertiary group-hover:text-gold-light' : 'text-muted-foreground/50'}`}
              style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
            >
              star
            </span>
          ))}
        </div>

        <p className="text-muted-foreground mb-8 group-hover:text-foreground transition-colors duration-300 body-text">
          {content}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <figure className="img-box rounded-lg">
            <img
              src={imgSrc}
              width={44}
              height={44}
              alt={name}
              loading="lazy"
              className="img-cover rounded-xl"
            />
          </figure>

          <div>
            <p className="font-display font-semibold text-foreground">
              {name}
            </p>

            <p className="text-xs text-muted-foreground tracking-wider font-mono">
              {company}
            </p>
          </div>
        </div>
      </div>
    );
}

ReviewCard.propTypes = {
    content: PropTypes.string,
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.string,
    rating: PropTypes.number
}

export default ReviewCard
