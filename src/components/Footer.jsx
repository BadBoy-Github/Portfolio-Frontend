// Components
import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";

const sitemap = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Contact me",
    href: "/contact",
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
    label: "Gmail",
    href: "mailto:elayabarathiedison@gmail.com",
  },
];

const Footer = () => {
  return (
    <footer className="section border-t-2 border-dashed border-ink/20">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2">
          <div className="mb-10">
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

          <div className="grid grid-cols-2 gap-8 lg:pl-20">
            <div>
              <p className="mb-3 font-display text-xl scribble-underline w-fit">
                Socials
              </p>

              <ul>
                {socials.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg text-ink-soft py-1 transition-colors duration-100 w-fit hover:text-marker hover:line-through decoration-2"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-display text-xl scribble-underline w-fit">
                Sitemap
              </p>

              <ul>
                {sitemap.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="block gap-4 text-lg text-ink-soft py-1 transition-colors duration-100 hover:text-marker hover:line-through decoration-2 w-fit"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-10 mt-10 border-t-2 border-dashed border-ink/20">
          <a href="/" className="logo" aria-label="Elayabarathi M V — home">
            <img
              src="/favicon.svg"
              width={40}
              height={40}
              alt="Elayabarathi M V"
              loading="lazy"
            />
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