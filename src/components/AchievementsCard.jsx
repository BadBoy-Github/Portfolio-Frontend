import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AchievementsCard = ({ imgSrc, title, date, tags, desc, achiId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (achiId) {
      navigate(`/achievement/${achiId}`);
    }
  };

  return (
    <div
      className="card border-t-2 border-accent-tertiary/50 hover:shadow-glow-gold transition-all duration-300 h-[460px] flex flex-col group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-5 rounded-xl flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-full">
            <div className="flex items-center gap-2 h-6 justify-between flex-row lg:flex-row-reverse">
              <p className="text-terminal-amber font-mono text-xs">
                {date}
              </p>
              <p className="w-[80%] text-foreground font-display font-semibold">
                {title}
              </p>
            </div>
          </div>
        </div>
        <figure className="rounded-lg bg-muted relative cursor-pointer m-2 overflow-hidden group-hover:scale-[101%] transition-all duration-300">
          <img
            src={imgSrc}
            width={44}
            height={44}
            alt={title}
            loading="lazy"
            className="w-full h-60 object-cover bg-muted-foreground/20 rounded-lg"
          />
        </figure>
        <div className="text-sm font-mono text-muted-foreground mt-3 tracking-wider">
          {desc
            .split(". ")
            .filter((sentence) => sentence.trim() !== "")
            .map((sentence, idx) => (
              <p key={idx} className="">
                {sentence.trim().replace(/\.$/, "")}
              </p>
            ))}
        </div>

        <div className="mt-auto w-[90%] bottom-0 gap-3 flex flex-wrap mb-5">
          {tags.slice(0, 2).map((label, key) => (
            <span
              key={key}
              className="text-sm text-accent-tertiary font-mono bg-muted-foreground/10 px-2 py-1 rounded-lg"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
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
