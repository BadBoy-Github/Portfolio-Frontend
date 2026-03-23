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
      className="bg-zinc-800 h-[460px] hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl cursor-pointer transition-colors relative group"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <div className="flex items-center gap-2 h-6 justify-between flex-row lg:flex-row-reverse">
            <p className="text-zinc-400 text-xs">{date}</p>
            <p className="w-[80%] text-white font-semibold">{title}</p>
          </div>
        </div>
      </div>
      <figure className="rounded-lg bg-zinc-700 mt-4 group-hover:scale-[101%] transition-all duration-300">
        <img
          src={imgSrc}
          width={44}
          height={44}
          alt={title}
          loading="lazy"
          className="w-full h-60 object-cover bg-zinc-400/20 rounded-lg"
        />
      </figure>
      <div className="text-sm text-zinc-400 mt-3 tracking-wider">
        {desc
          .split(". ")
          .filter((sentence) => sentence.trim() !== "")
          .map((sentence, idx) => (
            <p key={idx} className="">
              {sentence.trim().replace(/\.$/, "")}
            </p>
          ))}
      </div>

      <div className="absolute w-[90%] bottom-0 gap-3 flex flex-wrap mb-5">
        {tags.slice(0,2).map((label, key) => (
          <span
            key={key}
            className="text-sm text-sky-600 group-hover:text-sky-400 transition-all duration-300 flex w-fit bg-zinc-700/40 px-2 py-1 rounded-lg"
          >
            {label}
          </span>
        ))}
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
