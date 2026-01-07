
import PropTypes from "prop-types"

import { AiOutlineFullscreen } from "react-icons/ai";

const CertificationsCard = ({
  imgSrc,
  title,
  company,
  logo,
  certNumber,
}) => {
  const openImage = () => {
     window.open(imgSrc, "_blank");
  };

  return (
    <div className="bg-zinc-800 hover:bg-zinc-500/10 p-5 rounded-xl shadow-xl min-w-[320px] flex flex-col lg:min-w-[420px] group">
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div>
          <p className="flex items-center gap-2">
            {title}
            <span className="text-xs text-zinc-400">#{certNumber}</span>
          </p>
          <p className="text-xs text-zinc-400 tracking-wider">{company}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-700 group-hover:scale-125 group-hover:rotate-[45deg] transition-all duration-700">
          <img
            src={logo}
            alt="Logo"
            className="w-6 h-6 object-cover p-0.5 transition-all duration-700 group-hover:rotate-[-45deg]"
          />
        </div>
      </div>
      <figure
        className="rounded-lg bg-zinc-700 mt-4 hover:scale-[101%] group/cert transition-transform duration-300 relative cursor-pointer"
        onClick={openImage}
      >
        <div className="hidden bg-zinc-950/60 font-bold group-hover/cert:flex absolute top-0 bottom-0 left-0 right-0 rounded-lg transition-all duration-300">
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
    </div>
  );
};

CertificationsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  logo: PropTypes.string,
  certNumber: PropTypes.number,
};

export default CertificationsCard;