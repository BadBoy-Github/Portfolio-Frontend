// Components
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";
import Logo from "./ui/Logo";

const meLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact me",
    href: "/contact",
  },
];

const workLinks = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Certificates",
    href: "/certificates",
  },
  {
    label: "Achievements",
    href: "/achievements",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/BadBoy-Github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elayabarathi/",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919842852121",
  },
  {
    label: "Gmail",
    href: "mailto:elayabarathiedison@gmail.com",
  },
];

const FooterColumn = ({ heading, links, external = false }) => (
  <div>
    <p className="mb-3 font-display text-xl scribble-underline w-fit">{heading}</p>

    <ul>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            to={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="block text-lg text-ink-soft py-1 transition-colors duration-100 w-fit hover:text-marker hover:line-through decoration-2"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

FooterColumn.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  external: PropTypes.bool,
};

const Footer = () => {
  return (
    <footer className="section border-t-2 border-dashed border-ink/20">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="lg:mb-10 lg:pr-20">
            <h2 className="flex lg:max-w-[12ch] headline-1">Let&apos;s</h2>
            <RotatingText
              texts={["Collab", "Build", "Create", "Break"]}
              mainClassName="w-fit h-fit font-display font-bold text-ink text-4xl sm:text-5xl leading-tight lg:text-[55px] lg:leading-[1.15] py-2"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            <h2 className="flex mb-8 lg:max-w-[12ch] headline-1">today!</h2>
          </div>

          <FooterColumn heading="Socials" links={socials} external />
          <FooterColumn heading="Me" links={meLinks} />
          <FooterColumn heading="Work" links={workLinks} />
        </div>

        <div className="flex items-center justify-between pt-10 mt-10 border-t-2 border-dashed border-ink/20">
          <a
            href="/"
            aria-label="Elayabarathi M V — home"
            className="inline-block shrink-0"
          >
            <Logo />
          </a>

          <p className="text-ink-soft text-base">
            &copy; {new Date().getFullYear()}
            <span className="text-ink">
              {" "}
              · All Rights Reserved <span className="hidden md:inline"> | </span>
              <span className="text-marker font-bold block md:inline mt-1 text-end md:mt-0">
                Elayabarathi M V
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;