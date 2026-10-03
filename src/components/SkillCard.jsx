import PropTypes from "prop-types";

const SkillCard = ({ imgSrc, label, desc, classes }) => {
  return (
    <div
      className={
        "flex items-center gap-3 ring-2 ring-inset ring-border rounded-2xl p-3 hover:bg-muted transition-all group hover:scale-[101%] card shadow-xl" +
        classes
      }
    >
      <figure className="bg-terminal-green/20 rounded-lg shadow-xl overflow-hidden w-12 h-12 p-2 group-hover:bg-terminal-green/25 transition-colors">
        <img
          src={imgSrc}
          width={32}
          height={32}
          alt={label}
          loading="lazy"
          className="rounded-md"
        />
      </figure>

      <div>
        <h3 className="text-foreground font-display text-sm font-medium group-hover:text-accent-secondary transition-colors">
          {label}
        </h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
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
