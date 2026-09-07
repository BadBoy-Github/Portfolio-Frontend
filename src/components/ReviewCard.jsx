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
      <div className="bg-zinc-800 p-5 rounded-xl shadow-xl min-w-[320px] flex flex-col lg:min-w-[420px] group transition-all duration-300">
        <div className="flex items-center gap-1 mb-3">
          {stars.map((filled, key) => (
            <span
              key={key}
              className={`material-symbols-rounded text-[18px] cursor-pointer group-hover:scale-110 transition-all duration-300 ${filled ? 'text-yellow-600 group-hover:text-yellow-400' : 'text-zinc-600'}`}
              style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
            >
              star
            </span>
          ))}
        </div>

        <p className="text-zinc-400 mb-8 group-hover:text-zinc-200 transition-all duration-300">{content}</p>

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
            <p>{name}</p>

            <p className="text-xs text-zinc-400 tracking-wider">{company}</p>
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
