// Node modules
import PropTypes from "prop-types";

const SkillCard = ({ imgSrc, label, desc, classes = "" }) => {
  return (
    <div
      className={`group flex items-start gap-4 bg-postit border-2 border-ink rounded-wobbly-md shadow-paper p-4 -rotate-1 hover:rotate-0 hover:shadow-hard transition-transform duration-100 ${classes}`}
    >
      <figure className="bg-paper-card border-2 border-ink rounded-wobbly-sm w-12 h-12 grid place-items-center shrink-0 overflow-hidden">
        <img src={imgSrc} width={32} height={32} alt="" loading="lazy" />
      </figure>

      <div>
        <h3 className="font-display text-xl text-ink leading-tight">{label}</h3>

        <p className="text-ink-soft text-lg leading-snug mt-1">{desc}</p>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default SkillCard;