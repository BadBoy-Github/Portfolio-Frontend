import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";

const AchievementsCard = ({ imgSrc, title, date, tags, desc, achiId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (achiId) {
      navigate(`/achievement/${achiId}`);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (achiId) {
      navigate(`/achievement/${achiId}`);
    }
  };

  return (
    <div 
      className="bg-zinc-800 lg:h-[520px] h-[600px] hover:bg-zinc-500/10 p-5 rounded-xl shadow-xl min-w-[320px] flex flex-col lg:min-w-[420px] group relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <div className="flex items-center gap-2 h-6 justify-between flex-row lg:flex-row-reverse">
            <p className="text-zinc-400 text-xs">{date}</p>
            <p className="w-[80%] ">{title}</p>
          </div>
        </div>
      </div>
      <figure
        className="rounded-lg bg-zinc-700 mt-4 hover:scale-[101%] group/achi transition-all duration-300 relative cursor-pointer"
        onClick={handleImageClick}
      >
        <div className="hidden bg-zinc-950/60 font-bold group-hover/achi:flex absolute top-0 bottom-0 left-0 right-0 rounded-lg transition-all duration-300 ">
          <div className="flex items-center justify-center rounded-lg h-full w-full transition-all duration-300">
            <AiOutlineFullscreen className="w-10 h-10" />
          </div>
        </div>
        <img
          src={imgSrc}
          width={44}
          height={44}
          alt={title}
          loading="lazy"
          className="w-full h-60 object-cover bg-zinc-400/20 rounded-lg"
        />
      </figure>
      <ul className="list-disc text-sm text-zinc-400 mt-3 tracking-wider pl-5 space-y-1 h-64 lg:h-48 overflow-y-auto achi-ul">
        {desc
          .split(". ")
          .filter((sentence) => sentence.trim() !== "")
          .map((sentence, index) => (
            <li key={index} className="achi-li">{sentence.trim().replace(/\.$/, "")}</li>
          ))}
      </ul>

      <div className=" absolute bottom-0 left-0 right-0 grid grid-cols-1 lg:grid-cols-2 pl-6 pb-6 ">
        {tags.map((label, key) => (
          <span
            key={key}
            className="text-sm text-sky-600 group-hover:text-sky-400 transition-all duration-300 flex w-fit mt-3 bg-zinc-700/40 px-2 py-1 rounded-lg"
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
